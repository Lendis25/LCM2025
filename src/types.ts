export interface Student {
  rut: string;
  name: string;
  course: string;
}

export interface Subject {
  name: 'Lenguaje y Comunicación' | 'Matemática' | 'Ciencias Naturales' | 'Historia';
  score: number;
}

export interface CourseData {
  year: number;
  course: string;
  subjects: Subject[];
}

export interface StudentData {
  student: Student;
  year: number;
  subjects: Subject[];
}