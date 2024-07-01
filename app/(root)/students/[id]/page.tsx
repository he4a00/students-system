"use client";

import EditStudentForm from "@/app/components/EditStudentForm";
import api from "@/app/lib/api";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

const EditStudent = () => {
  const pathname = usePathname();
  const parts = pathname.split("/");
  const id = parts[parts.length - 1];

  const { data: student, isLoading } = useQuery(["student", id], async () => {
    const { data } = await api.get(`/students/${id}`);
    return data;
  });

  return (
    <div className="flex mx-auto flex-col items-start justify-start max-w-3xl px-10 py-20 ">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="pt-10 pb-10">
            <h1 className="text-3xl font-bold text-white">Edit Student.</h1>
          </div>
          <EditStudentForm
            gender={student?.gender}
            name={student?.name}
            phoneNumber={student?.phoneNumber}
            eduyear={student?.eduyear}
            studentId={student?._id}
          />
        </>
      )}
    </div>
  );
};

export default EditStudent;
