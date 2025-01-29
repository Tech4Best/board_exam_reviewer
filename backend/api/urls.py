from django.urls import include,path
from .views import ExamViewSet, CoverageViewSet, OptionViewSet, QuestionViewSet, SubjectViewSet

from rest_framework import routers

apirouter = routers.DefaultRouter()

apirouter.register(r'exam',ExamViewSet)
apirouter.register(r'coverage',CoverageViewSet)
apirouter.register(r'subject',SubjectViewSet)
apirouter.register(r'question',QuestionViewSet)
apirouter.register(r'option',OptionViewSet)