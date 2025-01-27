from django.db import models
import uuid
import json
from django.core.exceptions import ValidationError

class ContentMixin(models.Model):
    """Abstract base class for content fields"""
    _content = models.TextField(db_column='content')

    class Meta:
        abstract = True

    @property
    def content(self):
        """Deserialize JSON content from TextField"""
        try:
            return json.loads(self._content)
        except (json.JSONDecodeError, TypeError):
            return []

    @content.setter
    def content(self, value):
        """Serialize content to JSON for storage"""
        self._content = json.dumps(value)

    def clean(self):
        """Validate content structure"""
        try:
            content = self.content
        except json.JSONDecodeError:
            raise ValidationError("Invalid JSON content")

        if not isinstance(content, list):
            raise ValidationError("Content must be an array")
        
        for item in content:
            if not isinstance(item, dict) or 'type' not in item:
                raise ValidationError("Each content item must be an object with a type")
            
            if item['type'] not in ['latex', 'image', 'markdown']:
                raise ValidationError("Invalid content type")
            
            if item['type'] == 'latex' or item['type'] == 'markdown':
                if 'value' not in item or not isinstance(item['value'], str):
                    raise ValidationError(f"{item['type']} content must have a string value")
            
            elif item['type'] == 'image':
                if 'src' not in item or not isinstance(item['src'], str):
                    raise ValidationError("Image content must have a string src")

class Option(ContentMixin, models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    def __str__(self):
        return f"Option {self.id}"

class Question(ContentMixin, models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    options = models.ManyToManyField(Option, related_name='questions')
    answer = models.ForeignKey(
        Option,
        on_delete=models.PROTECT,
        related_name='correct_for_questions'
    )
    subject = models.ForeignKey(
        'Subject',
        on_delete=models.CASCADE,
        related_name='questions',
        null=True
    )

    def __str__(self):
        return f"Question {self.id}"

class Subject(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    coverage = models.ForeignKey(
        'Coverage',
        on_delete=models.CASCADE,
        related_name='subjects',
        null=True
    )

    def __str__(self):
        return self.name

class Coverage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    exam = models.ForeignKey(
        'Exam',
        on_delete=models.CASCADE,
        related_name='subjects',
        null=True
    )

    def __str__(self):
        return self.name


class Exam(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title

"""
class Result(models.Model):
    date_asked = models.DateTimeField()
    date_finished = models.DateTimeField(null=True, blank=True)
    question = models.ForeignKey(Question, on_delete=models.PROTECT)
    chosen_answer = models.ForeignKey(
        Option,
        on_delete=models.PROTECT,
        related_name='chosen_results'
    )
    correct_answer = models.ForeignKey(
        Option,
        on_delete=models.PROTECT,
        related_name='correct_results'
    )
    is_correct = models.BooleanField()

    def __str__(self):
        return f"Result for question {self.question.id}"

    def save(self, *args, **kwargs):
        # Ensure is_correct matches the relationship between chosen and correct answers
        self.is_correct = self.chosen_answer == self.correct_answer
        super().save(*args, **kwargs)

class Remark(models.Model):
    date_started = models.DateTimeField()
    date_finished = models.DateTimeField(null=True, blank=True)
    results = models.ManyToManyField(Result)

    def __str__(self):
        return f"Remarks started at {self.date_started}"
"""