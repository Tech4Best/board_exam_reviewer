"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { columns, ExamScore } from "../home/columns";
import { DataTable } from "../home/data-table";
import { exams } from "../exam/exams";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ScoresPage() {
  const [examScores, setExamScores] = useState<ExamScore[]>([]);
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedExamId = localStorage.getItem("selectedExam");
    if (storedExamId) {
      setSelectedExamId(storedExamId);
    } else {
      router.push("/settings");
    }

    const storedScores = localStorage.getItem("examScores");
    if (storedScores) {
      const allScores: ExamScore[] = JSON.parse(storedScores);
      const filteredScores = allScores.filter(
        (score) => score.examId === storedExamId,
      );
      setExamScores(filteredScores);
    }
  }, [router]);

  const selectedExam = exams.find((e) => e.id === selectedExamId);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Scores</h1>
      <Card>
        <CardHeader>
          <CardTitle>
            {selectedExam ? `${selectedExam.name} Scores` : "Exam Scores"}
          </CardTitle>
          <CardDescription>
            Here are your scores for the selected exam.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={examScores} />
        </CardContent>
      </Card>
    </div>
  );
}
