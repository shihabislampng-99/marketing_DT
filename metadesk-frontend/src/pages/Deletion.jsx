import { useNavigate } from 'react-router-dom';

const sectionStyle = {
  marginBottom: '2rem',
};
const h2Style = {
  fontSize: '1.25rem',
  fontWeight: 700,
  color: '#1e293b',
  marginBottom: '0.75rem',
  borderBottom: '2px solid #e2e8f0',
  paddingBottom: '0.5rem',
};
const pStyle = {
  fontSize: '0.95rem',
  lineHeight: 1.75,
  color: '#475569',
  marginBottom: '0.75rem',
};

export default function Deletion() {
  const navigate = useNavigate();

  return (
    <div style={{
      width: '100%',
      flex: 1,
      height: '100vh',
      overflowY: 'auto',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      <header style={{
        background: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        padding: '1rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 800, fontSize: '1rem',
          }}>M</div>
          <span style={{ fontWeight: 700, fontSize: '1.15rem', color: '#1e293b' }}>Jinn</span>
        </div>
        <button
          onClick={() => navigate('/')}
          style={{
            background: '#3b82f6',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '0.5rem 1.25rem',
            fontSize: '0.875rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >← Back to Dashboard</button>
      </header>

      <main style={{
        maxWidth: 800,
        margin: '2rem auto',
        background: '#ffffff',
        borderRadius: 16,
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        padding: '3rem',
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 800,
          color: '#0f172a',
          marginBottom: '0.5rem',
        }}>User Data Deletion</h1>
        <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '2.5rem' }}>
          Instructions for requesting account and data deletion.
        </p>

        <div style={sectionStyle}>
          <h2 style={h2Style}>Data Deletion Overview</h2>
          <p style={pStyle}>
            Following the Meta Platform Policy, we provide a User Data Deletion Callback URL or a clear set of instructions for users who wish to delete their activities and data associated with our application.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>How to Request Data Deletion</h2>
          <p style={pStyle}>
            If you want to delete your data from Jinn, you can do so by following these steps:
          </p>
          <ol style={{ paddingLeft: '1.5rem', color: '#475569', lineHeight: 1.8 }}>
            <li>Go to your Facebook Account's <strong>Settings & Privacy</strong> menu.</li>
            <li>Click <strong>Settings</strong>.</li>
            <li>Look for <strong>Apps and Websites</strong> and you will see all of the apps and websites you linked with your Facebook.</li>
            <li>Search and click <strong>Jinn</strong> in the search bar.</li>
            <li>Scroll and click <strong>Remove</strong>.</li>
            <li>Congratulations, you have successfully removed your app activities and data from Jinn.</li>
          </ol>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>Manual Deletion Request</h2>
          <p style={pStyle}>
            Alternatively, you can request manual deletion of your account and all associated data (including conversation history, contact details, and knowledge base files) by contacting our support team directly.
          </p>
          <p style={pStyle}>
            Please email your request to: <strong>support@juhdi.com</strong>
          </p>
          <p style={pStyle}>
            We will process your request within 48-72 hours and send you a confirmation once your data has been permanently erased from our primary servers and backups.
          </p>
        </div>

        <div style={{
          marginTop: '3rem',
          padding: '1.5rem',
          background: '#f1f5f9',
          borderRadius: 12,
          textAlign: 'center',
        }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem' }}>
            Questions?
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
            If you have any questions regarding our data deletion process, please contact us at<br />
            <a href="mailto:support@juhdi.com" style={{ color: '#3b82f6', fontWeight: 600 }}>support@juhdi.com</a>
          </p>
        </div>
      </main>

      <footer style={{
        textAlign: 'center',
        padding: '2rem',
        color: '#94a3b8',
        fontSize: '0.8rem',
      }}>
        © {new Date().getFullYear()} Jinn by Juhdi. All rights reserved.
      </footer>
    </div>
  );
}
