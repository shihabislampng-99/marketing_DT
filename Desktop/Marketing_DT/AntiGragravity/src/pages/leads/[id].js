import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import LeadDetail from '@/components/LeadDetail';

export default function LeadDetailPage() {
    const router = useRouter();
    const { id } = router.query;
    const [lead, setLead] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        async function fetchLead() {
            try {
                const res = await fetch(`/api/leads/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setLead(data);
                } else {
                    console.error('Lead not found');
                }
            } catch (error) {
                console.error('Failed to fetch lead', error);
            } finally {
                setLoading(false);
            }
        }

        fetchLead();
    }, [id]);

    if (loading) return <div className="container" style={{ paddingTop: '2rem' }}>Loading...</div>;
    if (!lead) return <div className="container" style={{ paddingTop: '2rem' }}>Lead not found</div>;

    return (
        <div className="container">
            <LeadDetail lead={lead} />
        </div>
    );
}
