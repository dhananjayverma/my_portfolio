import { NextResponse } from 'next/server';
import { fetchGitHubAnalytics } from '@/lib/github';

export const revalidate = 3600;

export async function GET() {
  try {
    const data = await fetchGitHubAnalytics();
    return NextResponse.json(data);
  } catch (error) {
    console.error('GitHub analytics fetch failed:', error);
    return NextResponse.json(
      { error: 'Failed to load GitHub analytics' },
      { status: 500 }
    );
  }
}
