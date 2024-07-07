'use client'
import { useState } from 'react';

interface Grade {
    name: string;
    currentGrades: string;
}

function GradesPage() {
    const [grades, setGrades] = useState<Grade[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchGrades = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/grades');
            const data: Grade[] = await response.json();

            if (!Array.isArray(data)) {
                throw new Error('API response is not an array');
            }

            setGrades(data);
        } catch (error) {
            console.error('Error fetching grades:', error);
            setError('Failed to fetch grades');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Grades</h1>
            <button onClick={fetchGrades} disabled={loading}>
                {loading ? 'Fetching grades...' : 'Fetch Grades'}
            </button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <ul>
                {grades.map((grade, index) => (
                    <li key={index}>
                        {grade.name}: {grade.currentGrades}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default GradesPage;
