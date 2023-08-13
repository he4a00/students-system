"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";

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
  const { data, isLoading, isError } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const { data } = await api.get("/students/");
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading students data.</div>;
  }

  return (
    <div className="p-12 overflow-auto">
      <div className="max-h-[calc(100vh-160px)] overflow-auto">
        <Table>
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
            {data.students?.map((student: StudentProps) => (
              <TableRow key={student.name}>
                <TableCell className="font-medium text-white">
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
  );
}
