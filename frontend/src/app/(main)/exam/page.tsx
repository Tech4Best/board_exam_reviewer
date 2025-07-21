"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { questionBank } from "./data";
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

export default function Page() {
  const [isClient, setIsClient] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>([]);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    const shuffledQuestions = [...questionBank].sort(() => Math.random() - 0.5);
    setQuestions(shuffledQuestions);
    setUserAnswers(Array(shuffledQuestions.length).fill(null));
  }, []);

  if (!isClient || questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleEndExam = () => {
    const examResult = {
      examNumber: Date.now(),
      score: score,
      total: questions.length,
      date: new Date().toISOString(),
      dateStarted: new Date(),
      dateFinished: new Date(),
      status: "completed",
      examQuestions: questions.length,
    };

    const existingScores = JSON.parse(localStorage.getItem("examScores") || "[]");
    localStorage.setItem("examScores", JSON.stringify([...existingScores, examResult]));

    sessionStorage.setItem("examReview", JSON.stringify({ questions: questions, userAnswers: userAnswers }));

    router.push(`/results?score=${score}&total=${questions.length}`);
  };

  const handleNextQuestion = () => {
    const newScore = selectedAnswer === currentQuestion.answer ? score + 1 : score;
    if (selectedAnswer === currentQuestion.answer) {
      setScore(newScore);
    }

    if (!isLastQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      const examResult = {
        examNumber: Date.now(), // simple unique id
        score: newScore,
        total: questions.length,
        date: new Date().toISOString(),
        dateStarted: new Date(),
        dateFinished: new Date(),
        status: "completed" as "completed",
        examQuestions: questions.length,
        questions: questions,
        userAnswers: userAnswers,
      };

      const existingScores = JSON.parse(localStorage.getItem("examScores") || "[]");
      localStorage.setItem("examScores", JSON.stringify([...existingScores, examResult]));

      const finalAnswers = [...userAnswers];
      finalAnswers[currentQuestionIndex] = selectedAnswer;
      sessionStorage.setItem("examReview", JSON.stringify({ questions: questions, userAnswers: finalAnswers }));

      router.push(`/results?score=${newScore}&total=${questions.length}`);
    }
  };

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswer(answerId);
    setShowExplanation(true);
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = answerId;
    setUserAnswers(newUserAnswers);
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
          {showExplanation && (
            <div className="mt-4 p-4 bg-muted rounded-md">
              <h3 className="font-bold">Explanation</h3>
              <p>{currentQuestion.explanation}</p>
            </div>
          )}
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
                  This will end the exam and your score will be calculated based on the answers you have provided so far.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleEndExam}>
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