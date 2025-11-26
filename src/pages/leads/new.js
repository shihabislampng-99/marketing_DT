import { useState } from 'react';
import { useRouter } from 'next/router';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

export default function AddLeadPage() {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        'Company Domain Name': '',
        'First Name': '',
        'Last Name': '',
        'Email Address': '',
        'Job Title': '',
        'LinkedIn URL': '',
        'Phone Number': '',
        'City': '',
        'Lifecycle Stage': 'Lead',
        'Contact Owner': '',
        'Services': '',
        'Other\'s links': '',
        // Initialize status fields
        'Email Sent': '',
        'Resopnse': '',
        'Linkedin Conncect': '',
        'Follow Up_1_Email': '',
        'Follow Up_2_Email': '',
        'Personalized Research Done': 'No',
        'LinkedIn Outreach Message Done': 'No',
        'Last Activity Date': new Date().toLocaleString(),
        'Next Action': 'Do personalized research',
        'Notes': ''
    });

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push('/leads');
            } else {
                alert('Failed to create lead');
            }
        } catch (error) {
            console.error(error);
            alert('Error creating lead');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="container">
            <div style={{ marginBottom: '1.5rem' }}>
                <Link href="/leads" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    <ArrowLeft size={16} /> Back to Leads
                </Link>
                <h1 className="page-title">Add New Lead</h1>
            </div>

            <form onSubmit={handleSubmit} style={{ maxWidth: '800px' }}>
                <div className="card" style={{ display: 'grid', gap: '1.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>First Name *</label>
                            <input required value={formData['First Name']} onChange={(e) => handleChange('First Name', e.target.value)} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Last Name *</label>
                            <input required value={formData['Last Name']} onChange={(e) => handleChange('Last Name', e.target.value)} />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Company Domain *</label>
                        <input required value={formData['Company Domain Name']} onChange={(e) => handleChange('Company Domain Name', e.target.value)} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email Address *</label>
                            <input required type="email" value={formData['Email Address']} onChange={(e) => handleChange('Email Address', e.target.value)} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Job Title</label>
                            <input value={formData['Job Title']} onChange={(e) => handleChange('Job Title', e.target.value)} />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>LinkedIn URL</label>
                            <input value={formData['LinkedIn URL']} onChange={(e) => handleChange('LinkedIn URL', e.target.value)} />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Phone Number</label>
                            <input value={formData['Phone Number']} onChange={(e) => handleChange('Phone Number', e.target.value)} />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Lifecycle Stage</label>
                            <select value={formData['Lifecycle Stage']} onChange={(e) => handleChange('Lifecycle Stage', e.target.value)}>
                                <option value="Lead">Lead</option>
                                <option value="Qualified">Qualified</option>
                                <option value="Customer">Customer</option>
                                <option value="Lost">Lost</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Contact Owner</label>
                            <input value={formData['Contact Owner']} onChange={(e) => handleChange('Contact Owner', e.target.value)} />
                        </div>
                    </div>

                    <div style={{ marginTop: '1rem', textAlign: 'right' }}>
                        <button type="submit" className="btn btn-primary" disabled={saving}>
                            <Save size={18} style={{ marginRight: '0.5rem' }} />
                            {saving ? 'Creating...' : 'Create Lead'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
