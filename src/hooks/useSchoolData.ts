import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useSchoolData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch general statistics
        const { data: gradesData, error: gradesError } = await supabase
          .from('grades')
          .select(`
            *,
            students (
              name,
              course
            )
          `);

        if (gradesError) throw gradesError;

        // Process data for charts and statistics
        const processedData = processGradesData(gradesData);
        setData(processedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

const processGradesData = (grades: any[]) => {
  // Group by year and calculate averages
  const yearlyData = grades.reduce((acc, grade) => {
    const year = grade.year;
    if (!acc[year]) {
      acc[year] = {
        scores: [],
        total: 0,
        count: 0
      };
    }
    acc[year].scores.push(grade.score);
    acc[year].total += grade.score;
    acc[year].count += 1;
    return acc;
  }, {});

  // Calculate yearly averages and approval rates
  return Object.entries(yearlyData).map(([year, data]: [string, any]) => ({
    year: parseInt(year),
    promedio: Number((data.total / data.count).toFixed(1)),
    aprobacion: Number(((data.scores.filter((score: number) => score >= 4.0).length / data.scores.length) * 100).toFixed(1))
  }));
};