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

export type ExamScore = {
  examNumber: number;
  score: number;
  date: string;
  dateStarted: Date;
  dateFinished: Date | null;
  status: "pending" | "completed" | "failed";
  examQuestions: number;
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
    accessorKey: "date",
    header: "Date",
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
            <DropdownMenuItem>View Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
]; 