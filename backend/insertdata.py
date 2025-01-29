import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from django.core.management import call_command


import json
from api.models import Subject, Question, Option

data = {}
with open('quiz-json.json') as file:
    data = json.load(file)
    subject_counter = 1
    for subject in data["subjects"]:
        print(subject["title"])
        query_subject =  Subject.objects.all().filter(title__icontains=subject["title"]).first()
        print(query_subject.id)


        question_counter = 1
        for question in subject["questions"]:
            # print(str(counter) + ". "+ question["question"])
            # Create Options
            new_question=Question(
                content="<p>{}</p>".format(question["question"]),
                subject=query_subject)
            
            new_question.save()

            for option in question["options"].keys():
               new_option = Option(title="{}-{}-{}".format(subject_counter,question_counter,option),
                                   content="<p>{}</p>".format(question["options"][option]))
               new_option.save()
               new_question.options.add(new_option)
               print("Created {}-{}-{}".format(subject_counter,question_counter,option))

            right_answer_queryset = Option.objects.filter(title__icontains="{}-{}-{}".format(subject_counter,question_counter,question["correctAnswer"])).first()
            new_question.answer = right_answer_queryset
            new_question.save()
            print("Finished Question # {}".format(question_counter))
            question_counter +=1
        print("____________")

        subject_counter +=1