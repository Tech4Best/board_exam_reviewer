from django.shortcuts import render,get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Coverage,Question,Option,Subject,Exam
from .serializers import CoverageSerializer, QuestionSerializer, OptionSerializer, SubjectSerializer, ExamSerializer

from rest_framework import permissions, viewsets

class ExamViewSet(viewsets.ModelViewSet):
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer
    permission_classes = [permissions.AllowAny]

class CoverageViewSet(viewsets.ModelViewSet):
    queryset = Coverage.objects.all()
    serializer_class = CoverageSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self,):
        exam_id = self.request.query_params.get('exam_id',None)
        if exam_id is not None:
            try:
                exam = Exam.objects.get(pk=exam_id)
                self.queryset = Coverage.objects.filter(exam=exam)
            except Exam.DoesNotExist:
                self.queryset = Coverage.objects.none()
        return self.queryset

class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self,):
        coverage_id = self.request.query_params.get('coverage_id',None)
        if coverage_id is not None:
            try:
                coverage = Coverage.objects.get(pk=coverage_id)
                self.queryset = Subject.objects.filter(coverage=coverage)
            except Exam.DoesNotExist:
                self.queryset = Coverage.objects.none()
        return self.queryset

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        subject_id = self.request.query_params.get('subject_id',None)
        if subject_id is not None:
            try:
                subject = Subject.objects.get(pk=subject_id)
                self.queryset = Question.objects.filter(subject=subject)
            except Exam.DoesNotExist:
                self.queryset = Question.objects.none()
        return self.queryset

class OptionViewSet(viewsets.ModelViewSet):
    queryset = Option.objects.all()
    serializer_class = OptionSerializer
    permission_classes = [permissions.AllowAny]