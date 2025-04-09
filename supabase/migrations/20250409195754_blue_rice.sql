/*
  # Create school performance tables

  1. New Tables
    - `students`
      - `id` (uuid, primary key)
      - `rut` (text, unique)
      - `name` (text)
      - `course` (text)
      - `created_at` (timestamp)
    
    - `grades`
      - `id` (uuid, primary key)
      - `student_id` (uuid, foreign key)
      - `subject` (text)
      - `score` (numeric)
      - `year` (integer)
      - `created_at` (timestamp)
    
    - `courses`
      - `id` (uuid, primary key)
      - `name` (text)
      - `year` (integer)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read data
*/

-- Create students table
CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  rut text UNIQUE NOT NULL,
  name text NOT NULL,
  course text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create grades table
CREATE TABLE IF NOT EXISTS grades (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id),
  subject text NOT NULL,
  score numeric NOT NULL CHECK (score >= 1.0 AND score <= 7.0),
  year integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  year integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow read access to students"
  ON students
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow read access to grades"
  ON grades
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow read access to courses"
  ON courses
  FOR SELECT
  TO authenticated
  USING (true);