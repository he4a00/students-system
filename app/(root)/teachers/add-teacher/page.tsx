import AddTeacherForm from "@/app/components/AddTeacherForm";
import React from "react";

const page = () => {
  return (
    <div className="flex mx-auto flex-col items-start justify-start max-w-3xl px-10 py-20 ">
      <div className="pt-10 pb-10">
        <h1 className="text-3xl font-bold text-white">اضافة مدرس</h1>
      </div>
      <AddTeacherForm />
    </div>
  );
};

export default page;
