import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
    const sql = neon(process.env.DATABASE_URL);
    try {
        // ૧. ડેટા મેળવવા માટે (GET)
        if (req.method === 'GET') {
            const prices = await sql`SELECT * FROM rb_prices ORDER BY id DESC LIMIT 10`;
            return res.status(200).json({ prices });
        }
        
        // ૨. ડેટા સેવ કરવા માટે (POST)
        if (req.method === 'POST') {
            const { kapas, magfali } = req.body;
            // ગુજરાતી તારીખ ફોર્મેટ
            const date = new Date().toLocaleDateString('gu-IN', { day: 'numeric', month: 'short' });
            
            await sql`INSERT INTO rb_prices (date_text, kapas, magfali) VALUES (${date}, ${kapas}, ${magfali})`;
            return res.status(200).json({ success: true });
        }
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: e.message });
    }
}
