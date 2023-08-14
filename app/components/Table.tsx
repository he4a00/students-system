"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import api from "../lib/api";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

interface StudentProps {
  id: string;
  name: string;
  phoneNumber: string;
  gender: string;
  teacher: {
    id: string;
    name: string;
    gender: string;
    subject: string;
  };
  monthlyPayment: {
    id: string;
    month: string;
    year: number;
    isPaid: boolean;
  };
}

export function TableDemo() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useQuery(
    ["students", currentPage],
    ({ queryKey }: any) => {
      const [, page] = queryKey;
      return api.get(`/students/?page=${page}`);
    }
  );
  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading students data.</div>;
  }

  const students = data?.data.students || [];
  const totalPages = data?.data.totalPages || 1;
  return (
    <div className="p-12 overflow-auto">
      <div className="pb-2">
        <Link href="/add-student">
          <Button variant="secondary" className="">
            Add Student
          </Button>
        </Link>
      </div>
      <div className="max-h-[calc(100vh-160px)] overflow-auto">
        <div className="overflow-x-auto">
          <Table className="min-w-full table-auto">
            <TableCaption>A list of your recent students.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Teacher</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students?.map((student: StudentProps) => (
                <TableRow key={student.name}>
                  <TableCell width={320} className="font-medium text-white">
                    {student.name}
                  </TableCell>
                  <TableCell className="text-white w-[200px]">
                    {student.gender.charAt(0).toUpperCase() +
                      student.gender.slice(1)}
                  </TableCell>
                  <TableCell className="text-white">
                    {student.teacher.length > 0
                      ? student.teacher[0].name
                      : "No Teacher."}
                  </TableCell>
                  <TableCell className="text-white">
                    {student.phoneNumber}
                  </TableCell>

                  <TableCell className="text-white text-right gap-4 flex justify-end">
                    <Button variant="destructive">Delete</Button>
                    <Button variant="secondary">Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className=" flex justify-center gap-5 p-4">
        <Button
          variant="secondary"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          Previous Page
        </Button>
        <Button
          variant="secondary"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          Next Page
        </Button>
      </div>
    </div>
  );
}
