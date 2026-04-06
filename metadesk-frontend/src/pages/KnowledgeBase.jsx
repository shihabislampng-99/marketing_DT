import React, { useState, useEffect } from 'react';
import api from '../api';
import { Database, Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';
import { format } from 'date-fns';

export default function KnowledgeBase() {
  const [knowledge, setKnowledge] = useState([]);
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const fetchKnowledge = async () => {
    try {
      const res = await api.get('/knowledge');
      if (res.data.success) {
        setKnowledge(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch knowledge base', err);
    }
  };

  useEffect(() => {
    fetchKnowledge();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!topic.trim() || !content.trim()) return;
    
    try {
      const res = await api.post('/knowledge', { topic, content, is_active: true });
      if (res.data.success) {
        setTopic('');
        setContent('');
        setIsAdding(false);
        fetchKnowledge();
      }
    } catch (err) {
      console.error('Failed to add knowledge', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/knowledge/${id}`);
      fetchKnowledge();
    } catch (err) {
      console.error('Failed to delete knowledge', err);
    }
  };

  const toggleStatus = async (item) => {
    try {
      await api.put(`/knowledge/${item.id}`, { is_active: !item.is_active });
      fetchKnowledge();
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  return (
    <div style={{ flex: 1, padding: '48px', overflowY: 'auto' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h2 className="display-font" style={{ fontSize: '32px', marginBottom: '8px' }}>Business Knowledge</h2>
          <p style={{ color: 'var(--text-muted)' }}>Train your AI by adding facts, policies, and product details.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            backgroundColor: 'var(--text-on-light)', 
            color: '#fff', 
            padding: '12px 24px', 
            borderRadius: '24px',
            fontWeight: '500'
          }}>
          <Plus size={18} /> Add Knowledge
        </button>
      </div>

      {isAdding && (
        <div className="card" style={{ marginBottom: '32px', border: '1px solid var(--surface-highest)' }}>
          <h3 className="display-font" style={{ marginBottom: '16px' }}>New Knowledge Entry</h3>
          <form onSubmit={handleAdd}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', fontWeight: '500' }}>Topic / Intent</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="e.g., Return Policy" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', fontWeight: '500' }}>Detailed Content</label>
              <textarea 
                className="input-field" 
                placeholder="We accept returns within 30 days of purchase. The item must be in original condition..." 
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{ resize: 'vertical' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => setIsAdding(false)} style={{ padding: '12px 24px', backgroundColor: 'transparent', color: 'var(--text-muted)' }}>Cancel</button>
              <button type="submit" style={{ padding: '12px 24px', backgroundColor: 'var(--messenger)', color: '#fff', borderRadius: '12px', fontWeight: '500' }}>Save to Database</button>
            </div>
          </form>
        </div>
      )}

      {/* Embedded Knowledge List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '24px' }}>
        {knowledge.map(item => (
          <div key={item.id} className="card" style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#e2e0fc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Database size={18} color="var(--text-on-light)" />
                </div>
                <div>
                  <h3 className="display-font" style={{ fontSize: '18px' }}>{item.topic}</h3>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Added {format(new Date(item.created_at), 'MMM d, yyyy')}</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => toggleStatus(item)} style={{ background: 'transparent', color: item.is_active ? 'var(--whatsapp)' : 'var(--text-muted)' }} title={item.is_active ? "Active" : "Inactive"}>
                  {item.is_active ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                </button>
                <button onClick={() => handleDelete(item.id)} style={{ background: 'transparent', color: 'var(--error)' }} title="Delete">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
            
            <div style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-muted)', flex: 1 }}>
              {item.content.length > 180 ? item.content.substring(0, 180) + '...' : item.content}
            </div>
            
            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--surface-highest)', fontSize: '12px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: item.is_active ? 'var(--messenger)' : 'var(--text-muted)' }}>
                {item.is_active ? 'Indexed in Qdrant Vector DB' : 'Not Embedded'}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
