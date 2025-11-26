import { updateLead, getLead } from '../../../lib/db';

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'GET') {
        const lead = await getLead(id);
        if (lead) {
            res.status(200).json(lead);
        } else {
            res.status(404).json({ message: 'Lead not found' });
        }
    } else if (req.method === 'PUT') {
        const updatedLead = await updateLead(id, req.body);
        res.status(200).json(updatedLead);
    } else {
        res.setHeader('Allow', ['GET', 'PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
