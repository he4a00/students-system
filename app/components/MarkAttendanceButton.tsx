"use client";

import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import api from "../lib/api";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const MarkAttendanceButton = ({ id }: { id: string }) => {
  const { toast } = useToast();
  const router = useRouter();
  const { mutate: markAttendeance, isLoading } = useMutation({
    mutationFn: async () => {
      const { data } = await api.post(`/attendence/${id}`);
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
  return (
    <Button
      onClick={() => markAttendeance()}
      disabled={isLoading}
      variant="secondary"
    >
      Mark Attendance
    </Button>
  );
};

export default MarkAttendanceButton;
