"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";

type SubmissionFormData = {
  artistName: string;
  email: string;
  instagramLink: string;
  xLink: string;
  facebookLink: string;
  spotifyLink: string;
  soundcloudLink: string;
  youtubeLink: string;
  additionalMusicLinks: string;
};

type SubmitResult = {
  type: "success" | "error";
  message: string;
};

const INITIAL_FORM_DATA: SubmissionFormData = {
  artistName: "",
  email: "",
  instagramLink: "",
  xLink: "",
  facebookLink: "",
  spotifyLink: "",
  soundcloudLink: "",
  youtubeLink: "",
  additionalMusicLinks: "",
};

const INPUT_CLASS_NAME =
  "w-full rounded-xl border border-border bg-white/5 px-4 py-2.5 text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent";

export function SubmitMusicForm() {
  const [formData, setFormData] = useState<SubmissionFormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<SubmitResult | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await fetch("/api/submissions", {
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
            "There was a problem sending your submission. Please try again.",
        });
        return;
      }

      setSubmitResult({
        type: "success",
        message: "Submission received. We will review your music and follow up by email.",
      });
      setFormData(INITIAL_FORM_DATA);
    } catch {
      setSubmitResult({
        type: "error",
        message: "Network error while sending your submission. Please try again.",
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
          <label htmlFor="artistName" className="mb-2 block text-sm font-medium text-headline">
            Artist Name
          </label>
          <input
            id="artistName"
            name="artistName"
            type="text"
            autoComplete="name"
            required
            value={formData.artistName}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                artistName: event.target.value,
              }))
            }
            className={INPUT_CLASS_NAME}
            placeholder="Your artist or band name"
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
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
        <div>
          <label
            htmlFor="instagramLink"
            className="mb-2 block text-sm font-medium text-headline"
          >
            Instagram
          </label>
          <input
            id="instagramLink"
            name="instagramLink"
            type="url"
            value={formData.instagramLink}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                instagramLink: event.target.value,
              }))
            }
            className={INPUT_CLASS_NAME}
            placeholder="https://instagram.com/..."
          />
        </div>

        <div>
          <label htmlFor="xLink" className="mb-2 block text-sm font-medium text-headline">
            X
          </label>
          <input
            id="xLink"
            name="xLink"
            type="url"
            value={formData.xLink}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                xLink: event.target.value,
              }))
            }
            className={INPUT_CLASS_NAME}
            placeholder="https://x.com/..."
          />
        </div>

        <div>
          <label htmlFor="facebookLink" className="mb-2 block text-sm font-medium text-headline">
            Facebook
          </label>
          <input
            id="facebookLink"
            name="facebookLink"
            type="url"
            value={formData.facebookLink}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                facebookLink: event.target.value,
              }))
            }
            className={INPUT_CLASS_NAME}
            placeholder="https://facebook.com/..."
          />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="spotifyLink" className="mb-2 block text-sm font-medium text-headline">
            Spotify Link
          </label>
          <input
            id="spotifyLink"
            name="spotifyLink"
            type="url"
            value={formData.spotifyLink}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                spotifyLink: event.target.value,
              }))
            }
            className={INPUT_CLASS_NAME}
            placeholder="https://open.spotify.com/..."
          />
        </div>

        <div>
          <label
            htmlFor="soundcloudLink"
            className="mb-2 block text-sm font-medium text-headline"
          >
            SoundCloud Link
          </label>
          <input
            id="soundcloudLink"
            name="soundcloudLink"
            type="url"
            value={formData.soundcloudLink}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                soundcloudLink: event.target.value,
              }))
            }
            className={INPUT_CLASS_NAME}
            placeholder="https://soundcloud.com/..."
          />
        </div>

        <div>
          <label htmlFor="youtubeLink" className="mb-2 block text-sm font-medium text-headline">
            YouTube Link
          </label>
          <input
            id="youtubeLink"
            name="youtubeLink"
            type="url"
            value={formData.youtubeLink}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                youtubeLink: event.target.value,
              }))
            }
            className={INPUT_CLASS_NAME}
            placeholder="https://youtube.com/..."
          />
        </div>

        <div>
          <label
            htmlFor="additionalMusicLinks"
            className="mb-2 block text-sm font-medium text-headline"
          >
            Additional Music Links
          </label>
          <textarea
            id="additionalMusicLinks"
            name="additionalMusicLinks"
            rows={3}
            value={formData.additionalMusicLinks}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                additionalMusicLinks: event.target.value,
              }))
            }
            className={INPUT_CLASS_NAME}
            placeholder="Apple Music, Bandcamp, Audiomack, etc."
          />
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">Please include at least one music link.</p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send submission"}
        </Button>
        <p className="text-xs text-muted">
          Submissions are emailed directly to submissions@soundaliveradio.net.
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
