import { getLeads, addLead } from '@/lib/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const leads = await getLeads();
        res.status(200).json(leads);
    } else if (req.method === 'POST') {
        const newLead = await addLead(req.body);
        res.status(201).json(newLead);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
