import { z } from "zod";

export const ScheduleValidation = z.object({
  day: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});

export const TeacherValidation = z.object({
  name: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(30, { message: "Maximum 30 caracters." }),
  subject: z.string().nonempty(),
  gender: z.string(),
  schedule: z
    .array(ScheduleValidation)
    .min(1, { message: "Schedule must have at least one entry" }),
});

export const TeacherToStudentValidation = z.object({
  name: z.string().nonempty(),
});
