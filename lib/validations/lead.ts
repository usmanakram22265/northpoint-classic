import { z } from "zod";
import { shared } from "@/content/shared";

const e = shared.form.errors;
const digits = (s: string) => s.replace(/\D/g, "");

export const leadSchema = z.object({
  name: z.string().trim().min(1, e.name).max(80, e.tooLong),
  email: z.string().trim().max(120, e.tooLong).regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, e.email),
  phone: z
    .string()
    .trim()
    .refine((v) => {
      const d = digits(v);
      return d.length === 10 || (d.length === 11 && d.startsWith("1"));
    }, e.phone),
  issue: z.string().trim().min(3, e.issue).max(1000, e.tooLong),
  smsConsent: z.boolean(),
});

export type Lead = z.infer<typeof leadSchema>;
export type LeadField = "name" | "email" | "phone" | "issue";

export type LeadState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      fieldErrors: Partial<Record<LeadField, string>>;
      formError?: string;
      values: Record<string, string>;
    };
