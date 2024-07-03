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
import Link from "next/link";
import { SkeletonDemo } from "./LoadingSkelton";

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
  };
  monthlyPayment: {
    id: string;
    month: string;
    year: number;
    isPaid: boolean;
  };
}

const StudentTeacherInfo = ({ studentId }: { studentId: string }) => {
  const { data, isLoading, isError } = useQuery(["students", studentId], () => {
    return api.get(`/students/${studentId}`);
  });

  if (isLoading) {
    return (
      <div className="p-8">
        <SkeletonDemo />;
      </div>
    );
  }

  if (isError) {
    return <div>Error loading students data.</div>;
  }

  const student = data?.data || [];

  return (
    <div className="p-12 overflow-auto">
      <div className="max-h-[calc(100vh-160px)] overflow-auto">
        <div className="overflow-x-auto">
          <Table className="min-w-full table-auto">
            <TableCaption>قائمة بالمدرسين الخاصين بالطالب</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">الأسم</TableHead>
                <TableHead>المادة</TableHead>
                <TableHead>النوع</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {student?.teacher?.map((tea: any) => (
                <TableRow key={tea._id}>
                  <TableCell width={320} className="font-medium text-white">
                    <Link
                      href={`/teachers/${tea?._id}`}
                      className="hover:underline"
                    >
                      {tea?.name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-white w-[200px]">
                    {tea?.subject}
                  </TableCell>
                  <TableCell className="text-white">
                    {tea.gender.charAt(0).toUpperCase() + tea.gender.slice(1)}
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

export default StudentTeacherInfo;
