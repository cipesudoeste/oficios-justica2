import Link from "next/link";
import { Scale } from "lucide-react";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 font-semibold"><Scale className="h-5 w-5 text-blue-600" /> Gestão de Audiências</div>
          <nav className="flex gap-4 text-sm">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/audiencias">Audiências</Link>
            <Link href="/audiencias/nova">Nova audiência</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl p-6">{children}</main>
    </div>
  );
}
