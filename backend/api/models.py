from django.db import models
import uuid
from django.core.exceptions import ValidationError

class Option(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.TextField(null=True)
    content = models.TextField(default="")
    
    def __str__(self):
        return f"Option {self.title}"

class Question(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    content = models.TextField(default="")
    options = models.ManyToManyField(Option, related_name='questions')
    answer = models.ForeignKey(
        Option,
        on_delete=models.PROTECT,
        related_name='correct_for_questions',
        null=True
    )
    subject = models.ForeignKey(
        'Subject',
        on_delete=models.CASCADE,
        related_name='questions',
        null=True
    )

    def clean(self):
        super().clean()
        # We can only validate if we have an ID (object is saved) and an answer
        if self.id and self.answer:
            # Get all valid options for this question
            valid_options = self.options.all()
            # Check if the answer is among the valid options
            if self.answer not in valid_options:
                raise ValidationError({
                    'answer': 'The answer must be one of the options associated with this question.'
                })

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.clean()  # Run validation after save to handle M2M relationships

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
        return self.title

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
        return self.title


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