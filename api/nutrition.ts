export default {
  async fetch(request: Request) {
    const apiKey = process.env.CALORIENINJAS_API_KEY;

    if (!apiKey) {
      return Response.json({ error: 'API key not configured' }, { status: 500 });
    }

    const url = new URL(request.url);
    const query = url.searchParams.get('query');

    if (!query) {
      return Response.json({ error: 'query parameter is required' }, { status: 400 });
    }

    const res = await fetch(
      `https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`,
      { headers: { 'X-Api-Key': apiKey } },
    );

    const data = await res.json();
    return Response.json(data, { status: res.status });
  },
};
