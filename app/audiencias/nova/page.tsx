"use client";

import { useState } from "react";
import { LayoutShell } from "@/components/layout-shell";
import { HearingForm } from "@/components/hearing-form";
import { PdfUpload } from "@/components/pdf-upload";

export default function NewHearingPage() {
  const [prefill, setPrefill] = useState<Record<string, string>>({});

  return (
    <LayoutShell>
      <h1 className="mb-4 text-2xl font-semibold">Nova audiência</h1>
      <PdfUpload onParsed={setPrefill} />
      <div className="mt-4 rounded-lg border bg-white p-4">
        <HearingForm prefill={prefill} />
      </div>
    </LayoutShell>
  );
}
