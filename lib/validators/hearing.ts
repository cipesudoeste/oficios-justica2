import { HearingModality, HearingStatus } from "@prisma/client";
import { z } from "zod";

export const hearingSchema = z.object({
  processNumber: z.string().min(5),
  seiProcessNumber: z.string().optional(),
  officerName: z.string().min(3),
  officerRegistration: z.string().min(3),
  officerRank: z.string().min(2),
  unit: z.string().min(2),
  district: z.string().min(2),
  court: z.string().min(2),
  hearingType: z.string().min(2),
  hearingDate: z.string().min(8),
  hearingTime: z.string().min(4),
  modality: z.nativeEnum(HearingModality),
  location: z.string().optional(),
  meetingLink: z.string().url().optional().or(z.literal("")),
  notes: z.string().optional(),
  internalDeadline: z.string().optional(),
  status: z.nativeEnum(HearingStatus)
});

export type HearingInput = z.infer<typeof hearingSchema>;
