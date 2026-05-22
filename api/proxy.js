export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { path, ...restQuery } = req.query;
  if (!path) return res.status(400).json({ error: 'Missing path' });

  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Missing token' });

  const domainUrl = `https://api.domain.com.au/${path}`;
  const queryString = new URLSearchParams(restQuery).toString();
  const fullUrl = queryString ? `${domainUrl}?${queryString}` : domainUrl;

  console.log('Proxying:', req.method, fullUrl);

  try {
    const response = await fetch(fullUrl, {
      method: req.method,
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      },
      body: req.method === 'POST' ? JSON.stringify(req.body) : undefined
    });

    let data;
    const text = await response.text();
    try { data = JSON.parse(text); } catch { data = { raw: text }; }

    console.log('Domain response:', response.status, text.substring(0, 200));
    res.status(response.status).json(data);
  } catch (e) {
    res.status(500).json({ error: 'Proxy error: ' + e.message });
  }
}
