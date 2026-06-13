"use client";

import { PastPaper } from "@/types/studyMaterials";
import { ChevronLeft, ExternalLink, Eye, Tag } from "lucide-react";

interface PaperListProps {
  semesterLabel: string;
  papers: PastPaper[];
  onBack: () => void;
  onView: (paper: PastPaper) => void;
}

function groupBySubject(papers: PastPaper[]): Record<string, PastPaper[]> {
  return papers.reduce<Record<string, PastPaper[]>>((acc, paper) => {
    if (!acc[paper.subject_code]) acc[paper.subject_code] = [];
    acc[paper.subject_code].push(paper);
    return acc;
  }, {});
}

export default function PaperList({ semesterLabel, papers, onBack, onView }: PaperListProps) {
  const grouped = groupBySubject(papers);

  return (
    <section>
      {/* Back + page heading — stacked, not inline */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="mb-3 inline-flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-primary transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          All Semesters
        </button>

        <h1 className="text-2xl font-bold text-slate-900">{semesterLabel}</h1>
        <p className="mt-1 text-sm text-slate-500">
          {papers.length} paper{papers.length !== 1 ? "s" : ""} available
        </p>
      </div>

      {/* Subject groups */}
      <div className="flex flex-col gap-4">
        {Object.entries(grouped).map(([code, subjectPapers]) => {
          const subjectName = subjectPapers[0].subject_name;
          return (
            <div
              key={code}
              className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden"
            >
              {/* Subject header */}
              <div className="flex items-center gap-2.5 border-b border-slate-100 bg-slate-50/80 px-5 py-3.5">
                <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-mono font-semibold text-primary">
                  {code}
                </span>
                <h2 className="text-sm font-semibold text-slate-800">
                  {subjectName}
                </h2>
              </div>

              {/* Paper rows */}
              <ul className="divide-y divide-slate-100">
                {subjectPapers.map((paper) => (
                  <li
                    key={paper.id}
                    className="flex items-center justify-between gap-4 px-5 py-3.5"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-sm text-slate-700">
                        {paper.exam_year} Board Exam
                      </span>
                      {paper.model_set && (
                        <span className="flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-600">
                          <Tag className="w-3 h-3" />
                          Model Set
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => onView(paper)}
                        className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary/90 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View
                      </button>
                      <a
                        href={paper.drive_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:border-slate-300 hover:text-slate-900 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Drive
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}