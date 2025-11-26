import Link from 'next/link';
import { useRouter } from 'next/router';
import { LayoutDashboard, Users, CheckSquare, Settings, PlusCircle } from 'lucide-react';
import clsx from 'clsx';

export default function Layout({ children }) {
    const router = useRouter();

    const navItems = [
        { name: 'Dashboard', href: '/', icon: LayoutDashboard },
        { name: 'All Leads', href: '/leads', icon: Users },
        { name: 'Today\'s Tasks', href: '/tasks', icon: CheckSquare },
    ];

    return (
        <div className="layout">
            <aside className="sidebar">
                <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '8px' }}></div>
                    <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Outreach<span style={{ color: 'var(--primary)' }}>Pro</span></h1>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = router.pathname === item.href;
                        return (
                            <Link key={item.name} href={item.href} className={clsx('nav-item', isActive && 'active')}>
                                <Icon size={20} />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <Link href="/leads/new" className="btn btn-primary" style={{ justifyContent: 'center', gap: '0.5rem' }}>
                    <PlusCircle size={20} />
                    <span>Add Lead</span>
                </Link>
            </aside>

            <main className="main-content">
                {children}
            </main>
        </div>
    );
}
