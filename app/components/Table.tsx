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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { educationYears } from "@/constants";

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
  const [filter, setFilter] = useState("");

  const { data, isLoading, isError } = useQuery(
    ["students", currentPage, searchTerm, filter],
    ({ queryKey }: any) => {
      const [, page, name, eduyear] = queryKey;
      return api.get(`/students/?eduyear=${filter}&page=${page}&name=${name}`);
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
      <div className="pb-2 flex flex-row justify-between gap-5">
        <div className="flex gap-5">
          <Link href="/add-student">
            <Button variant="secondary" className="">
              أضافة طالب
            </Button>
          </Link>
          <Link href="/teachers/add-teacher">
            <Button variant="secondary" className="">
              أضافة مدرس
            </Button>
          </Link>
        </div>
        <Select onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="اختر الصف" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>الصفوف </SelectLabel>
              {educationYears?.map((edu) => {
                return (
                  <SelectItem key={edu.name} value={edu.name}>
                    {edu.name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="max-h-[calc(100vh-160px)] overflow-auto">
        <div className="overflow-x-auto">
          <Table className="min-w-full table-auto">
            <TableCaption>قائمة بأسماء الطلاب الجدد</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">الأسم</TableHead>
                <TableHead>النوع</TableHead>
                <TableHead>المدرسين</TableHead>
                <TableHead> رقم الهاتف</TableHead>
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
                      {student.gender === "male" ? "ذكر" : "أنثي"}
                    </TableCell>
                    <TableCell className="text-white">
                      <Link href={`/students/info/${student._id}`}>
                        عرض المدرسين
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
                        <Button variant="secondary">تعديل</Button>
                      </Link>
                      <Link href={`/students/info/${student._id}`}>
                        <Button variant="secondary">عرض</Button>
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
          الصفحة السابقة{" "}
        </Button>
        <Button
          variant="secondary"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          الصفحة التالية{" "}
        </Button>
      </div>
    </div>
  );
}
