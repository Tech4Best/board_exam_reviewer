from django.contrib import admin
from api.models import Exam, Subject, Question,Option

admin.site.register(Question)
admin.site.register(Subject)
admin.site.register(Exam)
admin.site.register(Option)
# Register your models here.
