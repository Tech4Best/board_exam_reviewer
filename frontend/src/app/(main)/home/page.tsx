"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { columns, ExamScore } from "./columns";
import { DataTable } from "./data-table";
import { useRouter } from "next/navigation";
import { exams } from "../exam/exams";

export default function Page() {
  const [filteredScores, setFilteredScores] = useState<ExamScore[]>([]);
  const [selectedExamName, setSelectedExamName] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const selectedExamId = localStorage.getItem("selectedExam");

    if (!selectedExamId) {
      router.push("/settings");
      return;
    }

    const exam = exams.find((e) => e.id === selectedExamId);
    setSelectedExamName(exam ? exam.name : "Selected Exam");

    const storedScores = localStorage.getItem("examScores");
    if (storedScores) {
      const allScores: ExamScore[] = JSON.parse(storedScores);
      const scoresForSelectedExam = allScores.filter(
        (score) => score.examId === selectedExamId,
      );
      setFilteredScores(scoresForSelectedExam);
    }
  }, [router]);

  const handleClearHistory = () => {
    const selectedExamId = localStorage.getItem("selectedExam");
    const storedScores = localStorage.getItem("examScores");
    if (storedScores && selectedExamId) {
      const allScores: ExamScore[] = JSON.parse(storedScores);
      const remainingScores = allScores.filter(
        (score) => score.examId !== selectedExamId,
      );
      localStorage.setItem("examScores", JSON.stringify(remainingScores));
      setFilteredScores([]);
    }
  };

  return (
    <div>
      <div className="flex flex-row gap-4 justify-between items-center">
        <h1 className="text-2xl font-bold">Home</h1>
        <div className="flex gap-2">
          <Button onClick={() => router.push("/exam")}>Start Exam</Button>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-5">
        <div className="flex flex-row justify-between items-center">
          <p className="text-lg font-semibold">Scores for {selectedExamName}</p>
          <Button size="sm" variant="destructive" onClick={handleClearHistory}>
            Clear History for {selectedExamName}
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <DataTable columns={columns} data={filteredScores} />
        </div>
      </div>
    </div>
  );
}
