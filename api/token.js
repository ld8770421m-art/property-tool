export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { client_id, client_secret } = req.body;
  if (!client_id || !client_secret) return res.status(400).json({ error: 'Missing credentials' });

  const creds = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

  try {
    const response = await fetch('https://auth.domain.com.au/v1/connect/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${creds}`
      },
      body: 'grant_type=client_credentials&scope=api_listings_write api_listings_read'
    });

    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data.error_description || 'Auth failed' });
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: 'Server error: ' + e.message });
  }
}
