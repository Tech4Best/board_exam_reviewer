"use client"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { columns, ExamScore } from "./columns"
import { DataTable } from "./data-table"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export default function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

  const [examScores, setExamScores] = useState<ExamScore[]>([])

  useEffect(() => {
    const storedScores = localStorage.getItem("examScores");
    if (storedScores) {
      setExamScores(JSON.parse(storedScores));
    }
  }, []);

  return <div>
    <div className="flex flex-row gap-4 justify-between">
      <h1 className="text-2xl font-bold">Home</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button> Start Exam </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] text-left">
          <DialogHeader>
            <DialogTitle>Exam Setup</DialogTitle>
            <DialogDescription>
              Let us know your preferred setup
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="time">Duration (Minutes)</Label>
              <Input id="time" name="time" type="number" defaultValue="60" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="questions">Question Amount</Label>
              <Input id="questions" name="questions" type="number" defaultValue="60" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
