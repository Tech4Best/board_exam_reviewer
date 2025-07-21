"use client";
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';

/*
 * This is hardcoded for now but this should be
 * fetched via an api to the backend
 */
interface Exam {
  id: string;
  name: string
}
const exams: Exam[] = [
  { id: "1", name: "CIIE Exam" },
  { id: "2", name: "LET Exam" },
]

const examList = exams.map((item) => {
  return <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
})

export default function Home() {
  const [selectedOption, setSelectedOption] = useState('');
  const { push } = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const exam = localStorage.getItem('exam');
        if (exam) {
          push('/home');
        }
    }
  }, []);

  const gotToHome = (event: any) => {
    event.preventDefault()

    if (selectedOption == '') {
      window.alert("Please select your exam")

    } else {
      localStorage.setItem('exam', selectedOption);
      push('/home');
    }

  }


  return (
    <div className="mx-auto items-center flex flex-col">
      <h1 className="text-4xl font-bold mt-10">ExamBuddyPH</h1>
      <h2 className="text-sm mt-8 text-center"> A project of the <br /> Rotary Club of Fort Bonifacio Global City</h2>

      <Select value={selectedOption}
        onValueChange={(value) => {
          setSelectedOption(value);
        }}
      >
        <SelectTrigger className=" mt-[15rem]">
          <SelectValue placeholder="Select Exam" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select Exam</SelectLabel>
            {examList}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button onClick={(event) => { gotToHome(event) }}>
        Continue
      </Button>
    </div >
  );
}
