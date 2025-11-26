import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
    if (process.env.NODE_ENV !== 'development' && !process.env.POSTGRES_URL) {
        return res.status(500).json({ error: 'POSTGRES_URL environment variable is not set' });
    }

    try {
        await sql`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        data JSONB
      );
    `;
        return res.status(200).json({ message: 'Table "leads" created successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
