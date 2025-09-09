"use client";

import { Button } from "@/components/ui/Button";
import { FormControl } from "@/components/ui/FormControl";
import React from "react";

const ContactPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [status, setStatus] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !message) {
      setStatus("সব ঘর পূরণ করুন।");
      setIsSubmitting(false);
      return;
    }

    // Placeholder submission logic. You can wire this to your backend later.
    await new Promise((r) => setTimeout(r, 800));
    (e.target as HTMLFormElement).reset();
    setStatus("বার্তা সফলভাবে পাঠানো হয়েছে!");
    setIsSubmitting(false);
  };

  return (
    <section className="container mx-auto px-4 py-10 md:py-16">
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2">
        <div className="space-y-6">
          <header className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              যোগাযোগ
            </h1>
            <p className="text-muted-foreground">
              মতামত, পরামর্শ বা তথ্যের জন্য নিচের ফর্মটি পূরণ করুন।
            </p>
          </header>

          <div className="space-y-3">
            <p>
              ইমেইল:{" "}
              <a className="underline" href="mailto:support@binduui.com">
                support@binduui.com
              </a>
            </p>
            <p>সময়: প্রতিদিন সকাল ৯টা — রাত ৯টা</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <FormControl.Label htmlFor="name">নাম</FormControl.Label>
            <FormControl id="name" name="name" placeholder="আপনার নাম" />
          </div>

          <div>
            <FormControl.Label htmlFor="email">ইমেইল</FormControl.Label>
            <FormControl
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <FormControl.Label htmlFor="message">বার্তা</FormControl.Label>
            <FormControl
              as="textarea"
              id="message"
              name="message"
              rows={5}
              placeholder="আপনার বার্তা লিখুন"
            />
          </div>

          {status && <div className="text-foreground/80 text-sm">{status}</div>}

          <Button
            type="submit"
            disabled={isSubmitting}
            isLoading={isSubmitting}
            className="w-full md:w-auto"
          >
            পাঠান
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ContactPage;
