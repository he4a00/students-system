"use client";

import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SkeletonDemo } from "./LoadingSkelton";

const StudentAttendanceInfo = ({ studentId }: { studentId: string }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useQuery(
    ["attendeances", currentPage, studentId],
    ({ queryKey }: any) => {
      const [, page] = queryKey;
      return api.get(`/attendence/${studentId}/?page=${page}`);
    }
  );

  const studentAttendances = data?.data.attendences || [];
  const totalPages = data?.data.totalPages || 1;

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

  return (
    <div className="p-12 overflow-auto">
      <div className="max-h-[calc(100vh-160px)] overflow-auto">
        <div className="overflow-x-auto">
          <Table className="min-w-full table-auto">
            <TableCaption>قائمة بالغياب الخاص بالطالب</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">الغياب</TableHead>
                <TableHead className="text-right">التاريخ</TableHead>
                <TableHead className="text-right">اليوم</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentAttendances?.map((att: any) => {
                const formattedDate = new Date(att?.date).toLocaleDateString(
                  "ar-EG",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }
                );
                const dayOfWeek = new Date(att?.date).toLocaleDateString(
                  "ar-EG",
                  {
                    weekday: "long",
                  }
                );
                return (
                  <TableRow key={att._id}>
                    <TableCell className="text-white w-[150px]">
                      {att.present ? "غائب" : "حاضر"}
                    </TableCell>
                    <TableCell className="text-white text-right w-[250px]">
                      {formattedDate}
                    </TableCell>
                    <TableCell className="text-white text-right w-[250px]">
                      {dayOfWeek}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
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
    </div>
  );
};

export default StudentAttendanceInfo;
