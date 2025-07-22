"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { exams } from "../exam/exams";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function Page() {
  const [selectedExam, setSelectedExam] = useState<string>("");
  const { push } = useRouter();

  useEffect(() => {
    const storedExam = localStorage.getItem("selectedExam");
    if (storedExam) {
      setSelectedExam(storedExam);
    }
  }, []);

  const handleExamChange = (examId: string) => {
    setSelectedExam(examId);
    localStorage.setItem("selectedExam", examId);
    push("/");
    // Optionally, you could show a toast or confirmation message here
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Exam Configuration</CardTitle>
          <CardDescription>
            Select the exam you want to take or review. This will filter the
            scores and available exams.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <Label htmlFor="exam-select">Select Exam</Label>
            <Select onValueChange={handleExamChange} value={selectedExam}>
              <SelectTrigger id="exam-select">
                <SelectValue placeholder="Select an exam" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Exams</SelectLabel>
                  {exams.map((exam) => (
                    <SelectItem key={exam.id} value={exam.id} disabled={exam.id == selectedExam}>
                      {exam.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
