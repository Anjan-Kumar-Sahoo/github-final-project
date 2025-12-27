from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from onlinecourse.models import Course, Lesson, Instructor, Question, Choice
from datetime import date


class Command(BaseCommand):
    help = 'Populate database with sample course data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Creating sample data...')

        # Create instructor user if doesn't exist
        instructor_user, created = User.objects.get_or_create(
            username='instructor1',
            defaults={
                'first_name': 'John',
                'last_name': 'Smith',
                'email': 'john@example.com',
                'is_staff': True
            }
        )
        if created:
            instructor_user.set_password('instructor123')
            instructor_user.save()
            self.stdout.write(self.style.SUCCESS('Created instructor user'))

        # Create instructor profile
        instructor, created = Instructor.objects.get_or_create(
            user=instructor_user,
            defaults={
                'full_time': True,
                'total_learners': 0
            }
        )

        # Create course
        course, created = Course.objects.get_or_create(
            name='Django Web Development',
            defaults={
                'description': 'Learn Django framework from basics to advanced concepts. Build dynamic web applications with Python.',
                'pub_date': date.today(),
                'total_enrollment': 0
            }
        )
        if created:
            course.instructors.add(instructor)
            self.stdout.write(self.style.SUCCESS(f'Created course: {course.name}'))

        # Create Lesson 1
        lesson1, created = Lesson.objects.get_or_create(
            course=course,
            title='Introduction to Django',
            defaults={
                'order': 1,
                'content': 'Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design. Built by experienced developers, it takes care of much of the hassle of web development.'
            }
        )

        # Questions for Lesson 1
        questions_data = [
            {
                'question_text': 'What is Django?',
                'grade': 5,
                'choices': [
                    ('A Python web framework', True),
                    ('A JavaScript library', False),
                    ('A database management system', False),
                    ('A CSS framework', False)
                ]
            },
            {
                'question_text': 'Django follows which architectural pattern?',
                'grade': 5,
                'choices': [
                    ('MVT (Model-View-Template)', True),
                    ('MVC (Model-View-Controller)', False),
                    ('MVP (Model-View-Presenter)', False),
                    ('MVVM (Model-View-ViewModel)', False)
                ]
            },
            {
                'question_text': 'What language is Django written in?',
                'grade': 5,
                'choices': [
                    ('Python', True),
                    ('JavaScript', False),
                    ('Ruby', False),
                    ('PHP', False)
                ]
            }
        ]

        for q_data in questions_data:
            question, created = Question.objects.get_or_create(
                course=course,
                lesson=lesson1,
                question_text=q_data['question_text'],
                defaults={'grade': q_data['grade']}
            )
            
            if created:
                for choice_text, is_correct in q_data['choices']:
                    Choice.objects.create(
                        question=question,
                        choice_text=choice_text,
                        is_correct=is_correct
                    )
                self.stdout.write(f'  Created question: {question.question_text}')

        # Create Lesson 2
        lesson2, created = Lesson.objects.get_or_create(
            course=course,
            title='Django Models and ORM',
            defaults={
                'order': 2,
                'content': 'Django models are Python classes that define the structure of your database tables. The ORM (Object-Relational Mapping) allows you to interact with your database using Python code.'
            }
        )

        questions_data_2 = [
            {
                'question_text': 'What does ORM stand for in Django?',
                'grade': 5,
                'choices': [
                    ('Object-Relational Mapping', True),
                    ('Object Resource Manager', False),
                    ('Operational Relationship Model', False),
                    ('Online Resource Module', False)
                ]
            },
            {
                'question_text': 'Which command creates database tables from models?',
                'grade': 5,
                'choices': [
                    ('python manage.py migrate', True),
                    ('python manage.py makemigrations', False),
                    ('python manage.py createsuperuser', False),
                    ('python manage.py runserver', False)
                ]
            }
        ]

        for q_data in questions_data_2:
            question, created = Question.objects.get_or_create(
                course=course,
                lesson=lesson2,
                question_text=q_data['question_text'],
                defaults={'grade': q_data['grade']}
            )
            
            if created:
                for choice_text, is_correct in q_data['choices']:
                    Choice.objects.create(
                        question=question,
                        choice_text=choice_text,
                        is_correct=is_correct
                    )
                self.stdout.write(f'  Created question: {question.question_text}')

        self.stdout.write(self.style.SUCCESS('\n✅ Sample data created successfully!'))
        self.stdout.write(self.style.SUCCESS(f'Course: {course.name}'))
        self.stdout.write(self.style.SUCCESS(f'Total Questions: {Question.objects.filter(course=course).count()}'))
        self.stdout.write(self.style.SUCCESS(f'Total Possible Score: {sum(q.grade for q in Question.objects.filter(course=course))}'))
