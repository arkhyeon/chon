'use client';

const Header = () => {
  const getGoogleAnalytics = async () => {
    const getAuthToken = await fetch(
      'https://accounts.google.com/o/oauth2/token',
      {
        method: 'POST',
        body: JSON.stringify({
          client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
          client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
          refresh_token: process.env.NEXT_PUBLIC_REFRESH_TOKEN,
          grant_type: 'refresh_token',
        }),
      },
    );

    const oauthJson = await getAuthToken.json();

    const getAnalyticsData = await fetch(
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
    );

    return await getAnalyticsData.json();
  };
  // console.log(getGoogleAnalytics());

  return (
    <header className="flex items-center justify-between bg-green-700 p-4 shadow-md">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <div>
        <button className="rounded bg-green-500 px-4 py-2 text-white">
          Log out
        </button>
      </div>
    </header>
  );
};

export default Header;
