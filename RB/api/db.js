import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
    const sql = neon(process.env.DATABASE_URL);
    try {
        if (req.method === 'GET') {
            const prices = await sql`SELECT * FROM rb_prices ORDER BY id DESC LIMIT 7`;
            return res.status(200).json({ prices });
        }
        if (req.method === 'POST') {
            const { kapas, magfali } = req.body;
            const date = new Date().toLocaleDateString('gu-IN');
            await sql`INSERT INTO rb_prices (date_text, kapas, magfali) VALUES (${date}, ${kapas}, ${magfali})`;
            return res.status(200).json({ success: true });
        }
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}
