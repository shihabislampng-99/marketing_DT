import { useState } from 'react';
import Link from 'next/link';
import { Search, Filter } from 'lucide-react';

export default function LeadList({ leads }) {
    const [search, setSearch] = useState('');
    const [filterStage, setFilterStage] = useState('');

    const filteredLeads = leads.filter(lead => {
        const matchesSearch = (
            (lead['First Name'] || '').toLowerCase().includes(search.toLowerCase()) ||
            (lead['Last Name'] || '').toLowerCase().includes(search.toLowerCase()) ||
            (lead['Company Domain Name'] || '').toLowerCase().includes(search.toLowerCase()) ||
            (lead['Email Address'] || '').toLowerCase().includes(search.toLowerCase())
        );

        const matchesStage = filterStage ? lead['Lifecycle Stage'] === filterStage : true;

        return matchesSearch && matchesStage;
    });

    // Get unique stages for filter
    const stages = [...new Set(leads.map(l => l['Lifecycle Stage']).filter(Boolean))];

    return (
        <div>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                    <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search leads..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ paddingLeft: '3rem' }}
                    />
                </div>
                <div style={{ position: 'relative', width: '200px' }}>
                    <Filter size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <select
                        value={filterStage}
                        onChange={(e) => setFilterStage(e.target.value)}
                        style={{ paddingLeft: '3rem' }}
                    >
                        <option value="">All Stages</option>
                        {stages.map(stage => (
                            <option key={stage} value={stage}>{stage}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ backgroundColor: 'var(--surface-hover)', borderBottom: '1px solid var(--border)' }}>
                        <tr>
                            <th style={{ padding: '1rem' }}>Name</th>
                            <th style={{ padding: '1rem' }}>Company</th>
                            <th style={{ padding: '1rem' }}>Stage</th>
                            <th style={{ padding: '1rem' }}>Owner</th>
                            <th style={{ padding: '1rem' }}>Next Action</th>
                            <th style={{ padding: '1rem' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLeads.map((lead, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '1rem' }}>
                                    <div style={{ fontWeight: '600' }}>{lead['First Name']} {lead['Last Name']}</div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{lead['Job Title']}</div>
                                </td>
                                <td style={{ padding: '1rem' }}>{lead['Company Domain Name']}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span className="badge badge-neutral">{lead['Lifecycle Stage']}</span>
                                </td>
                                <td style={{ padding: '1rem' }}>{lead['Contact Owner']}</td>
                                <td style={{ padding: '1rem' }}>{lead['Next Action']}</td>
                                <td style={{ padding: '1rem', textAlign: 'right' }}>
                                    <Link href={`/leads/${lead.rowIndex}`} className="btn btn-ghost">
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredLeads.length === 0 && (
                    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                        No leads found matching your criteria.
                    </div>
                )}
            </div>
        </div>
    );
}
