export interface PastPaper {
  id: number;
  subject_code: string;
  subject_name: string;
  semester: number;
  model_set: boolean;
  exam_year: number;
  drive_link: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface Semester {
  number: number;
  label: string;
  paper_count: number;
}