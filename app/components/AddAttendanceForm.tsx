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
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { AttendancValidation } from "../lib/validations/attendance";

// 2. Define a submit handler.

interface Props {
  id: string;
}

const AddAttendanceForm = ({ id }: Props) => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(AttendancValidation),
    defaultValues: {
      present: "false",
    },
  });

  const { toast } = useToast();

  const { mutate: markAttendeance, isLoading } = useMutation({
    mutationFn: async (atttendanceData: any) => {
      const { data } = await api.post(`/attendence/${id}`, atttendanceData);
      return data;
    },
    onSuccess: () => {
      router.push("/");
    },
    onError: (error: any) => {
      if (error.response.status === 409) {
        toast({
          title: "the attendance already marked for this user in this date",
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
  function onSubmit(values: z.infer<typeof AttendancValidation>) {
    markAttendeance({
      present: values.present,
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
          name="present"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-semibold text-white">
                Is Paid
              </FormLabel>
              <FormControl>
                <select
                  className="border border-[#1F1F22] bg-[#121417] text-white p-2 pr-8 !important focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 !important"
                  {...field}
                >
                  <option value="" disabled>
                    Select attendance status
                  </option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
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

export default AddAttendanceForm;
