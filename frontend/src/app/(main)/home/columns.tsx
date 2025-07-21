"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Question } from "@/types/types";
import { useRouter } from "next/navigation";

export type ExamScore = {
  examNumber: number;
  score: number;
  dateStarted: Date;
  dateFinished: Date | null;
  status: "pending" | "completed" | "failed";
  examQuestions: number;
  questions: Question[];
  userAnswers: (string | null)[];
};

export const columns: ColumnDef<ExamScore>[] = [
  {
    accessorKey: "examNumber",
    header: "Attempt",
    cell: ({ row }) => {
      return <div>Exam #{row.original.examNumber}</div>;
    },
  },
  {
    accessorKey: "dateFinished",
    header: "Date",
    cell: ({ row }) => {
      const { dateFinished } = row.original;
      if (dateFinished != null) {
        const date = new Date(dateFinished);
        if (!isNaN(date.getTime())) {
          const formatter = new Intl.DateTimeFormat("en-US", {
            dateStyle: "short",
          });
          const formattedDate = formatter.format(date);
          return <div>{formattedDate}</div>;
        } else {
          return <div>Invalid date</div>;
        }
      }
      return <div>Unfinished</div>;
    },
  },
  {
    accessorKey: "score",
    header: "Score",
    cell: ({ row }) => {
      const { score, examQuestions } = row.original;
      return <div>{`${score} / ${examQuestions}`}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const examScore = row.original;
      const router = useRouter();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(String(examScore.examNumber))}
            >
              Copy Exam Number
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                router.push(`/review-exam?id=${examScore.examNumber}`);
              }}
            >
              View Details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
]; 