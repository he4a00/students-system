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

const StudentAttendanceInfo = ({ studentId }: { studentId: string }) => {
  const { data, isLoading, isError } = useQuery(["students", studentId], () => {
    return api.get(`/students/${studentId}`);
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading students data.</div>;
  }

  const student = data?.data || [];
  console.log(student);
  return (
    <div className="p-12 overflow-auto">
      <div className="max-h-[calc(100vh-160px)] overflow-auto">
        <div className="overflow-x-auto">
          <Table className="min-w-full table-auto">
            <TableCaption>
              A list of your recent students attendance.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Absence</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {student?.attendence?.map((att: any) => {
                console.log(att);
                const formattedDate = new Date(att?.date).toLocaleDateString(
                  "en-US",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }
                );
                return (
                  <TableRow key={att._id}>
                    <TableCell className="text-white">
                      {att.present ? "Absent" : "Not Absent"}
                    </TableCell>
                    <TableCell className="text-white text-right">
                      {formattedDate}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendanceInfo;
