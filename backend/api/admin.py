from django.contrib import admin
from api.models import Exam, Subject, Question,Option, Coverage
from django_summernote.admin import SummernoteModelAdmin

# Apply summernote to all TextField in model.
class QuestionAdmin(SummernoteModelAdmin):
    summernote_fields = ('content',)
class OptionAdmin(SummernoteModelAdmin):
    summernote_fields = ('content',)


admin.site.register(Question,QuestionAdmin)
admin.site.register(Subject)
admin.site.register(Coverage)
admin.site.register(Exam)
admin.site.register(Option, OptionAdmin)
# Register your models here.
