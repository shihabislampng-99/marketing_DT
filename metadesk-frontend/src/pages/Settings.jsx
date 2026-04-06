import React, { useState, useEffect, useRef } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';
import { SYSTEM_PROMPT_TEMPLATES } from './Inbox';

// ── Toast helper ─────────────────────────────────────────────────────────────
function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div className={`fixed bottom-6 right-6 z-[200] flex items-center gap-2 px-5 py-3 rounded-2xl shadow-xl font-semibold text-sm text-white transition-all duration-300
      ${toast.type === 'error' ? 'bg-red-500' : 'bg-emerald-500'}`}>
      <span className="material-symbols-outlined text-[18px]" data-icon={toast.type === 'error' ? 'error' : 'check_circle'}>
        {toast.type === 'error' ? 'error' : 'check_circle'}
      </span>
      {toast.msg}
    </div>
  );
}

// ── PasswordInput with show/hide toggle ──────────────────────────────────────
function PasswordInput({ value, onChange, placeholder, className }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative flex-1">
      <input
        className={className + ' pr-10'}
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <button
        type="button"
        tabIndex={-1}
        onClick={() => setShow(s => !s)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
      >
        <span className="material-symbols-outlined text-[18px]" data-icon={show ? 'visibility_off' : 'visibility'}>
          {show ? 'visibility_off' : 'visibility'}
        </span>
      </button>
    </div>
  );
}

// ── API Status dot ────────────────────────────────────────────────────────────
function StatusDot({ status }) {
  if (status === 'connected') return <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-300 shrink-0" title="Connected"></span>;
  if (status === 'error')     return <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm shadow-red-300 shrink-0" title="Error"></span>;
  return <span className="w-2.5 h-2.5 rounded-full bg-slate-300 shrink-0" title="Not set"></span>;
}

// ── Char Count ────────────────────────────────────────────────────────────────
function CharCount({ text, limit = 2000 }) {
  const len = (text || '').length;
  return (
    <span className={`text-[10px] font-mono ${len > limit * 0.9 ? 'text-amber-500' : 'text-slate-400'}`}>
      {len} / {limit} chars
    </span>
  );
}

