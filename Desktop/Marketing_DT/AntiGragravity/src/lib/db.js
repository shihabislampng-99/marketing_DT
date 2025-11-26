import fs from 'fs';
import path from 'path';
import { sql } from '@vercel/postgres';

const DATA_FILE = path.join(process.cwd(), 'data', 'leads.json');

// --- LOCAL STORAGE HELPERS ---

function ensureDataDir() {
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
}

function initDataFile() {
    ensureDataDir();
    if (!fs.existsSync(DATA_FILE)) {
        const initialData = {
            headers: [
                'Company Domain Name', 'First Name', 'Last Name', 'Websites', 'Job Title',
                'Email Address', 'LinkedIn URL', 'Phone Number', 'City', 'Lifecycle Stage',
                'Contact Owner', 'Services', 'Other\'s links', 'Email Sent', 'Resopnse',
                'Linkedin Conncect', 'Follow Up_1_Email', 'Follow Up_2_Email',
                'Personalized Research Done', 'LinkedIn Outreach Message Done',
                'Last Activity Date', 'Next Action', 'Notes'
            ],
            leads: []
        };
        fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
    }
}

// --- HYBRID EXPORTS ---

export async function getLeads() {
    // POSTGRES MODE
    if (process.env.POSTGRES_URL) {
        try {
            const { rows } = await sql`SELECT * FROM leads ORDER BY id ASC`;
            return rows.map(row => ({
                ...row.data,
                id: row.id, // Keep DB id
                rowIndex: row.id // Maintain compatibility with frontend expecting rowIndex
            }));
        } catch (error) {
            // Table might not exist yet
            console.error('Postgres error:', error);
            return [];
        }
    }

    // LOCAL MODE
    initDataFile();
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    return data.leads.map((lead, index) => ({
        ...lead,
        rowIndex: index + 2
    }));
}

export async function getLead(id) {
    // POSTGRES MODE
    if (process.env.POSTGRES_URL) {
        const { rows } = await sql`SELECT * FROM leads WHERE id = ${id}`;
        if (rows.length > 0) {
            return {
                ...rows[0].data,
                id: rows[0].id,
                rowIndex: rows[0].id
            };
        }
        return null;
    }

    // LOCAL MODE
    const leads = await getLeads();
    return leads.find(lead => lead.rowIndex === parseInt(id));
}

export async function addLead(leadData) {
    // POSTGRES MODE
    if (process.env.POSTGRES_URL) {
        // We store the whole object as JSONB
        await sql`INSERT INTO leads (data) VALUES (${JSON.stringify(leadData)})`;
        return { success: true };
    }

    // LOCAL MODE
    initDataFile();
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));

    const newLead = {};
    data.headers.forEach(header => {
        newLead[header] = leadData[header] || '';
    });

    data.leads.push(newLead);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

    return { success: true };
}

export async function updateLead(id, leadData) {
    // POSTGRES MODE
    if (process.env.POSTGRES_URL) {
        // First get existing data to merge
        const existing = await getLead(id);
        if (!existing) return { success: false, error: 'Lead not found' };

        // Remove ID/rowIndex from data to be saved
        const { id: _, rowIndex: __, ...currentData } = existing;
        const mergedData = { ...currentData, ...leadData };

        await sql`UPDATE leads SET data = ${JSON.stringify(mergedData)} WHERE id = ${id}`;
        return { success: true };
    }

    // LOCAL MODE
    initDataFile();
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    const leadIndex = parseInt(id) - 2;

    if (leadIndex >= 0 && leadIndex < data.leads.length) {
        data.headers.forEach(header => {
            if (leadData[header] !== undefined) {
                data.leads[leadIndex][header] = leadData[header];
            }
        });
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
        return { success: true };
    }

    return { success: false, error: 'Lead not found' };
}
