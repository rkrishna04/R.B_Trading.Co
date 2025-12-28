import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  const sql = neon(process.env.DATABASE_URL);

  if (req.method === 'GET') {
    const prices = await sql`SELECT * FROM rb_prices ORDER BY updated_at DESC LIMIT 7`;
    const farmers = await sql`SELECT * FROM rb_farmers`;
    return res.status(200).json({ prices, farmers });
  }

  if (req.method === 'POST') {
    const { type, kapas, magfali, name, village, phone } = req.body;
    if (type === 'price') {
      await sql`INSERT INTO rb_prices (kapas, magfali) VALUES (${kapas}, ${magfali})`;
    } else if (type === 'farmer') {
      await sql`INSERT INTO rb_farmers (name, village, phone) VALUES (${name}, ${village}, ${phone})`;
    }
    return res.status(200).json({ success: true });
  }
}