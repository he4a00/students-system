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

// interface Student {
//   student: {
//     name: string;
//     phoneNumber: string;
//     gender: string;
//   };
// }

// 2. Define a submit handler.

const AddStudentForm = ({ student }: any) => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(StudentValidation),
    defaultValues: {
      name: "",
      phoneNumber: "",
      gender: "",
    },
  });

  const { mutate: addStudent, isLoading } = useMutation({
    mutationFn: async (formData: any) => {
      try {
        const { data } = await api.post("/students", formData);
        return data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      router.push("/");
    },
  });
  function onSubmit(values: z.infer<typeof StudentValidation>) {
    addStudent({
      name: values.name,
      phoneNumber: values.phoneNumber,
      gender: values.gender,
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
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
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default AddStudentForm;
