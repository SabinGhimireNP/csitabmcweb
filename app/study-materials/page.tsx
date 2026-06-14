// app/(study-material)/past-papers/page.tsx

import type { Metadata } from "next";
import { SEMESTERS } from "./_components/data";
import PastPapersClient from "./_components/Pastpapersclient";

export const metadata: Metadata = {
  title: "Past Year Papers | CSIT Study Materials – ABMC",
  description:
    "Download and view CSIT past year exam papers and model sets for all 8 semesters. Free study resources for BSc.CSIT students at ABMC College.",
  keywords: [
    "CSIT past papers",
    "BSc CSIT exam papers",
    "CSIT model set",
    "CSIT semester papers",
    "ABMC CSIT",
    "TU CSIT past questions",
  ],
  openGraph: {
    title: "Past Year Papers | CSIT Study Materials",
    description:
      "Browse past exam papers and model sets for all 8 semesters of BSc.CSIT at ABMC College.",
    type: "website",
  },
};

export default function PastPapersPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-1 sm:px-6 py-10">
        <PastPapersClient semesters={SEMESTERS} />
      </div>
    </main>
  );
}