export default function Settings() {

  const [settings, setSettings] = useState({
    whatsapp_token: '',
    whatsapp_phone_number_id: '',
    instagram_token: '',
    messenger_page_token: '',
    openrouter_api_key: '',
    groq_api_key: '',
    business_name: '',
    default_ai_enabled: false,
    ai_system_prompt_whatsapp: '',
    ai_system_prompt_instagram: '',
    ai_system_prompt_messenger: ''
  });

  const [chunks, setChunks] = useState([]);
  const [kbSearch, setKbSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingChunk, setEditingChunk] = useState(null);
  const [chunkForm, setChunkForm] = useState({ topic: '', content: '' });
  const [savingAi, setSavingAi] = useState(false);
  const [toast, setToast] = useState(null);
  const [apiStatus, setApiStatus] = useState({ openrouter: 'idle', groq: 'idle' }); // idle | testing | connected | error
  const csvInputRef = useRef(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    api.get('/settings').then(res => {
      if (res.data.success && res.data.data) {
        setSettings(prev => ({ ...prev, ...res.data.data }));
        // auto-detect status
        const d = res.data.data;
        setApiStatus({
          openrouter: d.openrouter_api_key ? 'connected' : 'idle',
          groq: d.groq_api_key ? 'connected' : 'idle',
        });
      }
    });
    fetchChunks();
  }, []);

  const fetchChunks = async () => {
    try {
      const res = await api.get('/knowledge');
      if (res.data.success) setChunks(res.data.data);
    } catch (e) { console.warn('Could not fetch knowledge chunks'); }
  };

  const handleSaveField = async (key, value) => {
    try {
      await api.patch('/settings', { [key]: value });
      showToast('Saved successfully ✓');
    } catch (e) {
      showToast('Failed to save', 'error');
    }
  };

  const handleSaveAiConfig = async () => {
    setSavingAi(true);
    try {
      await api.patch('/settings', {
        business_name: settings.business_name,
        default_ai_enabled: settings.default_ai_enabled,
        ai_system_prompt_whatsapp: settings.ai_system_prompt_whatsapp,
        ai_system_prompt_instagram: settings.ai_system_prompt_instagram,
        ai_system_prompt_messenger: settings.ai_system_prompt_messenger,
      });
      showToast('AI Configuration saved ✓');
    } catch (e) {
      showToast('Failed to save AI config', 'error');
    }
    setSavingAi(false);
  };

  // ── Test API connections ──────────────────────────────────────────────────
  const testConnection = async (provider) => {
    setApiStatus(s => ({ ...s, [provider]: 'testing' }));
    try {
      const key = provider === 'openrouter' ? settings.openrouter_api_key : settings.groq_api_key;
      if (!key?.trim()) {
        setApiStatus(s => ({ ...s, [provider]: 'error' }));
        showToast('API key is empty', 'error');
        return;
      }
      // Lightweight model list ping
      const url = provider === 'openrouter'
        ? 'https://openrouter.ai/api/v1/models'
        : 'https://api.groq.com/openai/v1/models';
      const res = await fetch(url, { headers: { Authorization: `Bearer ${key}` } });
      if (res.ok) {
        setApiStatus(s => ({ ...s, [provider]: 'connected' }));
        showToast(`${provider === 'openrouter' ? 'OpenRouter' : 'Groq'} connected ✓`);
      } else {
        setApiStatus(s => ({ ...s, [provider]: 'error' }));
        showToast(`Connection failed (${res.status})`, 'error');
      }
    } catch (e) {
      setApiStatus(s => ({ ...s, [provider]: 'error' }));
      showToast('Connection error', 'error');
    }
  };

  // ── Knowledge Base ────────────────────────────────────────────────────────
  const filteredChunks = kbSearch.trim()
    ? chunks.filter(c => c.topic.toLowerCase().includes(kbSearch.toLowerCase()) || c.content.toLowerCase().includes(kbSearch.toLowerCase()))
    : chunks;

  const openAddModal = () => { setEditingChunk(null); setChunkForm({ topic: '', content: '' }); setShowModal(true); };
  const openEditModal = (chunk) => { setEditingChunk(chunk); setChunkForm({ topic: chunk.topic, content: chunk.content }); setShowModal(true); };

  const handleSaveChunk = async () => {
    if (!chunkForm.topic.trim() || !chunkForm.content.trim()) { showToast('Topic and Content are required', 'error'); return; }
    try {
      if (editingChunk) {
        await api.put(`/knowledge/${editingChunk.id}`, chunkForm);
      } else {
        await api.post('/knowledge', chunkForm);
      }
      setShowModal(false);
      fetchChunks();
      showToast(editingChunk ? 'Chunk updated ✓' : 'Chunk added ✓');
    } catch (e) {
      showToast('Error saving chunk', 'error');
    }
  };

  const handleDeleteChunk = async (id) => {
    if (!window.confirm('Delete this knowledge chunk?')) return;
    try {
      await api.delete(`/knowledge/${id}`);
      fetchChunks();
      showToast('Chunk deleted');
    } catch (e) {
      showToast('Error deleting chunk', 'error');
    }
  };

  // ── CSV Import ────────────────────────────────────────────────────────────
  const handleCsvImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const lines = ev.target.result.split('\n').filter(Boolean);
      const header = lines[0].split(',').map(h => h.trim().toLowerCase());
      const topicIdx = header.indexOf('topic');
      const contentIdx = header.indexOf('content');
      if (topicIdx < 0 || contentIdx < 0) {
        showToast('CSV must have "Topic" and "Content" columns', 'error');
        return;
      }
      let imported = 0;
      for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(',');
        const topic = cols[topicIdx]?.trim();
        const content = cols[contentIdx]?.trim();
        if (topic && content) {
          try { await api.post('/knowledge', { topic, content }); imported++; } catch {}
        }
      }
      fetchChunks();
      showToast(`Imported ${imported} chunks ✓`);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // ── System Prompt Template ────────────────────────────────────────────────
  const applyTemplate = (promptKey, template) => {
    if (!window.confirm(`Apply "${template}" template? This will replace the current prompt.`)) return;
    setSettings(s => ({ ...s, [promptKey]: SYSTEM_PROMPT_TEMPLATES[template] || '' }));
  };

  const inputClass = "flex-1 bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/40 focus:bg-white transition-all outline-none";
  const labelClass = "block text-xs font-bold text-on-surface-variant uppercase ml-1 mb-1.5";

  return (
    <>
    <Toast toast={toast} />

    {/* TopNav */}
    <nav className="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-xl shadow-sm flex justify-between items-center px-6 h-16">
      <Link to="/" className="text-xl font-bold tracking-tight text-slate-900 font-headline">Jinn</Link>
      <div className="flex items-center gap-3">
        <Link to="/" className="p-2 hover:bg-slate-100/50 transition-colors rounded-full block">
          <span className="material-symbols-outlined text-slate-500 hover:text-blue-600 transition-colors" data-icon="forum">forum</span>
        </Link>
        <Link to="/settings" className="p-2 hover:bg-slate-100/50 transition-colors rounded-full block">
          <span className="material-symbols-outlined text-blue-600" data-icon="settings">settings</span>
        </Link>
      </div>
    </nav>

    <main className="pt-16 h-screen flex">
      {/* Settings SideNav */}
      <aside className="hidden md:flex flex-col w-[240px] fixed left-0 top-16 bottom-0 bg-[#1A2332] py-6 gap-1">
        <div className="px-5 mb-4">
          <p className="font-manrope uppercase tracking-wider text-[10px] font-bold text-slate-500">Settings</p>
        </div>
        {[
          { href: '#api',       icon: 'hub',         label: 'API Connections' },
          { href: '#ai',        icon: 'smart_toy',   label: 'AI Config' },
          { href: '#knowledge', icon: 'database',    label: 'Knowledge Base' },
        ].map(({ href, icon, label }) => (
          <a key={href} href={href}
            className="mx-3 flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-slate-200 transition-all duration-200 text-[12px] font-bold uppercase tracking-wider font-manrope">
            <span className="material-symbols-outlined text-[18px]" data-icon={icon}>{icon}</span>
            {label}
          </a>
        ))}
        {/* Divider + Back pinned bottom */}
        <div className="mt-auto mx-4 pt-4 border-t border-white/10">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-slate-200 transition-all duration-200 text-[12px] font-bold uppercase tracking-wider font-manrope">
            <span className="material-symbols-outlined text-[18px]" data-icon="arrow_back">arrow_back</span>
            Back to Inbox
          </Link>
        </div>
      </aside>

      {/* Content */}
      <section className="flex-1 ml-0 md:ml-[240px] p-6 md:p-10 max-w-4xl mx-auto space-y-14 h-screen overflow-y-auto custom-scrollbar pb-32">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">Settings</h1>
          <p className="text-on-surface-variant mt-1 text-sm">Manage integrations, AI behaviour, and knowledge base.</p>
        </header>

        {/* ── API Connections ─────────────────────────────────────────── */}
        <div id="api" className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-blue-500" data-icon="hub">hub</span>
            <h2 className="text-lg font-bold uppercase tracking-wide text-slate-600">API Connections</h2>
          </div>

          {/* Social Channels */}
          <div className="bg-surface-container-high rounded-2xl p-6 space-y-5">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Social Channels</h3>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { label: 'WhatsApp Token', key: 'whatsapp_token' },
                { label: 'WhatsApp Phone ID', key: 'whatsapp_phone_number_id' },
                { label: 'Instagram Token', key: 'instagram_token' },
                { label: 'Messenger Page Token', key: 'messenger_page_token' },
              ].map(({ label, key }) => (
                <div key={key} className="space-y-1.5">
                  <label className={labelClass}>{label}</label>
                  <div className="flex gap-2">
                    <PasswordInput
                      className={inputClass}
                      value={settings[key] || ''}
                      onChange={e => setSettings({ ...settings, [key]: e.target.value })}
                    />
                    <button
                      onClick={() => handleSaveField(key, settings[key])}
                      className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shrink-0">
                      Save
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Providers with test buttons */}
          <div className="bg-surface-container-high rounded-2xl p-6 space-y-5">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">AI LLM Providers</h3>
            <div className="grid md:grid-cols-2 gap-5">
              {/* OpenRouter */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <StatusDot status={apiStatus.openrouter} />
                  <label className="text-xs font-bold text-on-surface-variant uppercase">OpenRouter API Key</label>
                </div>
                <div className="flex gap-2">
                  <PasswordInput
                    className={inputClass}
                    value={settings.openrouter_api_key || ''}
                    onChange={e => setSettings({ ...settings, openrouter_api_key: e.target.value })}
                    placeholder="sk-or-v1-…"
                  />
                  <button onClick={() => handleSaveField('openrouter_api_key', settings.openrouter_api_key)}
                    className="bg-blue-600 text-white px-3 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shrink-0">Save</button>
                </div>
                <button
                  onClick={() => testConnection('openrouter')}
                  disabled={apiStatus.openrouter === 'testing'}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors disabled:opacity-50">
                  <span className="material-symbols-outlined text-[14px]" data-icon="wifi_tethering">wifi_tethering</span>
                  {apiStatus.openrouter === 'testing' ? 'Testing…' : 'Test Connection'}
                </button>
              </div>

              {/* Groq */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <StatusDot status={apiStatus.groq} />
                  <label className="text-xs font-bold text-on-surface-variant uppercase">Groq API Key</label>
                </div>
                <div className="flex gap-2">
                  <PasswordInput
                    className={inputClass}
                    value={settings.groq_api_key || ''}
                    onChange={e => setSettings({ ...settings, groq_api_key: e.target.value })}
                    placeholder="gsk_…"
                  />
                  <button onClick={() => handleSaveField('groq_api_key', settings.groq_api_key)}
                    className="bg-blue-600 text-white px-3 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shrink-0">Save</button>
                </div>
                <button
                  onClick={() => testConnection('groq')}
                  disabled={apiStatus.groq === 'testing'}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors disabled:opacity-50">
                  <span className="material-symbols-outlined text-[14px]" data-icon="wifi_tethering">wifi_tethering</span>
                  {apiStatus.groq === 'testing' ? 'Testing…' : 'Test Connection'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── AI Configuration ────────────────────────────────────────── */}
        <div id="ai" className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-blue-500" data-icon="psychology">psychology</span>
            <h2 className="text-lg font-bold uppercase tracking-wide text-slate-600">AI Configuration</h2>
          </div>
          <div className="bg-surface-container-high rounded-2xl p-6 space-y-7">
            {/* Business name + toggle */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-1.5">
                <label className={labelClass}>Business Name</label>
                <input className={inputClass + ' w-full'} type="text" value={settings.business_name || ''}
                  onChange={e => setSettings({ ...settings, business_name: e.target.value })} placeholder="e.g. Hide & Style" />
              </div>
              <div className="flex items-center gap-3 bg-surface-container-low px-4 py-3 rounded-xl self-start md:mt-6">
                <span className="text-sm font-medium text-on-surface">Default AI for new contacts</span>
                <button onClick={() => setSettings(s => ({ ...s, default_ai_enabled: !s.default_ai_enabled }))}
                  className={`relative inline-flex w-11 h-6 rounded-full transition-colors duration-200 ${settings.default_ai_enabled ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                  <span className={`inline-block w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 mt-0.5 ${settings.default_ai_enabled ? 'translate-x-5' : 'translate-x-0.5'}`}></span>
                </button>
              </div>
            </div>

            {/* AI Image Query Toggle */}
            <div className="flex items-start gap-4 bg-amber-50 border border-amber-200 px-4 py-4 rounded-xl">
              <span className="material-symbols-outlined text-amber-500 text-[22px] mt-0.5" data-icon="image_search">image_search</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-800">AI Image Query</p>
                <p className="text-xs text-slate-500 mt-0.5">When <strong>ON</strong>, the AI will visually analyze images sent by customers and match them to your Knowledge Base to answer product questions. When <strong>OFF</strong> (default), any image message automatically routes the chat to <strong>Manual / Needs Human</strong> mode for you to reply personally.</p>
              </div>
              <button onClick={() => setSettings(s => ({ ...s, ai_image_query_enabled: !s.ai_image_query_enabled }))}
                className={`relative inline-flex w-11 h-6 rounded-full transition-colors duration-200 shrink-0 mt-1 ${settings.ai_image_query_enabled ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                <span className={`inline-block w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 mt-0.5 ${settings.ai_image_query_enabled ? 'translate-x-5' : 'translate-x-0.5'}`}></span>
              </button>
            </div>

            {/* System Prompts */}
            {[
              { key: 'ai_system_prompt_messenger', label: 'Messenger System Prompt', icon: 'send',        color: 'text-blue-500' },
              { key: 'ai_system_prompt_whatsapp',  label: 'WhatsApp System Prompt',  icon: 'chat',        color: 'text-green-500' },
              { key: 'ai_system_prompt_instagram', label: 'Instagram System Prompt', icon: 'photo_camera', color: 'text-pink-500' },
            ].map(({ key, label, icon, color }) => (
              <div key={key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`material-symbols-outlined text-[16px] ${color}`} data-icon={icon}>{icon}</span>
                    <label className="text-xs font-bold text-on-surface-variant uppercase">{label}</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <CharCount text={settings[key]} />
                    <select
                      defaultValue=""
                      onChange={e => { if (e.target.value) applyTemplate(key, e.target.value); e.target.value = ''; }}
                      className="text-xs border-none bg-surface-container-highest rounded-lg px-2 py-1 outline-none cursor-pointer text-slate-600 hover:bg-slate-200 transition-colors">
                      <option value="" disabled>Use Template…</option>
                      {Object.keys(SYSTEM_PROMPT_TEMPLATES).map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <textarea
                  className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/40 focus:bg-white transition-all resize-none outline-none"
                  rows={4}
                  placeholder={`System prompt for ${label.split(' ')[0]}…`}
                  value={settings[key] || ''}
                  onChange={e => setSettings({ ...settings, [key]: e.target.value })}
                />
              </div>
            ))}

            <div className="flex justify-end pt-1">
              <button onClick={handleSaveAiConfig} disabled={savingAi}
                className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-colors disabled:opacity-50">
                <span className="material-symbols-outlined text-[18px]" data-icon="save">save</span>
                {savingAi ? 'Saving…' : 'Save AI Configuration'}
              </button>
            </div>
          </div>
        </div>

        {/* ── Quick Replies ────────────────────────────────────────────── */}
        <div id="quick-replies" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-blue-500" data-icon="bolt">bolt</span>
              <h2 className="text-lg font-bold uppercase tracking-wide text-slate-600">Quick Replies</h2>
            </div>
            <button onClick={() => setSettings(s => ({ ...s, canned_responses: [...(s.canned_responses || []), { label: 'New Reply', text: '' }] }))}
              className="flex items-center gap-2 border border-slate-200 bg-white text-slate-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors">
              <span className="material-symbols-outlined text-[16px]" data-icon="add">add</span> Add Reply
            </button>
          </div>
          <div className="bg-surface-container-high rounded-2xl p-6 space-y-4">
            {(settings.canned_responses || []).map((r, i) => (
              <div key={i} className="flex gap-4 items-start bg-white p-4 rounded-xl border border-slate-100 shadow-sm relative">
                <div className="flex-1 space-y-2">
                  <input className={inputClass + ' w-full py-2 font-bold text-slate-700 bg-slate-50'} type="text" value={r.label} placeholder="Short Label (e.g. Shipping)"
                    onChange={e => {
                      const nr = [...settings.canned_responses];
                      nr[i].label = e.target.value;
                      setSettings({ ...settings, canned_responses: nr });
                    }} />
                  <textarea className={inputClass + ' w-full py-2 bg-slate-50'} rows={2} value={r.text} placeholder="Full message text"
                    onChange={e => {
                      const nr = [...settings.canned_responses];
                      nr[i].text = e.target.value;
                      setSettings({ ...settings, canned_responses: nr });
                    }} />
                </div>
                <button onClick={() => {
                  const nr = settings.canned_responses.filter((_, idx) => idx !== i);
                  setSettings({ ...settings, canned_responses: nr });
                }} className="text-slate-400 hover:text-red-500 mt-2 shrink-0">
                  <span className="material-symbols-outlined text-[20px]" data-icon="delete">delete</span>
                </button>
              </div>
            ))}
            {(!settings.canned_responses || settings.canned_responses.length === 0) && (
              <p className="text-sm text-slate-400 text-center py-4">No quick replies yet.</p>
            )}
            <div className="flex justify-end pt-2">
              <button onClick={() => handleSaveField('canned_responses', settings.canned_responses)}
                className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-colors">
                <span className="material-symbols-outlined text-[18px]" data-icon="save">save</span> Save Quick Replies
              </button>
            </div>
          </div>
        </div>

        {/* ── Knowledge Base ──────────────────────────────────────────── */}
        <div id="knowledge" className="space-y-6 pb-20">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="material-symbols-outlined text-blue-500" data-icon="auto_stories">auto_stories</span>
                <h2 className="text-lg font-bold uppercase tracking-wide text-slate-600">Knowledge Base</h2>
              </div>
              <p className="text-sm text-on-surface-variant ml-9">The AI reads this before every reply. Add products, policies, FAQs.</p>
            </div>
            <div className="flex gap-2 items-start">
              <input ref={csvInputRef} type="file" accept=".csv" onChange={handleCsvImport} className="hidden" />
              <button onClick={() => csvInputRef.current?.click()}
                className="flex items-center gap-2 border border-slate-200 bg-white text-slate-600 px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors">
                <span className="material-symbols-outlined text-[16px]" data-icon="upload_file">upload_file</span>
                Import CSV
              </button>
              <button onClick={openAddModal}
                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20">
                <span className="material-symbols-outlined text-[16px]" data-icon="add">add</span>
                Add Chunk
              </button>
            </div>
          </div>

          {/* KB Search */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]" data-icon="search">search</span>
            <input
              className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
              placeholder="Search knowledge base…"
              value={kbSearch}
              onChange={e => setKbSearch(e.target.value)}
            />
          </div>

          <div className="bg-surface-container-high rounded-2xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-highest/60">
                  <th className="px-5 py-3.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Topic</th>
                  <th className="px-5 py-3.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Preview</th>
                  <th className="px-5 py-3.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Size</th>
                  <th className="px-5 py-3.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Updated</th>
                  <th className="px-5 py-3.5 text-right text-[10px] font-bold text-slate-500 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-variant/20">
                {filteredChunks.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-5 py-12 text-center text-slate-400 text-sm">
                      {kbSearch ? 'No chunks match your search.' : 'No knowledge chunks yet. Click "Add Chunk" to get started!'}
                    </td>
                  </tr>
                )}
                {filteredChunks.map(chunk => {
                  const charCount = chunk.content?.length || 0;
                  const tokens = Math.round(charCount / 4);
                  return (
                    <tr key={chunk.id} className="hover:bg-surface-container/50 transition-colors">
                      <td className="px-5 py-3.5 font-semibold text-sm text-slate-700">{chunk.topic}</td>
                      <td className="px-5 py-3.5 text-sm text-slate-400 max-w-xs truncate">{chunk.content?.substring(0, 70)}…</td>
                      <td className="px-5 py-3.5">
                        <span className="bg-blue-50 text-blue-600 text-[9px] font-bold px-2 py-1 rounded-full">~{tokens} tokens</span>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-slate-400">
                        {chunk.updated_at ? new Date(chunk.updated_at).toLocaleDateString() : chunk.created_at ? new Date(chunk.created_at).toLocaleDateString() : '—'}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex justify-end gap-1">
                          <button onClick={() => openEditModal(chunk)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                            <span className="material-symbols-outlined text-[18px]" data-icon="edit">edit</span>
                          </button>
                          <button onClick={() => handleDeleteChunk(chunk.id)}
                            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                            <span className="material-symbols-outlined text-[18px]" data-icon="delete">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>

    {/* Add/Edit Knowledge Chunk Modal */}
    {showModal && (
      <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-lg font-bold">{editingChunk ? 'Edit Knowledge Chunk' : 'Add Knowledge Chunk'}</h3>
            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-700 transition-colors">
              <span className="material-symbols-outlined" data-icon="close">close</span>
            </button>
          </div>
          <div className="p-6 space-y-5">
            <div className="space-y-1.5">
              <label className={labelClass}>Topic</label>
              <input className={inputClass + ' w-full'}
                placeholder="e.g. Shipping Policy, Pricing, Products"
                type="text" value={chunkForm.topic}
                onChange={e => setChunkForm({ ...chunkForm, topic: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className={labelClass}>Content</label>
                <CharCount text={chunkForm.content} limit={4000} />
              </div>
              <textarea
                className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/40 focus:bg-white transition-all resize-none outline-none"
                placeholder="Paste your knowledge base text here. Be as specific as possible — the AI will use this when answering customer questions."
                rows={8} value={chunkForm.content}
                onChange={e => setChunkForm({ ...chunkForm, content: e.target.value })}
              />
            </div>
          </div>
          <div className="p-5 bg-slate-50 flex justify-end gap-2">
            <button onClick={() => setShowModal(false)}
              className="px-5 py-2 rounded-xl text-sm font-semibold text-slate-500 hover:bg-slate-200 transition-colors">Cancel</button>
            <button onClick={handleSaveChunk}
              className="bg-blue-600 text-white px-7 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20">
              Save Chunk
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
