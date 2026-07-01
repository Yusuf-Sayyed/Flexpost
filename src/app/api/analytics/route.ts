import { NextResponse } from 'next/server';

// Unique namespace for your project
const NAMESPACE = 'flexpost_analytics_v1';
const KEY = 'site_clicks';

export async function GET() {
  try {
    // 4-second timeout to prevent hanging if the free API is slow
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    
    const res = await fetch(`https://api.counterapi.dev/v1/${NAMESPACE}/${KEY}`, {
      signal: controller.signal,
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
      }
    });
    
    clearTimeout(timeoutId);
    
    if (res.ok) {
      const data = await res.json();
      return NextResponse.json({ clicks: data.count || 0 });
    }
  } catch (error) {
    console.error('Counter API GET error:', error);
  }
  
  // Fallback to 0 if the API is down
  return NextResponse.json({ clicks: 0 }); 
}

export async function POST() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    
    const res = await fetch(`https://api.counterapi.dev/v1/${NAMESPACE}/${KEY}/up`, {
      signal: controller.signal,
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
      }
    });
    
    clearTimeout(timeoutId);
    
    if (res.ok) {
      const data = await res.json();
      return NextResponse.json({ clicks: data.count || 0 });
    }
  } catch (error) {
    console.error('Counter API POST error:', error);
  }
  
  // Return a graceful success even if it fails, so the UI doesn't break
  return NextResponse.json({ clicks: 0, warning: 'Failed to increment on remote' });
}
