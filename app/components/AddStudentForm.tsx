"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { StudentValidation } from "../lib/validations/student";
import api from "../lib/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { educationYears } from "@/constants";

// 2. Define a submit handler.

const AddStudentForm = ({ student }: any) => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(StudentValidation),
    defaultValues: {
      name: "",
      phoneNumber: "",
      gender: "",
      eduyear: "",
    },
  });

  const { toast } = useToast();

  const { mutate: addStudent, isLoading } = useMutation({
    mutationFn: async (formData: any) => {
      try {
        const { data } = await api.post("/students", formData);
        return data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data) => {
      router.push(`/students/info/${data._id}`);
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
  function onSubmit(values: z.infer<typeof StudentValidation>) {
    addStudent({
      name: values.name,
      phoneNumber: values.phoneNumber,
      gender: values.gender,
      eduyear: values.eduyear,
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
            <FormItem>
              <FormLabel className="font-semibold text-white">الأسم</FormLabel>
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
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-white">
                رقم الهاتف
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
          name="eduyear"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-semibold text-white">
                السنة الدراسية
              </FormLabel>
              <FormControl>
                <select
                  className="border border-[#1F1F22] bg-[#121417] text-white p-2 pr-8 !important focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 !important"
                  {...field}
                >
                  <option value="" disabled>
                    اختر السنة الدراسية
                  </option>
                  {educationYears?.map((edu) => (
                    <option key={edu.name} value={edu.name}>
                      {edu.name}
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
          name="gender"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-semibold text-white">النوع</FormLabel>
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

export default AddStudentForm;
