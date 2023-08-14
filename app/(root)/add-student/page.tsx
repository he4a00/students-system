import AddStudentForm from "@/app/components/AddStudentForm";

const page = () => {
  return (
    <div className="p-10 h-screen">
      <h1 className="text-white text-2xl font-semibold">Add Student</h1>
      <div>
        <AddStudentForm />
      </div>
    </div>
  );
};

export default page;
