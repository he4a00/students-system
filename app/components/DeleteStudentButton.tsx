import { Button } from "@/components/ui/button";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import React from "react";

import Swal from "sweetalert2";
import api from "../lib/api";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface Props {
  studentId: string;
  currentPage: number;
}

const DeleteStudentButton = ({ studentId, currentPage }: Props) => {
  const { toast } = useToast();
  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutate: deleteStudent, isLoading } = useMutation({
    mutationFn: async () => {
      const { data } = await api.delete(`/students/${studentId}`);
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Deleted Successfully",
        description: "You Deleted this student from the list.",
      });
      queryClient.invalidateQueries(["students", currentPage]);
    },
  });
  const handleDeleteStudent = (studentId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteStudent();
      }
    });
  };
  return (
    <Button
      disabled={isLoading}
      variant="destructive"
      onClick={() => handleDeleteStudent(studentId)}
    >
      Delete
    </Button>
  );
};

export default DeleteStudentButton;
