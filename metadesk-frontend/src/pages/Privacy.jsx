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

export default function Privacy() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      {/* Header Bar */}
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

      {/* Content */}
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
        }}>Privacy Policy</h1>
        <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '2.5rem' }}>
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div style={sectionStyle}>
          <h2 style={h2Style}>1. Introduction</h2>
          <p style={pStyle}>
            Jinn ("we," "our," or "us") operates as a unified messaging dashboard that enables businesses to manage customer conversations across multiple platforms including Facebook Messenger, Instagram, and WhatsApp. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>2. Information We Collect</h2>
          <p style={pStyle}>We collect the following types of information:</p>
          <ul style={ulStyle}>
            <li style={liStyle}><strong>Messages:</strong> Text messages, media files, and attachments sent between you and your customers through connected platforms (Facebook Messenger, Instagram DM, WhatsApp).</li>
            <li style={liStyle}><strong>Contact Information:</strong> Customer names, platform-specific user IDs, and conversation metadata as provided by Meta's APIs.</li>
            <li style={liStyle}><strong>Platform Tokens:</strong> API access tokens for Facebook, Instagram, and WhatsApp integrations, stored securely and used solely for message delivery.</li>
            <li style={liStyle}><strong>Knowledge Base Data:</strong> Business information, FAQs, and product details that you voluntarily upload to improve AI-assisted responses.</li>
            <li style={liStyle}><strong>Usage Data:</strong> Analytics such as message counts, response times, and conversation statistics for dashboard reporting.</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>3. How We Use Your Information</h2>
          <p style={pStyle}>We use the information we collect to:</p>
          <ul style={ulStyle}>
            <li style={liStyle}>Receive and display incoming customer messages from connected platforms</li>
            <li style={liStyle}>Send replies to customers on your behalf through Meta's Graph APIs</li>
            <li style={liStyle}>Generate AI-assisted response suggestions using third-party LLM providers (OpenRouter, Groq)</li>
            <li style={liStyle}>Provide conversation analytics and business insights</li>
            <li style={liStyle}>Improve AI response quality using your uploaded knowledge base</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>4. AI-Powered Features</h2>
          <p style={pStyle}>
            Jinn uses artificial intelligence to assist with customer communication. When AI is enabled for a conversation:
          </p>
          <ul style={ulStyle}>
            <li style={liStyle}>Customer messages may be processed by third-party AI providers (OpenRouter, Groq) to generate context-aware responses</li>
            <li style={liStyle}>Your knowledge base content is used to ground AI responses in accurate business information</li>
            <li style={liStyle}>Conversation history may be included in AI prompts for contextual understanding</li>
            <li style={liStyle}>You maintain full control to enable or disable AI for each individual conversation</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>5. Data Sharing & Third Parties</h2>
          <p style={pStyle}>We integrate with the following third-party services:</p>
          <ul style={ulStyle}>
            <li style={liStyle}><strong>Meta Platforms (Facebook, Instagram, WhatsApp):</strong> For receiving and sending messages via their Graph APIs</li>
            <li style={liStyle}><strong>Supabase:</strong> For secure data storage and real-time database functionality</li>
            <li style={liStyle}><strong>OpenRouter / Groq:</strong> For AI language model processing (message content is sent for response generation)</li>
            <li style={liStyle}><strong>Render:</strong> For backend server hosting</li>
            <li style={liStyle}><strong>Netlify:</strong> For frontend application hosting</li>
          </ul>
          <p style={pStyle}>
            We do not sell, trade, or rent your personal information to third parties. Data shared with the above services is strictly limited to what is necessary for the service to function.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>6. Data Storage & Security</h2>
          <p style={pStyle}>
            Your data is stored securely using Supabase's cloud infrastructure with encryption at rest and in transit. API tokens and sensitive credentials are stored as environment variables and are never exposed to the frontend. We implement industry-standard security measures including HTTPS encryption, rate limiting, and access controls.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>7. Data Retention</h2>
          <p style={pStyle}>
            We retain message data and contact information for as long as your account is active and as needed to provide the service. You may request deletion of your data at any time by contacting us. Knowledge base content can be deleted directly through the dashboard.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>8. Your Rights</h2>
          <p style={pStyle}>You have the right to:</p>
          <ul style={ulStyle}>
            <li style={liStyle}>Access and review the personal data we hold about you</li>
            <li style={liStyle}>Request correction of inaccurate data</li>
            <li style={liStyle}>Request deletion of your data</li>
            <li style={liStyle}>Disable AI processing for any or all conversations</li>
            <li style={liStyle}>Export your conversation data</li>
            <li style={liStyle}>Revoke platform access tokens at any time through Meta's developer portal</li>
          </ul>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>9. Meta Platform Terms</h2>
          <p style={pStyle}>
            Our use of data received from Meta's APIs (Facebook, Instagram, WhatsApp) complies with <a href="https://developers.facebook.com/terms/" target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6' }}>Meta's Platform Terms</a> and <a href="https://developers.facebook.com/devpolicy/" target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6' }}>Developer Policies</a>. We access only the data necessary to provide our messaging service and do not use Meta platform data for advertising, tracking, or any purpose unrelated to the service.
          </p>
        </div>

        <div style={sectionStyle}>
          <h2 style={h2Style}>10. Changes to This Policy</h2>
          <p style={pStyle}>
            We may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated "Last updated" date. Continued use of the service after changes constitutes acceptance of the revised policy.
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
            Contact Us
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
            If you have any questions about this Privacy Policy, please contact us at<br />
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
