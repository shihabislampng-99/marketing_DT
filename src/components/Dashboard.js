import Link from 'next/link';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function Dashboard({ leads }) {
    // Logic to filter tasks
    const tasks = leads.filter(lead => {
        // 1. Personalized Research Done is No
        if (!lead['Personalized Research Done'] || lead['Personalized Research Done'] === 'No') return true;

        // 2. Email Sent is empty
        if (!lead['Email Sent']) return true;

        // 3. Linkedin Conncect is empty
        if (!lead['Linkedin Conncect']) return true;

        // 4. Follow Up 1 or 2 empty while previous steps done
        // Assuming if Email Sent is done, we check Follow Ups
        if (lead['Email Sent'] && !lead['Follow Up_1_Email']) return true;
        if (lead['Follow Up_1_Email'] && !lead['Follow Up_2_Email']) return true;

        // 5. Response empty and last touch > X days (skipped for now, needs date parsing)

        return false;
    }).map(lead => {
        // Determine next step
        let nextStep = '';
        if (!lead['Personalized Research Done'] || lead['Personalized Research Done'] === 'No') nextStep = 'Do personalized research';
        else if (!lead['Email Sent']) nextStep = 'Send first email';
        else if (!lead['Linkedin Conncect']) nextStep = 'Send LinkedIn connection';
        else if (!lead['Follow Up_1_Email']) nextStep = 'Send Follow Up 1';
        else if (!lead['Follow Up_2_Email']) nextStep = 'Send Follow Up 2';
        else nextStep = 'Check for response';

        return { ...lead, nextStep };
    });

    // Sort by Last Activity Date (oldest first) - simplistic string sort for now
    tasks.sort((a, b) => (a['Last Activity Date'] || '').localeCompare(b['Last Activity Date'] || ''));

    return (
        <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="card">
                    <h3 style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Total Leads</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{leads.length}</p>
                </div>
                <div className="card">
                    <h3 style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Pending Tasks</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--warning)' }}>{tasks.length}</p>
                </div>
                <div className="card">
                    <h3 style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Response Rate</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--success)' }}>
                        {Math.round((leads.filter(l => l['Resopnse'] && l['Resopnse'] !== 'No reply').length / leads.length) * 100 || 0)}%
                    </p>
                </div>
            </div>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Today's Tasks</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {tasks.length === 0 ? (
                    <div className="card" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                        <CheckCircle size={48} style={{ margin: '0 auto 1rem', color: 'var(--success)' }} />
                        <p>All caught up! No tasks for today.</p>
                    </div>
                ) : (
                    tasks.map((lead, i) => (
                        <div key={i} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h3 style={{ fontWeight: '600' }}>{lead['First Name']} {lead['Last Name']}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{lead['Company Domain Name']} • {lead['Contact Owner']}</p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div className="badge badge-warning" style={{ marginBottom: '0.5rem' }}>{lead.nextStep}</div>
                                <br />
                                <Link href={`/leads/${lead.rowIndex}`} className="btn btn-primary" style={{ fontSize: '0.875rem', padding: '0.25rem 0.75rem' }}>
                                    Open
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
