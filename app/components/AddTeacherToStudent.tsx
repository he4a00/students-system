"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import api from "../lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { educationYears } from "@/constants";
import { TeacherToStudentValidation } from "../lib/validations/teacher";

type Props = {
  id: string;
};

interface TeacherProps {
  _id: string;
  name: string;
  gender: string;
  subject: string;
  schedule: [
    {
      _id: string;
      day: string;
      startTime: string;
      endTime: string;
    }
  ];
}

// 2. Define a submit handler.

const AddTeacherToStudent = ({ id }: Props) => {
  const form = useForm({
    resolver: zodResolver(TeacherToStudentValidation),
    defaultValues: {
      name: "",
    },
  });

  // getting all teacher

  const { data: teachers, isLoading: teachersLoading } = useQuery({
    queryKey: ["teachers"],
    queryFn: async () => {
      const { data } = await api.get("/teacher");
      return data;
    },
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: addTeacherToStudent, isLoading } = useMutation({
    mutationFn: async (formData: any) => {
      try {
        const { data } = await api.post(
          `/teacher/${id}/add-teacher-student`,
          formData
        );
        return data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      toast({
        title: "Added Student Succesfully!",
        description: "You Added this student to the list!",
      });
    },
    onError: (error: any) => {
      if (error.response.status === 409) {
        toast({
          title: "this user already exists",
          variant: "destructive",
        });
      }
      if (error.response.status === 401) {
        toast({
          title: "You are not authorized to perform this action.",
          variant: "destructive",
        });
      }
    },
  });
  function onSubmit(values: z.infer<typeof TeacherToStudentValidation>) {
    addTeacherToStudent({
      name: values.name,
    });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10 w-full bg-[#101012] p-12 rounded-lg"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-semibold text-white">
                اسم المدرس{" "}
              </FormLabel>
              <FormControl>
                <select
                  className="border border-[#1F1F22] bg-[#121417] text-white p-2 pr-8 !important focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 !important"
                  {...field}
                >
                  <option value="" disabled>
                    اختر المدرس
                  </option>
                  {teachers?.teachers?.map((teacher: TeacherProps) => (
                    <option key={teacher.name} value={teacher.name}>
                      {teacher.name}
                    </option>
                  ))}
                </select>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant="secondary" disabled={isLoading} type="submit">
          اضافة
        </Button>
      </form>
    </Form>
  );
};

export default AddTeacherToStudent;
