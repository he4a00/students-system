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
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import api from "../lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { TeacherValidation } from "../lib/validations/teacher";
import { teachers } from "@/constants";

// 2. Define a submit handler.

interface Props {
  id: string;
}

const AddTeacherForm = ({ id }: Props) => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(TeacherValidation),
    defaultValues: {
      name: "",
      subject: "",
      gender: "",
    },
  });

  const { toast } = useToast();

  const { mutate: addTeacher, isLoading } = useMutation({
    mutationFn: async (teacherData: any) => {
      try {
        const { data } = await api.post(
          `/teacher/${id}/add-teacher`,
          teacherData
        );
        return data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      router.push("/");
      toast({
        title: "Added Teacher Succesfully!",
        description: "You Added this Teacher to this Student!",
      });
    },
    onError: (error: any) => {
      if (error.response.status === 401) {
        toast({
          title: "You are not authorized to perform this action.",
          variant: "destructive",
        });
      }
    },
  });

  function onSubmit(values: z.infer<typeof TeacherValidation>) {
    addTeacher({
      name: values.name,
      subject: values.subject,
      gender: values.gender,
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
              <FormLabel className="font-semibold text-white">Name</FormLabel>
              <FormControl>
                <select
                  className="border border-[#1F1F22] bg-[#121417] text-white p-2 pr-8 !important focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 !important"
                  {...field}
                >
                  <option value="" disabled>
                    Select a Teacher
                  </option>
                  {teachers?.map((teacher) => (
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
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-white">
                Subject
              </FormLabel>
              <FormControl>
                <Input
                  className="border border-[#1F1F22] bg-[#121417] text-white  !important focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 !important"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-semibold text-white">Gender</FormLabel>
              <FormControl>
                <select
                  className="border border-[#1F1F22] bg-[#121417] text-white p-2 pr-8 !important focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 !important"
                  {...field}
                >
                  <option value="" disabled>
                    Select gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="secondary" disabled={isLoading} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AddTeacherForm;
