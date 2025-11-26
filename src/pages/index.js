import { useState, useEffect } from 'react';
import Dashboard from '@/components/Dashboard';

export default function DashboardPage() {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchLeads() {
            try {
                const res = await fetch('/api/leads');
                const data = await res.json();
                setLeads(data);
            } catch (error) {
                console.error('Failed to fetch leads', error);
            } finally {
                setLoading(false);
            }
        }

        fetchLeads();
    }, []);

    if (loading) return <div className="container" style={{ paddingTop: '2rem' }}>Loading...</div>;

    return (
        <div className="container">
            <header className="header">
                <h1 className="page-title">Dashboard</h1>
            </header>
            <Dashboard leads={leads} />
        </div>
    );
}
