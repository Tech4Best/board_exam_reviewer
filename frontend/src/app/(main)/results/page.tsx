"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Question } from "@/types/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  const searchParams = useSearchParams();
  const score = searchParams.get("score");
  const total = searchParams.get("total");
  const [reviewData, setReviewData] = useState<{
    questions: Question[];
    userAnswers: (string | null)[];
  } | null>(null);

  useEffect(() => {
    const data = sessionStorage.getItem("examReview");
    if (data) {
      setReviewData(JSON.parse(data));
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-full">
      <Card className="w-full max-w-2xl text-center">
        <CardHeader>
          <CardTitle>Exam Results</CardTitle>
          <CardDescription>Well done!</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Your score is:{" "}
            <strong>
              {score} / {total}
            </strong>
          </p>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Link href="/home">
            <Button>Go to Home</Button>
          </Link>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Review Answers</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Review Answers</DialogTitle>
                <DialogDescription>
                  Here are the questions and your answers.
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className="h-96">
                {reviewData &&
                  reviewData.questions.map((question, index) => (
                    <div key={question.id} className="mb-4">
                      <p><strong>{index + 1}. {question.text}</strong></p>
                      <p>Your answer: {reviewData.userAnswers[index] ? question.choices.find(c => c.id === reviewData.userAnswers[index])?.text : "No answer"}</p>
                      <p>Correct answer: {question.choices.find(c => c.id === question.answer)?.text}</p>
                      <p className="text-sm text-muted-foreground">{question.explanation}</p>
                      <Separator className="my-4" />
                    </div>
                  ))}
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
} 