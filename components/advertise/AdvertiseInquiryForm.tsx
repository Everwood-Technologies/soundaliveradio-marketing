"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";

type AdvertiseFormData = {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  campaignDetails: string;
  budgetRange: string;
};

type SubmitResult = {
  type: "success" | "error";
  message: string;
};

const INITIAL_FORM_DATA: AdvertiseFormData = {
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  website: "",
  campaignDetails: "",
  budgetRange: "",
};

const INPUT_CLASS_NAME =
  "w-full rounded-xl border border-border bg-white/5 px-4 py-2.5 text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent";

export function AdvertiseInquiryForm() {
  const [formData, setFormData] = useState<AdvertiseFormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<SubmitResult | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await fetch("/api/advertise-submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseBody = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;

      if (!response.ok) {
        setSubmitResult({
          type: "error",
          message:
            responseBody?.error ??
            "There was a problem sending your inquiry. Please try again.",
        });
        return;
      }

      setSubmitResult({
        type: "success",
        message:
          "Inquiry sent. Our team will follow up by email to discuss advertising options.",
      });
      setFormData(INITIAL_FORM_DATA);
    } catch {
      setSubmitResult({
        type: "error",
        message: "Network error while sending your inquiry. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-surface p-6 md:p-8"
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="companyName" className="mb-2 block text-sm font-medium text-headline">
            Company Name
          </label>
          <input
            id="companyName"
            name="companyName"
            type="text"
            autoComplete="organization"
            required
            value={formData.companyName}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                companyName: event.target.value,
              }))
            }
            className={INPUT_CLASS_NAME}
            placeholder="Your company"
          />
        </div>

        <div>
          <label htmlFor="contactName" className="mb-2 block text-sm font-medium text-headline">
            Contact Name
          </label>
          <input
            id="contactName"
            name="contactName"
            type="text"
            autoComplete="name"
            required
            value={formData.contactName}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                contactName: event.target.value,
              }))
            }
            className={INPUT_CLASS_NAME}
            placeholder="Your full name"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-headline">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                email: event.target.value,
              }))
            }
            className={INPUT_CLASS_NAME}
            placeholder="you@company.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-headline">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={formData.phone}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                phone: event.target.value,
              }))
            }
            className={INPUT_CLASS_NAME}
            placeholder="+1 (555) 000-0000"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="website" className="mb-2 block text-sm font-medium text-headline">
            Company Website
          </label>
          <input
            id="website"
            name="website"
            type="url"
            value={formData.website}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                website: event.target.value,
              }))
            }
            className={INPUT_CLASS_NAME}
            placeholder="https://yourcompany.com"
          />
        </div>
      </div>

      <div className="mt-5">
        <label
          htmlFor="campaignDetails"
          className="mb-2 block text-sm font-medium text-headline"
        >
          Campaign Details
        </label>
        <textarea
          id="campaignDetails"
          name="campaignDetails"
          rows={5}
          required
          value={formData.campaignDetails}
          onChange={(event) =>
            setFormData((prev) => ({
              ...prev,
              campaignDetails: event.target.value,
            }))
          }
          className={INPUT_CLASS_NAME}
          placeholder="Tell us what you would like to promote, target audience, and campaign goals."
        />
      </div>

      <div className="mt-5">
        <label htmlFor="budgetRange" className="mb-2 block text-sm font-medium text-headline">
          Budget Range
        </label>
        <input
          id="budgetRange"
          name="budgetRange"
          type="text"
          value={formData.budgetRange}
          onChange={(event) =>
            setFormData((prev) => ({
              ...prev,
              budgetRange: event.target.value,
            }))
          }
          className={INPUT_CLASS_NAME}
          placeholder="Optional (example: $1,000-$5,000)"
        />
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send advertising inquiry"}
        </Button>
        <p className="text-xs text-muted">
          Inquiries are emailed directly to submissions@soundaliveradio.net.
        </p>
      </div>

      <p
        className={`mt-4 text-sm ${
          submitResult?.type === "error" ? "text-red-300" : "text-green-300"
        }`}
        aria-live="polite"
      >
        {submitResult?.message ?? ""}
      </p>
    </form>
  );
}
