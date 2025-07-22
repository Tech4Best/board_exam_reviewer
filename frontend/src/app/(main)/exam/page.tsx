"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { exams, Exam, Subject } from "./exams";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Question } from "@/types/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ActiveExam {
  id: number;
  examId: string;
  subjectId: string;
  questions: Question[];
  userAnswers: (string | null)[];
  currentQuestionIndex: number;
  startTime: string;
}

export default function Page() {
  const [step, setStep] = useState<"subject" | "questions" | "loading">(
    "loading",
  );
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("");
  const [activeExam, setActiveExam] = useState<ActiveExam | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const existingExam = localStorage.getItem("activeExam");
    if (existingExam) {
      const parsedExam: ActiveExam = JSON.parse(existingExam);
      setActiveExam(parsedExam);
      setSelectedExamId(parsedExam.examId);
      setSelectedSubjectId(parsedExam.subjectId);
      setStep("questions");
      setSelectedAnswer(
        parsedExam.userAnswers[parsedExam.currentQuestionIndex],
      );
    } else {
      const storedExamId = localStorage.getItem("selectedExam");
      if (storedExamId) {
        setSelectedExamId(storedExamId);
        setStep("subject");
      } else {
        router.push("/settings");
      }
    }
  }, [router]);

  const handleSubjectSelect = (subjectId: string) => {
    if (!selectedExamId) return;

    setSelectedSubjectId(subjectId);
    setStep("questions");
    const exam = exams.find((e) => e.id === selectedExamId);
    if (!exam) return;

    let questions: Question[] = [];
    if (subjectId === "all-subjects") {
      questions = exam.subjects.flatMap((s) => s.questions);
    } else {
      const subject = exam.subjects.find((s) => s.id === subjectId);
      if (subject) {
        questions = subject.questions;
      }
    }

    if (questions.length > 0) {
      const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
      const newExam: ActiveExam = {
        id: Date.now(),
        examId: exam.id,
        subjectId: subjectId,
        questions: shuffledQuestions,
        userAnswers: Array(shuffledQuestions.length).fill(null),
        currentQuestionIndex: 0,
        startTime: new Date().toISOString(),
      };
      localStorage.setItem("activeExam", JSON.stringify(newExam));
      setActiveExam(newExam);
    }
  };

  useEffect(() => {
    if (activeExam) {
      localStorage.setItem("activeExam", JSON.stringify(activeExam));
    }
  }, [activeExam]);

  if (step === "loading") {
    return <div>Loading...</div>;
  }

  if (step === "subject") {
    const exam = exams.find((e) => e.id === selectedExamId);
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Select Subject</CardTitle>
            <CardDescription>{exam?.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              onValueChange={handleSubjectSelect}
              value={selectedSubjectId}
            >
              <div className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value="all-subjects" id="all-subjects" />
                <Label htmlFor="all-subjects">All Subjects</Label>
              </div>
              {exam?.subjects.map((subject) => (
                <div
                  key={subject.id}
                  className="flex items-center space-x-2 mb-2"
                >
                  <RadioGroupItem value={subject.id} id={subject.id} />
                  <Label htmlFor={subject.id}>{subject.name}</Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!activeExam) {
    return <div>Loading exam...</div>;
  }

  const { questions, userAnswers, currentQuestionIndex } = activeExam;
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const finalizeExam = () => {
    let finalScore = 0;
    for (let i = 0; i < questions.length; i++) {
      if (userAnswers[i] === questions[i].answer) {
        finalScore++;
      }
    }

    const examResult = {
      examNumber: activeExam.id,
      score: finalScore,
      total: questions.length,
      date: new Date().toISOString(),
      dateStarted: new Date(activeExam.startTime),
      dateFinished: new Date(),
      status: "completed" as "completed",
      examQuestions: questions.length,
      questions: questions,
      userAnswers: userAnswers,
      examId: activeExam.examId,
      subjectId: activeExam.subjectId,
    };

    const existingScores = JSON.parse(
      localStorage.getItem("examScores") || "[]",
    );
    localStorage.setItem(
      "examScores",
      JSON.stringify([...existingScores, examResult]),
    );
    sessionStorage.setItem(
      "examReview",
      JSON.stringify({ questions: questions, userAnswers: userAnswers }),
    );
    localStorage.removeItem("activeExam");
    router.push(`/results?score=${finalScore}&total=${questions.length}`);
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      finalizeExam();
    } else {
      setActiveExam((prev) => {
        if (!prev) return null;
        const nextIndex = prev.currentQuestionIndex + 1;
        setSelectedAnswer(prev.userAnswers[nextIndex]);
        return { ...prev, currentQuestionIndex: nextIndex };
      });
    }
  };

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswer(answerId);
    setActiveExam((prev) => {
      if (!prev) return null;
      const newUserAnswers = [...prev.userAnswers];
      newUserAnswers[prev.currentQuestionIndex] = answerId;
      return { ...prev, userAnswers: newUserAnswers };
    });
  };

  return (
    <div className="flex justify-center items-center h-full">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Question {currentQuestionIndex + 1}</CardTitle>
          <CardDescription>{currentQuestion.text}</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            onValueChange={handleAnswerSelect}
            value={selectedAnswer || ""}
          >
            {currentQuestion.choices.map((choice) => (
              <div key={choice.id} className="flex items-center space-x-2">
                <RadioGroupItem value={choice.id} id={choice.id} />
                <Label htmlFor={choice.id}>{choice.text}</Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">End Exam</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will end the exam and your score will be calculated based
                  on the answers you have provided so far.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={finalizeExam}>
                  End Exam
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button onClick={handleNextQuestion}>
            {isLastQuestion ? "Finish" : "Next"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
