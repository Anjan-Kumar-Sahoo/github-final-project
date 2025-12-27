from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse
from django.views import generic
from django.contrib.auth.models import User
from django.contrib.auth import login, logout, authenticate
from django.http import HttpResponseRedirect, HttpResponse
import logging
from datetime import datetime
from .models import Course, Enrollment, Lesson, Question, Choice, Submission

logger = logging.getLogger(__name__)


# HomePageView
def index(request):
    courses = Course.objects.all()
    context = {'courses': courses}
    return render(request, 'onlinecourse/index.html', context)


# CourseDetailsView
def course_details(request, pk):
    course = get_object_or_404(Course, pk=pk)
    # Check if user is enrolled
    if request.user.is_authenticated:
        course.is_enrolled = Enrollment.objects.filter(user=request.user, course=course).exists()
    context = {'course': course}
    return render(request, 'onlinecourse/course_details_bootstrap.html', context)


# Enroll in a course
def enroll(request, course_id):
    if request.method == 'POST':
        course = get_object_or_404(Course, pk=course_id)
        user = request.user
        
        # Check if already enrolled
        if not Enrollment.objects.filter(user=user, course=course).exists():
            # Create enrollment
            enrollment = Enrollment.objects.create(
                user=user,
                course=course,
                date_enrolled=datetime.now()
            )
            # Update course enrollment count
            course.total_enrollment += 1
            course.save()
        
        return HttpResponseRedirect(reverse('onlinecourse:course_details', args=(course_id,)))


# Authentication views
def registration_request(request):
    context = {}
    if request.method == 'GET':
        return render(request, 'onlinecourse/user_registration_bootstrap.html', context)
    elif request.method == 'POST':
        username = request.POST['username']
        password = request.POST['psw']
        first_name = request.POST['firstname']
        last_name = request.POST['lastname']
        user_exist = False
        try:
            User.objects.get(username=username)
            user_exist = True
        except:
            logger.error("New user")
        if not user_exist:
            user = User.objects.create_user(username=username, first_name=first_name, last_name=last_name,
                                            password=password)
            login(request, user)
            return redirect("onlinecourse:index")
        else:
            context['message'] = "User already exists."
            return render(request, 'onlinecourse/user_registration_bootstrap.html', context)


def login_request(request):
    context = {}
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['psw']
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('onlinecourse:index')
        else:
            context['message'] = "Invalid username or password."
            return render(request, 'onlinecourse/user_login_bootstrap.html', context)
    else:
        return render(request, 'onlinecourse/user_login_bootstrap.html', context)


def logout_request(request):
    logout(request)
    return redirect('onlinecourse:index')


# Submit exam
def submit(request, course_id):
    # Get user and course object
    user = request.user
    course = get_object_or_404(Course, pk=course_id)
    
    # Get the enrollment
    enrollment = Enrollment.objects.get(user=user, course=course)
    
    # Create a submission object
    submission = Submission.objects.create(enrollment=enrollment)
    
    # Collect the selected choices from the form
    submitted_answers = extract_answers(request)
    
    # Add each selected choice to the submission
    for choice_id in submitted_answers:
        choice = Choice.objects.get(id=choice_id)
        submission.choices.add(choice)
    
    submission.save()
    
    # Redirect to show_exam_result with the submission id
    return HttpResponseRedirect(reverse('onlinecourse:show_exam_result', 
                                       args=(course_id, submission.id)))


# Extract answers from the request
def extract_answers(request):
    submitted_answers = []
    for key in request.POST:
        if key.startswith('choice_'):
            value = request.POST[key]
            choice_id = int(value)
            submitted_answers.append(choice_id)
    return submitted_answers


# Show exam result
def show_exam_result(request, course_id, submission_id):
    # Get course and submission
    course = get_object_or_404(Course, pk=course_id)
    submission = get_object_or_404(Submission, pk=submission_id)
    
    # Get all choices selected in this submission
    selected_choice_ids = submission.choices.values_list('id', flat=True)
    
    # Calculate the total score
    total_score = 0
    max_score = 0
    
    # Get all questions for the course
    questions = Question.objects.filter(course=course)
    
    # Dictionary to store results for each question
    question_results = []
    
    for question in questions:
        max_score += question.grade
        
        # Get selected choices for this question
        selected_choices = submission.choices.filter(question=question)
        
        # Check if the answer is correct
        is_correct = question.is_get_score(selected_choice_ids)
        
        if is_correct:
            total_score += question.grade
        
        # Store question results
        question_results.append({
            'question': question,
            'selected_choices': selected_choices,
            'is_correct': is_correct
        })
    
    # Calculate percentage
    percentage = (total_score / max_score * 100) if max_score > 0 else 0
    
    context = {
        'course': course,
        'submission': submission,
        'selected_choice_ids': selected_choice_ids,
        'total_score': total_score,
        'max_score': max_score,
        'percentage': round(percentage, 2),
        'question_results': question_results
    }
    
    return render(request, 'onlinecourse/exam_result_bootstrap.html', context)
