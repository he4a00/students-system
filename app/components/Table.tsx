"use client";

import { useQuery } from "@tanstack/react-query";
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
import DeleteStudentButton from "./DeleteStudentButton";
import { SkeletonDemo } from "./LoadingSkelton";
import SearchBar from "./SearchBar";

interface StudentProps {
  _id: string;
  name: string;
  phoneNumber: string;
  gender: string;
  teacher: {
    id: string;
    name: string;
    gender: string;
    subject: string;
  }[];
  monthlyPayment: {
    id: string;
    month: string;
    year: number;
    isPaid: boolean;
  };
}

export function TableDemo() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError } = useQuery(
    ["students", currentPage, searchTerm],
    ({ queryKey }: any) => {
      const [, page, name] = queryKey;
      return api.get(`/students/?page=${page}&name=${name}`);
    }
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen gap-10">
        <SkeletonDemo />
        <SkeletonDemo />
        <SkeletonDemo />
      </div>
    );
  }

  const students = data?.data.students || [];
  const totalPages = data?.data.totalPages || 1;

  return (
    <div className="p-12 overflow-auto">
      <div className="flex justify-center">
        <SearchBar onSearch={setSearchTerm} />
      </div>
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
              {students.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-white">
                    No students available yet.
                  </TableCell>
                </TableRow>
              ) : (
                students?.map((student: StudentProps) => (
                  <TableRow key={student._id}>
                    <TableCell width={320} className="font-medium text-white">
                      {student.name}
                    </TableCell>
                    <TableCell className="text-white w-[200px]">
                      {student.gender.charAt(0).toUpperCase() +
                        student.gender.slice(1)}
                    </TableCell>
                    <TableCell className="text-white">
                      <Link href={`/students/info/${student._id}`}>
                        View Teachers
                      </Link>
                    </TableCell>
                    <TableCell className="text-white">
                      {student.phoneNumber}
                    </TableCell>

                    <TableCell className="text-white text-right gap-4 flex justify-end">
                      <DeleteStudentButton
                        studentId={student?._id}
                        currentPage={currentPage}
                      />

                      <Link href={`/students/${student._id}`}>
                        <Button variant="secondary">Edit</Button>
                      </Link>
                      <Link href={`/students/info/${student._id}`}>
                        <Button variant="secondary">View</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
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
