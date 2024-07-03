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
import { useFieldArray, useForm } from "react-hook-form";
import api from "../lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { TeacherValidation } from "../lib/validations/teacher";
import { teachers } from "@/constants";

const AddTeacherForm = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(TeacherValidation),
    defaultValues: {
      name: "",
      subject: "",
      gender: "",
      schedule: [{ day: "", startTime: "", endTime: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "schedule",
  });

  const { toast } = useToast();

  const { mutate: addTeacher, isLoading } = useMutation({
    mutationFn: async (teacherData: any) => {
      try {
        const { data } = await api.post(`/teacher/add-teacher`, teacherData);
        return data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      router.push("/");
      toast({
        title: "تم اضافة المدرس بنجاح",
      });
    },
    onError: (error: any) => {
      if (error.response.status === 401) {
        toast({
          title: "غير مسموح لك بفعل هذا الحدث",
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
      schedule: values.schedule,
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
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-white">المادة</FormLabel>
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
        <div className="flex flex-col gap-4">
          <FormLabel className="font-semibold text-white">الجدول</FormLabel>
          {fields.map((item, index) => (
            <div key={item.id} className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name={`schedule.${index}.day`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-white">
                      Day
                    </FormLabel>
                    <FormControl>
                      <select
                        className="border border-[#1F1F22] bg-[#121417] text-white p-2 pr-8 !important focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 !important"
                        {...field}
                      >
                        <option value="" disabled>
                          Select day
                        </option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`schedule.${index}.startTime`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-white">
                      Start Time
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="time"
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
                name={`schedule.${index}.endTime`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-white">
                      End Time
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        className="border border-[#1F1F22] bg-[#121417] text-white  !important focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 !important"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button variant="destructive" onClick={() => remove(index)}>
                Remove Schedule
              </Button>
            </div>
          ))}
          <Button
            variant="secondary"
            onClick={() => append({ day: "", startTime: "", endTime: "" })}
          >
            Add Schedule
          </Button>
        </div>
        <Button variant="secondary" disabled={isLoading} type="submit">
          اضافة
        </Button>
      </form>
    </Form>
  );
};

export default AddTeacherForm;
