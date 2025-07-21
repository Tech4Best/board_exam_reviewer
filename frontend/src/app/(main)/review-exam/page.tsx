"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ExamScore } from "../home/columns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  const searchParams = useSearchParams();
  const examId = searchParams.get("id");
  const [reviewData, setReviewData] = useState<ExamScore | null>(null);

  useEffect(() => {
    if (examId) {
      const allScores = JSON.parse(localStorage.getItem("examScores") || "[]");
      const examToReview = allScores.find(
        (score: ExamScore) => String(score.examNumber) === examId
      );
      setReviewData(examToReview || null);
    }
  }, [examId]);

  return (
    <div className="flex justify-center items-center h-full">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Exam Review</CardTitle>
          <CardDescription>
            Here is a review of your exam.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60vh]">
            {reviewData &&
              reviewData.questions.map((question, index) => (
                <div key={question.id} className="mb-4">
                  <p>
                    <strong>
                      {index + 1}. {question.text}
                    </strong>
                  </p>
                  <p>
                    Your answer:{" "}
                    {reviewData.userAnswers[index]
                      ? question.choices.find(
                          (c) => c.id === reviewData.userAnswers[index]
                        )?.text
                      : "No answer"}
                  </p>
                  <p>
                    Correct answer:{" "}
                    {
                      question.choices.find((c) => c.id === question.answer)
                        ?.text
                    }
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {question.explanation}
                  </p>
                  <Separator className="my-4" />
                </div>
              ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
} 