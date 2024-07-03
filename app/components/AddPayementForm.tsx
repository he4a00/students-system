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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { PaymentValidation } from "../lib/validations/payment";
import { months } from "@/constants";

// 2. Define a submit handler.

interface Props {
  id: string;
}

const AddPaymentForm = ({ id }: Props) => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(PaymentValidation),
    defaultValues: {
      month: "",
      year: "",
      isPaid: "",
    },
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: addTeacher, isLoading } = useMutation({
    mutationFn: async (teacherData: any) => {
      try {
        const { data } = await api.post(`/payment/${id}`, teacherData);
        return data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      toast({
        title: "Payment Added Succesfully!",
        description: "You Added this month payment this Student!",
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
  function onSubmit(values: z.infer<typeof PaymentValidation>) {
    addTeacher({
      month: values.month,
      year: values.year,
      isPaid: values.isPaid,
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
          name="month"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-semibold text-white">الشهر</FormLabel>
              <FormControl>
                <select
                  className="border border-[#1F1F22] bg-[#121417] text-white p-2 pr-8 !important focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 !important"
                  {...field}
                >
                  <option value="" disabled>
                    اختر الشهر
                  </option>
                  {months.map((month, index) => (
                    <option key={index} value={month.name}>
                      {month.name}
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
          name="year"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-semibold text-white">السنة</FormLabel>
              <FormControl>
                <select
                  className="border border-[#1F1F22] bg-[#121417] text-white p-2 pr-8 !important focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 !important"
                  {...field}
                >
                  <option value="" disabled>
                    اختر السنة
                  </option>
                  <option value="2024">2024</option>
                </select>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isPaid"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-semibold text-white">
                حالة الدفع
              </FormLabel>
              <FormControl>
                <select
                  className="border border-[#1F1F22] bg-[#121417] text-white p-2 pr-8 !important focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 !important"
                  {...field}
                >
                  <option value="" disabled>
                    اختر حالة الدفع
                  </option>
                  <option value="true">مدفوع</option>
                  <option value="false">غير مدفوع</option>
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

export default AddPaymentForm;
