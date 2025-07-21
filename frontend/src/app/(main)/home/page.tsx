"use client"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { columns, ExamScore } from "./columns"
import { DataTable } from "./data-table"


export default function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

  const [examScores, setExamScores] = useState<ExamScore[]>([])

  useEffect(() => {
    // TODO: Add exam scores
    setExamScores([
      {
        examNumber: 1,
        score: 80,
        date: "2025-01-01",
        dateStarted: new Date("2025-01-01"),
        dateFinished: new Date("2025-01-01"),
        status: "completed",
        examQuestions: 100,
      },
      {
        examNumber: 2,
        score: 80,
        date: "2025-01-01",
        dateStarted: new Date("2025-01-01"),
        dateFinished: new Date("2025-01-01"),
        status: "completed",
        examQuestions: 100,
      },
      {
        examNumber: 3,
        score: 80,
        date: "2025-01-01",
        dateStarted: new Date("2025-01-01"),
        dateFinished: new Date("2025-01-01"),
        status: "completed",
        examQuestions: 100,
      },
      {
        examNumber: 4,
        score: 80,
        date: "2025-01-01",
        dateStarted: new Date("2025-01-01"),
        dateFinished: new Date("2025-01-01"),
        status: "completed",
        examQuestions: 100,
      },
      {
        examNumber: 5,
        score: 80,
        date: "2025-01-01",
        dateStarted: new Date("2025-01-01"),
        dateFinished: new Date("2025-01-01"),
        status: "completed",
        examQuestions: 100,
      },
      {
        examNumber: 6,
        score: 80,
        date: "2025-01-01",
        dateStarted: new Date("2025-01-01"),
        dateFinished: new Date("2025-01-01"),
        status: "completed",
        examQuestions: 100,
      },
    ])
  }, []
  )

  return <div>
    <div className="flex flex-row gap-4 justify-between">
      <h1 className="text-2xl font-bold">Home</h1>
      <Button> Start Exam </Button>
    </div>
    <div className="flex flex-col gap-4 mt-5">
      <div className="flex flex-row justify-between">
        <p className="text-lg font-semibold">Exam Scores</p>
        <Button size="sm" variant="link">View All</Button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <DataTable columns={columns} data={examScores} />
      </div>
    </div>
  </div >

}
