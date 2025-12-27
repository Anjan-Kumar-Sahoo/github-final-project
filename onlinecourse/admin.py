from django.contrib import admin
from .models import Course, Lesson, Instructor, Learner, Question, Choice, Submission


# LessonInline class (must be defined before CourseAdmin)
class LessonInline(admin.StackedInline):
    model = Lesson
    extra = 5


# QuestionInline class
class QuestionInline(admin.StackedInline):
    model = Question
    extra = 5


# ChoiceInline class
class ChoiceInline(admin.StackedInline):
    model = Choice
    extra = 4


# CourseAdmin class
class CourseAdmin(admin.ModelAdmin):
    inlines = [LessonInline]
    list_display = ('name', 'pub_date')
    list_filter = ['pub_date']
    search_fields = ['name', 'description']


# LessonAdmin class
class LessonAdmin(admin.ModelAdmin):
    inlines = [QuestionInline]
    list_display = ['title', 'course', 'order']
    list_filter = ['course']
    search_fields = ['title']


# QuestionAdmin class
class QuestionAdmin(admin.ModelAdmin):
    inlines = [ChoiceInline]
    list_display = ['question_text', 'course', 'lesson', 'grade']
    list_filter = ['course', 'lesson']
    search_fields = ['question_text']


# Register your models here.
admin.site.register(Course, CourseAdmin)
admin.site.register(Lesson, LessonAdmin)
admin.site.register(Instructor)
admin.site.register(Learner)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Choice)
admin.site.register(Submission)
