"use client";

import React from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";
import { SkeletonDemo } from "./LoadingSkelton";

const Card = () => {
  const { data: students, isLoading: studentsLoading } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const { data } = await api.get("/students/");
      return data;
    },
  });

  const { data: teachers, isLoading: teacherLoading } = useQuery({
    queryKey: ["teachers"],
    queryFn: async () => {
      const { data } = await api.get("/teacher/");
      return data;
    },
  });

  if (studentsLoading) {
    return (
      <div className="flex items-center justify-center gap-10 p-10">
        <SkeletonDemo />
        <SkeletonDemo />
        <SkeletonDemo />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 p-12 text-white w-full justify-center h-screen md:h-full">
      <div className="flex-grow bg-[#1F1F22] p-10 rounded-lg">
        <div className="flex flex-row gap-10 items-center">
          <Image
            src="/assests/student.svg"
            alt="students"
            width={40}
            height={40}
          />
          <div className="flex flex-col gap-3">
            <h5 className="text-gray-400 text-sm">عدد الطلاب</h5>
            <p className="font-semibold">{students?.totalStudents}</p>
          </div>
        </div>
      </div>
      <div className="flex-grow bg-[#1F1F22] p-10 rounded-lg">
        <div className="flex flex-row gap-10 items-center">
          <Image
            src="/assests/student.svg"
            alt="students"
            width={40}
            height={40}
          />
          <div className="flex flex-col gap-3">
            <h5 className="text-gray-400 text-sm">عدد المدرسين</h5>
            <p className="font-semibold">{teachers?.totalTeachers}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
