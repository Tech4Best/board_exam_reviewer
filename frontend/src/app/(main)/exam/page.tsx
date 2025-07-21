"use client";

import { useState } from "react";
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

export default function Page() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>(
    Array(questionBank.length).fill(null)
  );
  const router = useRouter();

  const currentQuestion = questionBank[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questionBank.length - 1;

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
        total: questionBank.length,
        date: new Date().toISOString(),
        dateStarted: new Date(),
        dateFinished: new Date(),
        status: "completed",
        examQuestions: questionBank.length,
      };

      const existingScores = JSON.parse(localStorage.getItem("examScores") || "[]");
      localStorage.setItem("examScores", JSON.stringify([...existingScores, examResult]));

      const finalAnswers = [...userAnswers];
      finalAnswers[currentQuestionIndex] = selectedAnswer;
      sessionStorage.setItem("examReview", JSON.stringify({ questions: questionBank, userAnswers: finalAnswers }));

      router.push(`/results?score=${newScore}&total=${questionBank.length}`);
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
        <CardFooter>
          <Button onClick={handleNextQuestion}>
            {isLastQuestion ? "Finish" : "Next"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 