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
import { useState } from "react";
import { Button } from "@/components/ui/button";
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

const StudentPaymentInfo = ({ studentId }: { studentId: string }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useQuery(
    ["payments", studentId, currentPage],
    ({ queryKey }: any) => {
      const [, id, page] = queryKey;
      return api.get(`/payment/${id}/payments/?page=${page}`);
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  const studentPayments = data?.data.payments || [];
  const totalPages = data?.data.totalPages || 1;

  if (isLoading) {
    return (
      <div className="p-8">
        <SkeletonDemo />;
      </div>
    );
  }

  if (isError) {
    return <h1 className="text-white">حدث خطأ في تحميل البيانات</h1>;
  }

  return (
    <div className="p-12 overflow-auto">
      <div className="max-h-[calc(100vh-160px)] overflow-auto">
        <div className="overflow-x-auto">
          <Table className="min-w-full table-auto">
            <TableCaption>قائمة بالشهور المدفوعة الخاصة بالطالب</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">الشهر</TableHead>
                <TableHead>السنة</TableHead>
                <TableHead>حالة الدفع</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentPayments?.map((payment: any) => (
                <TableRow key={payment._id}>
                  <TableCell width={320} className="font-medium text-white">
                    {payment?.month}
                  </TableCell>
                  <TableCell className="text-white w-[200px]">
                    {payment?.year}
                  </TableCell>
                  <TableCell className="text-white">
                    {payment.isPaid ? "مدفوع" : "غير مدفوع"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex justify-center gap-5 p-4">
        <Button
          variant="secondary"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          الصفحة السابقة
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
};

export default StudentPaymentInfo;
