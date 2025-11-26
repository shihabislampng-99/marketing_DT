import { useState } from 'react';
import { ArrowLeft, Save, CheckSquare, MessageSquare, Linkedin, Mail, Search as SearchIcon } from 'lucide-react';
import Link from 'next/link';

export default function LeadDetail({ lead: initialLead }) {
    const [lead, setLead] = useState(initialLead);
    const [saving, setSaving] = useState(false);

    const handleChange = (field, value) => {
        setLead(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch(`/api/leads/${lead.rowIndex}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(lead),
            });
            if (!res.ok) throw new Error('Failed to update');
            // Optional: show toast
        } catch (error) {
            console.error(error);
            alert('Failed to save changes');
        } finally {
            setSaving(false);
        }
    };

    const saveUpdates = async (updatedLead) => {
        try {
            await fetch(`/api/leads/${updatedLead.rowIndex}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedLead),
            });
        } catch (error) {
            console.error(error);
        }
    };

    const steps = [
        { field: 'Personalized Research Done', label: 'Personalized Research', icon: SearchIcon },
        { field: 'Email Sent', label: 'Initial Email Sent', icon: Mail },
        { field: 'Linkedin Conncect', label: 'LinkedIn Connection Sent', icon: Linkedin },
        { field: 'LinkedIn Outreach Message Done', label: 'LinkedIn Message Sent', icon: MessageSquare },
        { field: 'Follow Up_1_Email', label: 'Follow Up 1 Sent', icon: Mail },
        { field: 'Follow Up_2_Email', label: 'Follow Up 2 Sent', icon: Mail },
    ];

    const toggleStep = (field) => {
        const newValue = (!lead[field] || lead[field] === 'No') ? 'Yes' : 'No';
        const updates = { [field]: newValue };

        // Auto-update Last Activity Date
        updates['Last Activity Date'] = new Date().toLocaleString();

        // Check if all steps are done
        const updatedLeadForCheck = { ...lead, ...updates };
        const allDone = steps.every(step => {
            const val = updatedLeadForCheck[step.field];
            return val && val !== 'No';
        });

        if (allDone) {
            // Optional: Auto-update status if needed, but keeping it manual for now as per previous thought
        }

        setLead(prev => ({ ...prev, ...updates }));

        // Auto-save on toggle
        saveUpdates({ ...lead, ...updates });
    };

    return (
        <div>
            <div style={{ marginBottom: '1.5rem' }}>
                <Link href="/leads" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    <ArrowLeft size={16} /> Back to Leads
                </Link>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{lead['First Name']} {lead['Last Name']}</h1>
                        <p style={{ color: 'var(--text-muted)' }}>{lead['Company Domain Name']} • {lead['Job Title']}</p>
                    </div>
                    <button onClick={handleSave} className="btn btn-primary" disabled={saving}>
                        <Save size={18} style={{ marginRight: '0.5rem' }} />
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Info Card */}
                    <div className="card">
                        <h2 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Contact Details</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Email</label>
                                <input value={lead['Email Address']} onChange={(e) => handleChange('Email Address', e.target.value)} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Phone</label>
                                <input value={lead['Phone Number']} onChange={(e) => handleChange('Phone Number', e.target.value)} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>LinkedIn URL</label>
                                <input value={lead['LinkedIn URL']} onChange={(e) => handleChange('LinkedIn URL', e.target.value)} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>City</label>
                                <input value={lead['City']} onChange={(e) => handleChange('City', e.target.value)} />
                            </div>
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="card">
                        <h2 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Notes</h2>
                        <textarea
                            rows={6}
                            value={lead['Notes'] || ''}
                            onChange={(e) => handleChange('Notes', e.target.value)}
                            placeholder="Add notes here..."
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Status Card */}
                    <div className="card">
                        <h2 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Status</h2>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Lifecycle Stage</label>
                            <select value={lead['Lifecycle Stage']} onChange={(e) => handleChange('Lifecycle Stage', e.target.value)}>
                                <option value="Lead">Lead</option>
                                <option value="Qualified">Qualified</option>
                                <option value="Customer">Customer</option>
                                <option value="Lost">Lost</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Response</label>
                            <select value={lead['Resopnse']} onChange={(e) => handleChange('Resopnse', e.target.value)}>
                                <option value="">No reply</option>
                                <option value="Positive">Positive</option>
                                <option value="Negative">Negative</option>
                                <option value="Not now">Not now</option>
                            </select>
                        </div>
                    </div>

                    {/* Action Checklist */}
                    <div className="card">
                        <h2 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Outreach Checklist</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {steps.map((step) => {
                                const isDone = lead[step.field] && lead[step.field] !== 'No';
                                const Icon = step.icon;
                                return (
                                    <div
                                        key={step.field}
                                        onClick={() => toggleStep(step.field)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.75rem',
                                            padding: '0.75rem',
                                            borderRadius: 'var(--radius-md)',
                                            backgroundColor: isDone ? 'rgba(16, 185, 129, 0.1)' : 'var(--surface-hover)',
                                            cursor: 'pointer',
                                            border: isDone ? '1px solid var(--success)' : '1px solid transparent'
                                        }}
                                    >
                                        <div style={{
                                            width: '20px',
                                            height: '20px',
                                            borderRadius: '4px',
                                            border: isDone ? 'none' : '2px solid var(--text-muted)',
                                            backgroundColor: isDone ? 'var(--success)' : 'transparent',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            {isDone && <CheckSquare size={14} color="white" />}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: '0.875rem', fontWeight: '500', color: isDone ? 'var(--text-main)' : 'var(--text-muted)' }}>{step.label}</div>
                                        </div>
                                        <Icon size={16} color={isDone ? 'var(--success)' : 'var(--text-muted)'} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
