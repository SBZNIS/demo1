import { NextResponse } from 'next/server';
import getGrades from '../../../lib/getGrades';

export async function GET() {
    try {
        const grades = await getGrades();
        return NextResponse.json(grades);
    } catch (error) {
        console.error('Error fetching grades:', error);
        return NextResponse.json({ error: 'Failed to get grades' }, { status: 500 });
    }
}
