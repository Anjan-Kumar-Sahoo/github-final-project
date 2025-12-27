# Django Online Course Application

## Project Name: Online Course Assessment System

A comprehensive Django-based web application for online courses with integrated exam and assessment features.

## Description

This Django application provides a complete online learning platform where instructors can create courses with lessons and exams, and students can enroll, learn, and take assessments. The system includes automatic grading, detailed result analysis, and a user-friendly interface built with Bootstrap.

## Features

- **Course Management**: Create and manage courses with multiple lessons
- **User Authentication**: Registration, login, and logout functionality
- **Enrollment System**: Students can enroll in courses
- **Question Bank**: Multiple-choice questions with automatic grading
- **Exam System**: Take exams and view detailed results
- **Admin Interface**: Full-featured Django admin for content management
- **Bootstrap UI**: Responsive and modern user interface
- **Result Analytics**: Detailed score breakdown and question-by-question analysis

## Technologies Used

- Python 3.8+
- Django 4.x
- Bootstrap 4.5
- SQLite (default) / PostgreSQL
- HTML5/CSS3
- JavaScript/jQuery

## Getting Started

### Prerequisites

- Python 3.8 or higher
- pip (Python package installer)
- Virtual environment (recommended)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd github-final-project
```

2. Create and activate virtual environment
```bash
python -m venv venv
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate
```

3. Install dependencies
```bash
pip install -r requirements.txt
```

4. Run migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

5. Create superuser
```bash
python manage.py createsuperuser
```

6. Run the development server
```bash
python manage.py runserver
```

7. Access the application at `http://localhost:8000`
8. Access admin interface at `http://localhost:8000/admin`

## Project Structure

```
├── onlinecourse/
│   ├── models.py           # Database models (Course, Lesson, Question, etc.)
│   ├── views.py            # View functions (submit, show_exam_result)
│   ├── admin.py            # Admin configurations with inline classes
│   ├── urls.py             # URL routing
│   ├── templates/
│   │   └── onlinecourse/
│   │       ├── course_details_bootstrap.html
│   │       └── exam_result_bootstrap.html
│   └── ...
├── myproject/
│   ├── settings.py
│   ├── urls.py
│   └── ...
├── manage.py
├── requirements.txt
└── README.md
```

## Models

- **Course**: Course information and enrollment tracking
- **Lesson**: Course content organized by lessons
- **Question**: Exam questions with grading points
- **Choice**: Multiple choice answers (correct/incorrect)
- **Submission**: Student exam submissions
- **Enrollment**: Student course enrollments
- **Instructor**: Course instructors
- **Learner**: Student profiles

## Admin Features

- QuestionInline: Add questions directly within lesson admin
- ChoiceInline: Add choices directly within question admin
- Full CRUD operations for all models
- Search and filter functionality

## Usage

1. **Admin Setup**: Login to admin panel and create courses, lessons, and questions
2. **Student Registration**: Students register and login
3. **Enroll in Course**: Browse and enroll in available courses
4. **Take Exam**: Complete the exam questions
5. **View Results**: See detailed results with score breakdown

## Grading System

- Automatic grading based on correct answers
- Points assigned per question
- Percentage calculation
- Pass/Fail status (80% passing grade)
- Detailed feedback on each question

## Author

Created as part of the IBM Developer Skills Network course project - Django Final Assessment

## License

This project is licensed under the Apache License 2.0 - see the LICENSE file for details.

## Acknowledgments

- IBM Developer Skills Network
- Django Software Foundation
- Bootstrap Team
