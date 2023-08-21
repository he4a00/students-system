"use client";

import api from "@/app/lib/api";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

const TeacherInfo = () => {
  const pathname = usePathname();
  const parts = pathname.split("/");
  const id = parts[parts.length - 1];

  const {
    data: studentsInfo,
    isLoading,
    isError,
  } = useQuery(["students", id], () => {
    return api.get(`/teacher/${id}/students/`);
  });

  console.log(studentsInfo?.data);

  const teacherStudents = studentsInfo?.data || [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading students data.</div>;
  }

  return (
    <div className="p-12 overflow-auto">
      <div className="max-h-[calc(100vh-160px)] overflow-auto">
        <div className="overflow-x-auto">
          <Table className="min-w-full table-auto">
            <TableCaption>A list of your recent students.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Gender</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teacherStudents?.map((student: any) => (
                <TableRow key={student._id}>
                  <TableCell width={320} className="font-medium text-white">
                    <Link
                      href={`/students/info/${student?._id}`}
                      className="hover:underline"
                    >
                      {student?.name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-white w-[200px]">
                    {student?.phoneNumber}
                  </TableCell>
                  <TableCell className="text-white">
                    {student.gender.charAt(0).toUpperCase() +
                      student.gender.slice(1)}
                  </TableCell>
                  <TableCell className="text-white"></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default TeacherInfo;
