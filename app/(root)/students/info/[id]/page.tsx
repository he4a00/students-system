"use client";

import AddAttendanceForm from "@/app/components/AddAttendanceForm";
import AddPayementForm from "@/app/components/AddPayementForm";
import AddTeacherForm from "@/app/components/AddTeacherForm";
import MarkAttendanceButton from "@/app/components/MarkAttendanceButton";
import StudentAttendanceInfo from "@/app/components/StudentAttendanceInfo";
import StudentPaymentInfo from "@/app/components/StudentPaymentInfo";
import StudentTeacherInfo from "@/app/components/StudentTeacherInfo";
import api from "@/app/lib/api";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import React from "react";

const StudentInfo = () => {
  const pathname = usePathname();
  const parts = pathname.split("/");
  const id = parts[parts.length - 1];

  const { data: student, isLoading } = useQuery(["student", id], async () => {
    const { data } = await api.get(`/students/${id}`);
    return data;
  });

  return (
    <div className="flex flex-col items-start justify-start max-w-3xl px-10 py-20">
      <div className="flex flex-col md:flex-row w-[73vw]">
        <div className="flex-grow pr-4 max-w-50">
          <div className="pt-10 pb-10">
            <h1 className="text-3xl font-bold text-white">
              Add Teacher To Student.
            </h1>
          </div>
          <AddTeacherForm id={student?._id} />
        </div>
        <div className="flex-grow pl-4 max-w-50">
          <div className="pt-10 pb-10">
            <h1 className="text-3xl font-bold text-white">
              Add Payment To Student.
            </h1>
          </div>
          <AddPayementForm id={student?._id} />
        </div>
        <div className="flex-grow pl-4 max-w-50">
          <div className="pt-10 pb-10">
            <h1 className="text-3xl font-bold text-white">
              Add Payment To Student.
            </h1>
          </div>
          <AddAttendanceForm id={student?._id} />
        </div>
      </div>
      {/* <div className="p-5">
        <MarkAttendanceButton id={student?._id} />
      </div> */}
      <div className="pt-20 flex md:flex-row flex-col w-[73vw]">
        <div>
          <StudentPaymentInfo studentId={student?._id} />
        </div>
        <div>
          <StudentTeacherInfo studentId={student?._id} />
        </div>
        <div>
          <StudentAttendanceInfo studentId={id} />
        </div>
      </div>
    </div>
  );
};

export default StudentInfo;
