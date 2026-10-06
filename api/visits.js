export default async function handler(req, res) {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  const r = await fetch(`${url}/incr/visits`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await r.json();
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({ visits: data.result });
}