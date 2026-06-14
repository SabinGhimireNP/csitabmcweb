// app/(study-material)/past-papers/page.tsx

import { generatePageMetadata, buildOgImageUrl, siteConfig } from "@/lib/seo";
import { SEMESTERS } from "./_components/data"; // Import the semesters array
import PastPapersClient from "./_components/Pastpapersclient"; // Import the client component

export const metadata = generatePageMetadata({
  title: `Past Year Papers - ${siteConfig.name}`,
  description:
    "Access CSIT past year board exam papers and model sets for all 8 semesters. Free study resources for BSc.CSIT students at Butwal Multiple Campus.",
  canonical: `${siteConfig.url}/study-material/past-papers`,
  ogImage: buildOgImageUrl({
    title: "Past Year Papers",
    subtitle: "Board Exams & Model Sets",
    type: "page",
  }),
  keywords: [
    "CSIT Past Papers",
    "BSc CSIT Exam Papers",
    "CSIT Model Set",
    "TU CSIT Question Papers",
    "CSIT Semester Papers",
    "Butwal Multiple Campus CSIT",
    "CSIT Association BMC",
    "CSIT Board Exam",
  ],
});

export default function PastPapersPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-4 py-10">
        <PastPapersClient semesters={SEMESTERS} />
      </div>
    </main>
  );
}