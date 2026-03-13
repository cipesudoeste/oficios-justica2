"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function PdfUpload({ onParsed }: { onParsed: (data: Record<string, string>) => void }) {
  const [loading, setLoading] = useState(false);

  return (
    <div className="rounded-lg border bg-white p-4">
      <p className="mb-3 text-sm font-medium">Importar PDF de intimação/solicitação</p>
      <input
        type="file"
        accept="application/pdf"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          setLoading(true);
          const fd = new FormData();
          fd.append("pdf", file);
          const res = await fetch("/api/upload-pdf", { method: "POST", body: fd });
          setLoading(false);
          if (!res.ok) return;
          const data = await res.json();
          onParsed(data.fields);
        }}
      />
      {loading ? <p className="mt-2 text-xs">Processando PDF...</p> : null}
      <Button type="button" variant="outline" className="mt-3">Extração inicial por regex (fase 1)</Button>
    </div>
  );
}
