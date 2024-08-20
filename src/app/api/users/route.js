import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { fetch } from 'next/dist/compiled/@edge-runtime/primitives';

const prisma = new PrismaClient();

export async function GET(req) {
  const oauth = await fetch('https://accounts.google.com/o/oauth2/token', {
    method: 'POST',
    body: JSON.stringify({
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      refresh_token: process.env.NEXT_PUBLIC_REFRESH_TOKEN,
      grant_type: 'refresh_token',
    }),
  });

  const oauthJson = await oauth.json();
  console.log('oauthJson');
  console.log(oauthJson);

  const res = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${process.env.NEXT_PUBLIC_PROPERTY_ID}:runReport`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${oauthJson.access_token}`,
      },
      body: JSON.stringify({
        dimensions: [{ name: 'date' }],
        metrics: [
          { name: 'activeUsers' },
          { name: 'screenPageViews' },
          { name: 'sessions' },
        ],
        dateRanges: [{ startDate: '2024-01-01', endDate: '2024-12-01' }],
        keepEmptyRows: true,
      }),
    },
    // 이전에 전달받은 'access_token'을 headers에 담는다(인증).
  );

  const resJson = await res.json();
  console.log(resJson);
  return NextResponse.json(resJson, { status: 200 });
}
