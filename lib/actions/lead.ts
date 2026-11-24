"use server";

import { shared } from "@/content/shared";
import { leadSchema, type LeadField, type LeadState } from "@/lib/validations/lead";

/**
 * Appointment request handler.
 *
 * INTEGRATION SLOT: form endpoint. When LEAD_WEBHOOK_URL is set in
 * .env.local, each valid request is POSTed there as JSON (CRM, email relay,
 * Zapier and so on). In the demo it is unset, so the request is validated
 * and confirmed but delivered nowhere.
 */
export async function submitLead(_prev: LeadState, formData: FormData): Promise<LeadState> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    issue: String(formData.get("issue") ?? ""),
  };

  // Honeypot: real people never see or fill this field.
  if (String(formData.get("company") ?? "") !== "") return { status: "success" };

  const parsed = leadSchema.safeParse({ ...raw, smsConsent: formData.get("smsConsent") === "yes" });

  if (!parsed.success) {
    const fieldErrors: Partial<Record<LeadField, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as LeadField;
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      status: "error",
      fieldErrors,
      formError: shared.form.errorSummary,
      values: raw,
    };
  }

  const endpoint = process.env.LEAD_WEBHOOK_URL;
  if (endpoint) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, receivedAt: new Date().toISOString() }),
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`Lead endpoint returned ${res.status}`);
    } catch (err) {
      console.error("Lead delivery failed", err);
      return { status: "error", fieldErrors: {}, formError: shared.form.serverError, values: raw };
    }
  }

  return { status: "success" };
}
