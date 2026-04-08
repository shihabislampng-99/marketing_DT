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
const ulStyle = {
  paddingLeft: '1.5rem',
  marginBottom: '0.75rem',
};
const liStyle = {
  fontSize: '0.95rem',
  lineHeight: 1.75,
  color: '#475569',
  marginBottom: '0.35rem',
};

export default function Terms() {
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
        }}>Terms of Service</h1>
        <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '2.5rem' }}>
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div style={sectionStyle}>
          <h2 style={h2Style}>1. Acceptance of Terms</h2>
          <p style={pStyle}>
            By accessing or using Jinn ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not use the Service.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>2. Description of Service</h2>
          <p style={pStyle}>
            Jinn provides a unified messaging dashboard that connects to Meta's Graph APIs (Facebook, Instagram, WhatsApp) to help businesses manage customer communication. AI-powered response generation is an optional feature.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>3. User Responsibilities</h2>
          <p style={pStyle}>You are responsible for:</p>
          <ul style={ulStyle}>
            <li style={liStyle}>Maintaining the confidentiality of your API keys and tokens.</li>
            <li>All activities that occur under your account.</li>
            <li>Complying with Meta's Platform Terms and Developer Policies.</li>
            <li>Ensuring that your use of AI-generated responses complies with all applicable laws and does not mislead customers.</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>4. Prohibited Uses</h2>
          <p style={pStyle}>You agree not to use the Service for:</p>
          <ul style={ulStyle}>
            <li style={liStyle}>Sending spam or unsolicited communications.</li>
            <li>Impersonating any person or entity.</li>
            <li>Harvesting or collecting customer data without consent.</li>
            <li>Engaging in any activity that interferes with or disrupts the Service.</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>5. Data Ownership and Privacy</h2>
          <p style={pStyle}>
            You retain all rights to your conversation data. Our use of your data is governed by our Privacy Policy. You grant us a limited license to process this data solely to provide the Service.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>6. Limitation of Liability</h2>
          <p style={pStyle}>
            The Service is provided "as is" without any warranties. Jinn shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Service or any automated AI responses.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>7. Changes to Service</h2>
          <p style={pStyle}>
            We reserve the right to modify or discontinue the Service at any time without notice. We will not be liable to you or any third party for any modification, suspension, or discontinuance.
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
            If you have any questions about these Terms, please contact us at<br />
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
