import React, { useState, useEffect, useRef } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

// ─── System Prompt Templates (P4) ────────────────────────────────────────────
export const SYSTEM_PROMPT_TEMPLATES = {
  'Fashion Brand': `You are a helpful AI assistant for a fashion brand. Answer customer questions about products, sizing, styling tips, shipping, and returns. Always be warm, trendy, and enthusiastic. Reply in the same language the customer uses. If they write in Bangla or Banglish, reply in kind.`,
  'General Retail': `You are a helpful customer support agent for a retail business. Answer questions about products, pricing, availability, shipping, and returns. Be professional and concise. Reply in the same language the customer uses.`,
  'Electronics': `You are a knowledgeable tech support assistant for an electronics store. Help customers with product specs, compatibility, warranties, and troubleshooting. Be precise and technical yet easy to understand.`,
  'Food Delivery': `You are a friendly assistant for a food delivery service. Help customers with menu options, order status, delivery times, and complaints. Always be cheerful and resolve issues quickly.`,
};

export default function Inbox() {

  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [cannedResponses, setCannedResponses] = useState([]);
  const [platformFilter, setPlatformFilter] = useState('all');
  const [sortMethod, setSortMethod] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [aiTyping, setAiTyping] = useState(false);
  const [showCanned, setShowCanned] = useState(false);
  const [showJumpToLatest, setShowJumpToLatest] = useState(false);
  const [showMobileChat, setShowMobileChat] = useState(false); // mobile panel toggle
  const [contactNotes, setContactNotes] = useState('');
  const [contactTags, setContactTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [toast, setToast] = useState(null); // { msg, type: 'success'|'error' }
  const scrollContainerRef = useRef(null);
  const prevMessagesLength = useRef(0);
  const prevContactId = useRef(null);

  // ── Toast helper ─────────────────────────────────────────────────────────
  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Auto-scroll: only on new message or contact switch ───────────────────
  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    const isNewContact = selectedContact?.id !== prevContactId.current;
    if (isNewContact || messages.length > prevMessagesLength.current) {
      setTimeout(scrollToBottom, 100);
    }
    prevMessagesLength.current = messages.length;
    prevContactId.current = selectedContact?.id;
  }, [messages, selectedContact]);

  // ── Scroll position → show/hide jump-to-latest button ───────────────────
  const handleChatScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const distFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    setShowJumpToLatest(distFromBottom > 300);
  };

  // ── Polling ───────────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await api.get('/settings');
        if (data.success && data.data) {
          if (data.data.canned_responses) {
            setCannedResponses(data.data.canned_responses);
          }
        }
      } catch (e) {
        console.warn('Could not fetch settings.');
      }
    };

    fetchContacts();
    fetchSettings();
    const interval = setInterval(() => {
      fetchContacts();
      if (selectedContact) {
        api.get(`/contacts/${selectedContact.id}/messages`).then(({ data }) => {
          if (data.success) setMessages(data.data);
        });
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [selectedContact]);

  useEffect(() => {
    if (selectedContact) {
      fetchMessages(selectedContact.id);
      setContactNotes('');
      setContactTags([]);
    }
  }, [selectedContact]);

  const fetchContacts = async () => {
    try {
      const { data } = await api.get('/contacts');
      if (data.success) setContacts(data.data);
    } catch (e) {
      console.warn('Could not fetch contacts.');
    }
  };

  const fetchMessages = async (contactId) => {
    const { data } = await api.get(`/contacts/${contactId}/messages`);
    if (data.success) {
      setMessages(data.data);
      // Optimistically clear the unread_count locally
      setContacts(prev => prev.map(c => c.id === contactId ? { ...c, unread_count: 0 } : c));
    }
  };

  // ── Filter + Sort ─────────────────────────────────────────────────────────
  const getFilteredSortedContacts = () => {
    let list = contacts;
    if (platformFilter === 'needs_human') {
      list = contacts.filter(c => !c.ai_enabled);
    } else if (platformFilter !== 'all') {
      list = contacts.filter(c => c.platform === platformFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(c =>
        (c.display_name || '').toLowerCase().includes(q) ||
        (c.last_message || '').toLowerCase().includes(q)
      );
    }

    switch (sortMethod) {
      case 'unread':
        list = [...list].sort((a, b) => (b.unread_count || 0) - (a.unread_count || 0));
        break;
      case 'ai':
        list = [...list].filter(c => c.ai_enabled);
        break;
      case 'manual':
        list = [...list].filter(c => !c.ai_enabled);
        break;
      default: // newest
        list = [...list].sort((a, b) => new Date(b.last_message_at || 0) - new Date(a.last_message_at || 0));
    }
    return list;
  };

  const filteredContacts = getFilteredSortedContacts();

  const unreadCounts = {
    all: contacts.reduce((s, c) => s + (c.unread_count || 0), 0),
    needs_human: contacts.filter(c => !c.ai_enabled).reduce((s, c) => s + (c.unread_count || 0), 0),
    whatsapp: contacts.filter(c => c.platform === 'whatsapp').reduce((s, c) => s + (c.unread_count || 0), 0),
    instagram: contacts.filter(c => c.platform === 'instagram').reduce((s, c) => s + (c.unread_count || 0), 0),
    messenger: contacts.filter(c => c.platform === 'messenger').reduce((s, c) => s + (c.unread_count || 0), 0),
  };

  // ── AI Toggle ─────────────────────────────────────────────────────────────
  const toggleAi = async () => {
    if (!selectedContact) return;
    const prev = selectedContact;
    const next = !selectedContact.ai_enabled;
    setSelectedContact({ ...selectedContact, ai_enabled: next });
    setContacts(contacts.map(c => c.id === selectedContact.id ? { ...c, ai_enabled: next } : c));
    try {
      await api.patch(`/contacts/${selectedContact.id}`, { ai_enabled: next });
      showToast(next ? '🤖 AI activated for this chat' : '👤 Manual mode – AI paused');
    } catch (e) {
      setSelectedContact(prev);
      setContacts(contacts.map(c => c.id === selectedContact.id ? prev : c));
      showToast('Failed to toggle AI', 'error');
    }
  };

  // ── Send Message ──────────────────────────────────────────────────────────
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const sendMessage = async () => {
    if ((!newMessage.trim() && selectedFiles.length === 0) || !selectedContact) return;
    const tempText = newMessage;
    const tempFiles = [...selectedFiles];
    
    setNewMessage('');
    setSelectedFiles([]);
    setShowCanned(false);
    
    try {
      if (tempFiles.length > 0) {
        // Send each file as a separate message sequentially
        for (let i = 0; i < tempFiles.length; i++) {
          const formData = new FormData();
          // Only attach caption text to the first image
          if (i === 0 && tempText) formData.append('content', tempText);
          formData.append('file', tempFiles[i]);
          await api.post(`/contacts/${selectedContact.id}/messages`, formData);
        }
      } else {
        await api.post(`/contacts/${selectedContact.id}/messages`, { content: tempText, message_type: 'text' });
      }
      fetchMessages(selectedContact.id);
    } catch (e) {
      showToast('Failed to send message', 'error');
      setNewMessage(tempText);
      setSelectedFiles(tempFiles);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      // Capture the FileList into an array BEFORE resetting the input value
      const newFiles = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...newFiles]);
    }
    // Reset input value so the same file can be re-selected if needed
    setTimeout(() => { e.target.value = ''; }, 100);
  };

  const removeSelectedFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // ── Tag helpers ───────────────────────────────────────────────────────────
  const addTag = () => {
    const t = newTag.trim();
    if (t && !contactTags.includes(t)) {
      setContactTags([...contactTags, t]);
      setNewTag('');
    }
  };
  const removeTag = (t) => setContactTags(contactTags.filter(x => x !== t));

  // ── Mobile: open chat panel ───────────────────────────────────────────────
  const openChat = (contact) => {
    setSelectedContact(contact);
    setShowMobileChat(true);
  };

  const backToList = () => {
    setShowMobileChat(false);
  };

  // ── Delete Chat ───────────────────────────────────────────────────────────
  const handleDeleteContact = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this chat? This action cannot be undone.')) return;
    try {
      await api.delete(`/contacts/${id}`);
      showToast('Chat deleted successfully');
      setContacts(contacts.filter(c => c.id !== id));
      if (selectedContact && selectedContact.id === id) {
        setSelectedContact(null);
        setMessages([]);
        setShowMobileChat(false);
      }
    } catch (e) {
      showToast('Failed to delete chat', 'error');
    }
  };

  // ── Contact Setting Overrides ───────────────────────────────────────────────
  const handleUpdateContactDelay = async (e) => {
    if (!selectedContact) return;
    let raw = e.target.value;
    let delayVal = raw === '' ? null : parseInt(raw);

    const prev = { ...selectedContact };
    setSelectedContact({ ...selectedContact, ai_response_delay: delayVal });
    
    try {
      const { data } = await api.patch(`/contacts/${selectedContact.id}`, { ai_response_delay: delayVal });
      if (data.success) {
        setContacts(contacts.map(c => c.id === selectedContact.id ? { ...c, ai_response_delay: delayVal } : c));
        // Optional: showToast('Delay updated');
      }
    } catch (e) {
      setSelectedContact(prev);
      setContacts(contacts.map(c => c.id === prev.id ? prev : c));
      showToast('Failed to update delay', 'error');
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>

    {/* ── Toast ── */}
    {toast && (
      <div className={`fixed bottom-6 right-6 z-[200] flex items-center gap-2 px-5 py-3 rounded-2xl shadow-xl font-semibold text-sm text-white transition-all duration-300
        ${toast.type === 'error' ? 'bg-red-500' : 'bg-emerald-500'}`}>
        <span className="material-symbols-outlined text-[18px]" data-icon={toast.type === 'error' ? 'error' : 'check_circle'}>
          {toast.type === 'error' ? 'error' : 'check_circle'}
        </span>
        {toast.msg}
      </div>
    )}

    {/* ── AI Typing Indicator CSS ── */}
    <style>{`
      @keyframes typingPulse {
        0%, 60%, 100% { transform: scale(1); opacity: 0.4; }
        30% { transform: scale(1.4); opacity: 1; }
      }
      .ai-dot { width:8px; height:8px; border-radius:50%; background:#94a3b8; display:inline-block; animation: typingPulse 1.4s infinite; }
      .ai-dot:nth-child(2) { animation-delay: 0.2s; }
      .ai-dot:nth-child(3) { animation-delay: 0.4s; }

      @keyframes slideInRight {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
      }
      .slide-in { animation: slideInRight 0.25s ease; }
    `}</style>

    {/* ── TopNavBar ── */}
    <header className="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-xl shadow-sm flex justify-between items-center px-4 md:px-6 h-16">
      <div className="flex items-center gap-2">
        <Link to="/"><span className="text-xl font-bold tracking-tight text-slate-900 font-headline">Jinn</span></Link>
      </div>
      <nav className="hidden md:flex items-center gap-6 font-manrope text-sm font-medium">
        <span className="text-blue-600 font-semibold">{contacts.length} conversations</span>
        <span className="text-slate-500">{contacts.filter(c => c.ai_enabled).length} AI-handled</span>
      </nav>
      <div className="flex items-center gap-3">
        <button className="p-2 text-slate-500 hover:bg-slate-100/50 transition-colors rounded-full">
          <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
        </button>
        <Link to="/settings" className="p-2 hover:bg-slate-100/50 transition-colors rounded-full block">
          <span className="material-symbols-outlined text-slate-500 hover:text-blue-600 transition-colors" data-icon="settings">settings</span>
        </Link>
      </div>
    </header>

    {/* ── Main Layout ── */}
    <main className="flex-1 mt-16 flex overflow-hidden h-[calc(100vh-64px)]">

      {/* ── Left Sidebar (hidden on mobile, shown as bottom tabs) ── */}
      <aside className="hidden md:flex h-full w-[240px] shrink-0 bg-[#1A2332] flex-col py-4 gap-0 z-40">
        <div className="px-4 mb-3">
          <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all duration-200">
            <span className="material-symbols-outlined text-sm" data-icon="add">add</span>
            NEW MESSAGE
          </button>
        </div>
        <nav className="flex flex-col font-manrope uppercase tracking-wider text-[11px] font-bold">
          {[
            { key: 'all',         icon: 'forum',        label: 'All Chats',    color: 'blue',   badge: unreadCounts.all },
            { key: 'needs_human', icon: 'front_hand',   label: 'Needs Human',  color: 'orange', badge: unreadCounts.needs_human },
            { key: 'messenger',   icon: 'send',         label: 'Messenger',    color: 'blue',   badge: unreadCounts.messenger },
            { key: 'whatsapp',    icon: 'chat',         label: 'WhatsApp',     color: 'green',  badge: unreadCounts.whatsapp },
            { key: 'instagram',   icon: 'photo_camera', label: 'Instagram',    color: 'pink',   badge: unreadCounts.instagram },
            { key: 'archived',    icon: 'archive',      label: 'Archived',     color: 'slate',  badge: 0 },
          ].map(({ key, icon, label, color, badge }) => {
            const isActive = platformFilter === key;
            const activeStyle = {
              blue:   'bg-blue-600/10 text-blue-400 border-r-2 border-blue-500',
              orange: 'bg-orange-600/10 text-orange-400 border-r-2 border-orange-500',
              green:  'bg-green-600/10 text-green-400 border-r-2 border-green-500',
              pink:   'bg-pink-600/10 text-pink-400 border-r-2 border-pink-500',
              slate:  'bg-slate-600/10 text-slate-300 border-r-2 border-slate-400',
            }[color];
            const iconColor = { blue: 'text-blue-400', orange: 'text-orange-400', green: 'text-green-400', pink: 'text-pink-400', slate: 'text-slate-400' }[color];
            return (
              <button key={key} onClick={() => setPlatformFilter(key)}
                className={`px-4 py-3.5 flex items-center justify-between transition-all duration-200 text-left ${isActive ? activeStyle : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}>
                <div className="flex items-center gap-3">
                  <span className={`material-symbols-outlined text-[18px] ${isActive ? '' : iconColor}`} data-icon={icon}>{icon}</span>
                  {label}
                </div>
                {badge > 0 && <span className={`bg-${color}-500 text-white rounded-full px-1.5 py-0.5 text-[9px] leading-none`}>{badge}</span>}
              </button>
            );
          })}
        </nav>
        {/* ── Divider + Settings pinned at bottom ── */}
        <div className="mt-auto">
          <div className="mx-4 border-t border-white/10 mb-2"></div>
          <Link to="/settings"
            className="px-4 py-3.5 flex items-center gap-3 text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all font-manrope uppercase tracking-wider text-[11px] font-bold">
            <span className="material-symbols-outlined text-[18px]" data-icon="settings">settings</span>
            Settings
          </Link>
        </div>
      </aside>

      {/* ── Panel 2: Conversation List ── */}
      {/* On mobile: visible when !showMobileChat. On desktop: always visible. */}
      <section className={`
        ${showMobileChat ? 'hidden md:flex' : 'flex'}
        flex-col w-full md:w-[320px] shrink-0 bg-surface-container-low border-r border-outline-variant/20
      `}>
        {/* Search + Sort */}
        <div className="p-3 space-y-2">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]" data-icon="search">search</span>
            <input
              className="w-full bg-surface-container-lowest border-none rounded-xl py-2 pl-9 pr-3 text-sm focus:ring-2 focus:ring-blue-500/40 outline-none"
              placeholder="Search conversations..."
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={sortMethod}
              onChange={e => setSortMethod(e.target.value)}
              className="flex-1 bg-surface-container-lowest border-none rounded-xl py-1.5 px-3 text-xs font-semibold text-on-surface-variant focus:ring-2 focus:ring-blue-500/40 outline-none cursor-pointer"
            >
              <option value="newest">🕒 Newest First</option>
              <option value="unread">🔵 Unread First</option>
              <option value="ai">🤖 AI Handled</option>
              <option value="manual">👤 Manual Only</option>
            </select>
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {filteredContacts.length === 0 && (
            <div className="text-center text-outline text-sm mt-16 px-4">No conversations match your filter.</div>
          )}
          {filteredContacts.map(contact => {
            const isUnread = (contact.unread_count || 0) > 0;
            const preview = contact.last_message
              ? (contact.last_message.length > 60 ? contact.last_message.substring(0, 60) + '…' : contact.last_message)
              : 'New Contact';
            const isSelected = selectedContact?.id === contact.id;
            const platformIcon = { whatsapp: { icon: 'chat', color: 'text-green-500' }, messenger: { icon: 'send', color: 'text-blue-500' }, instagram: { icon: 'photo_camera', color: 'text-pink-500' } }[contact.platform] || { icon: 'forum', color: 'text-slate-400' };

            const needsManual = !contact.ai_enabled;
            let bgClass = '';
            if (needsManual) {
              bgClass = isSelected ? 'bg-red-100 ring-1 ring-red-300' : 'bg-red-50/80 hover:bg-red-100 border border-red-100';
            } else {
              bgClass = isSelected ? 'bg-blue-50 ring-1 ring-blue-200' : 'bg-transparent hover:bg-slate-50 border border-transparent';
            }

            return (
              <div key={contact.id} onClick={() => openChat(contact)}
                className={`p-3 mx-2 rounded-xl mb-1.5 cursor-pointer transition-all duration-200 relative ${bgClass}`}>
                <div className="flex gap-3 items-center">
                  <div className="relative shrink-0">
                    {contact.profile_picture_url ? (
                      <img src={contact.profile_picture_url} alt={contact.display_name} className="w-11 h-11 rounded-full object-cover shadow-sm bg-slate-100" />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-base shadow-sm">
                        {(contact.display_name || '?').substring(0, 1).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center gap-1 mb-0.5">
                      <h4 className={`text-[13px] truncate flex items-center gap-1.5 ${isUnread ? 'font-extrabold text-slate-900' : 'font-semibold text-slate-700'}`}>
                        {contact.ai_enabled && (
                          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)] shrink-0"></span>
                        )}
                        <span className="truncate">{contact.display_name || contact.platform_user_id}</span>
                      </h4>
                      <div className="flex items-center gap-2 shrink-0">
                        {isUnread && (
                          <div className="bg-blue-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center leading-none">
                            {contact.unread_count}
                          </div>
                        )}
                        <span className={`text-[10px] ${isUnread ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>
                          {contact.last_message_at ? new Date(contact.last_message_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`material-symbols-outlined text-[13px] ${platformIcon.color}`} data-icon={platformIcon.icon}>{platformIcon.icon}</span>
                      <p className={`text-[12px] truncate ${isUnread ? 'text-slate-700 font-medium' : 'text-slate-500'}`}>{preview}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Bottom Nav */}
        <nav className="md:hidden flex border-t border-outline-variant/20 bg-[#1A2332]">
          {[
            { key: 'all',         icon: 'forum',        badge: unreadCounts.all },
            { key: 'needs_human', icon: 'front_hand',   badge: unreadCounts.needs_human },
            { key: 'messenger',   icon: 'send',         badge: unreadCounts.messenger },
            { key: 'whatsapp',    icon: 'chat',         badge: unreadCounts.whatsapp },
            { key: 'instagram',   icon: 'photo_camera', badge: unreadCounts.instagram },
          ].map(({ key, icon, badge }) => (
            <button key={key} onClick={() => setPlatformFilter(key)}
              className={`flex-1 py-3 flex flex-col items-center gap-0.5 transition-colors relative
                ${platformFilter === key ? 'text-blue-400' : 'text-slate-500 hover:text-slate-300'}`}>
              <span className="material-symbols-outlined text-[20px]" data-icon={icon}>{icon}</span>
              {badge > 0 && (
                <span className="absolute top-1 right-2 bg-blue-500 text-white text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full">{badge}</span>
              )}
            </button>
          ))}
          <Link to="/settings" className="flex-1 py-3 flex flex-col items-center gap-0.5 text-slate-500 hover:text-slate-300">
            <span className="material-symbols-outlined text-[20px]" data-icon="settings">settings</span>
          </Link>
        </nav>
      </section>

      {/* ── Panel 3: Chat Window ── */}
      {/* On mobile: visible only when showMobileChat. On desktop: always visible. */}
      <section className={`
        ${showMobileChat ? 'flex slide-in' : 'hidden md:flex'}
        flex-1 flex-col bg-white overflow-hidden relative
      `}>
        {/* Chat Header */}
        <header className="h-16 px-4 md:px-6 flex items-center justify-between shadow-sm z-10 shrink-0 bg-white border-b border-slate-100">
          {selectedContact ? (
            <>
              <div className="flex items-center gap-3">
                {/* Back button on mobile */}
                <button onClick={backToList} className="md:hidden p-1 text-slate-500 hover:text-blue-600 transition-colors mr-1">
                  <span className="material-symbols-outlined" data-icon="arrow_back">arrow_back</span>
                </button>
                {selectedContact.profile_picture_url ? (
                  <img src={selectedContact.profile_picture_url} alt="Profile" className="w-9 h-9 rounded-full object-cover shrink-0 border border-slate-100" />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {(selectedContact.display_name || '?').substring(0, 1).toUpperCase()}
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-sm">{selectedContact.display_name || selectedContact.platform_user_id}</h3>
                  <div className="flex items-center gap-1.5">
                    {selectedContact.platform === 'whatsapp' && <span className="material-symbols-outlined text-[12px] text-green-500" data-icon="chat">chat</span>}
                    {selectedContact.platform === 'messenger' && <span className="material-symbols-outlined text-[12px] text-blue-500" data-icon="send">send</span>}
                    {selectedContact.platform === 'instagram' && <span className="material-symbols-outlined text-[12px] text-pink-500" data-icon="photo_camera">photo_camera</span>}
                    <span className="text-[10px] text-slate-400 uppercase tracking-wide">{selectedContact.platform}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {/* Pill AI Toggle (P3.13) */}
                <button
                  onClick={toggleAi}
                  title={selectedContact.ai_enabled ? 'Click to pause AI and switch to manual mode' : 'Click to activate AI for this chat'}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full font-bold text-xs transition-all duration-200 shadow-sm
                    ${selectedContact.ai_enabled
                      ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                      : 'bg-slate-200 text-slate-600 hover:bg-slate-300'}`}>
                  <span>{selectedContact.ai_enabled ? '🤖' : '👤'}</span>
                  {selectedContact.ai_enabled ? 'AI Active' : 'Manual'}
                </button>
                <button onClick={() => handleDeleteContact(selectedContact.id)} className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors" title="Delete Chat">
                  <span className="material-symbols-outlined text-[20px]" data-icon="delete">delete</span>
                </button>
                <button className="p-1.5 text-slate-400 hover:text-slate-700 transition-colors">
                  <span className="material-symbols-outlined text-[20px]" data-icon="more_vert">more_vert</span>
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3 text-slate-400">
              <span className="material-symbols-outlined" data-icon="forum">forum</span>
              <p className="text-sm">Select a conversation to start</p>
            </div>
          )}
        </header>

        {/* Conversation Body */}
        <div
          ref={scrollContainerRef}
          onScroll={handleChatScroll}
          className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-4 custom-scrollbar bg-slate-50/50"
        >
          {!selectedContact && (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-3 mt-20">
              <span className="material-symbols-outlined text-[48px]" data-icon="forum">forum</span>
              <p className="text-sm font-medium">Pick a conversation from the left</p>
            </div>
          )}
          {messages.map((msg, index) => {
            const isSystemMsg = msg.sender_type === 'system' || (msg.sender_type === 'ai' && (msg.content?.startsWith('🤖 System Error') || msg.content?.startsWith('🤖 AI could not')));
            if (isSystemMsg) {
              return (
                <div key={msg.id || index} className="self-center my-4 text-center max-w-sm bg-slate-100 px-4 py-2 rounded-2xl border border-slate-200 shadow-sm">
                  <p className="text-xs font-semibold text-slate-600 flex items-center justify-center gap-1.5 text-left">
                    <span className="material-symbols-outlined text-[14px]">info</span>
                    {msg.content}
                  </p>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    {msg.created_at ? new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                  </span>
                </div>
              );
            }

            const isOut = msg.direction === 'outbound';
            return (
              <div key={msg.id || index} className={`flex ${isOut ? 'justify-end' : 'justify-start'} gap-2 max-w-[82%] ${isOut ? 'self-end' : 'self-start'}`}>
                {!isOut && (
                  selectedContact?.profile_picture_url ? (
                    <img src={selectedContact.profile_picture_url} alt="Profile" className="w-7 h-7 rounded-full object-cover mt-1 shrink-0 border border-slate-100" />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 flex items-center justify-center mt-1 shrink-0 text-white font-bold text-xs">
                      {(selectedContact?.display_name || '?').substring(0, 1).toUpperCase()}
                    </div>
                  )
                )}
                <div className={`flex flex-col ${isOut ? 'items-end' : 'items-start'}`}>
                  <div className={`px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed whitespace-pre-wrap ${!msg.content && msg.media_url ? 'bg-transparent shadow-none p-0' :
                    isOut
                      ? 'bg-blue-600 text-white rounded-br-sm'
                      : 'bg-white text-slate-800 rounded-bl-sm border border-slate-100'}`}>
                    {/* If the media_url is a real URL from Meta, render the attachment */}
                    {msg.message_type === 'image' && msg.media_url && !msg.media_url.startsWith('[File Sent:') && (
                      <div className={`${msg.content ? 'mb-2' : ''} rounded-xl overflow-hidden shadow-sm`}>
                        <img src={msg.media_url} alt="Attachment" className="max-w-64 max-h-64 object-cover cursor-pointer hover:opacity-95 transition-opacity" onClick={() => window.open(msg.media_url, '_blank')} />
                      </div>
                    )}
                    {(msg.message_type === 'video' || msg.message_type === 'audio' || msg.message_type === 'document') && msg.media_url && !msg.media_url.startsWith('[File Sent:') && (
                      <div className={`${msg.content ? 'mb-2' : ''} p-3 rounded-xl flex items-center gap-2 ${isOut ? 'bg-blue-700/50 text-white' : 'bg-slate-100 text-slate-700'}`}>
                        <span className="material-symbols-outlined text-[20px]" data-icon="insert_drive_file">insert_drive_file</span>
                        <a href={msg.media_url} target="_blank" rel="noopener noreferrer" className="underline truncate max-w-[150px] font-medium block">View Attachment</a>
                      </div>
                    )}

                    {/* If the media_url is just a local placeholder for an outbound file, display the string */}
                    {msg.media_url && msg.media_url.startsWith('[File Sent:') && (
                      <div className={`p-2.5 rounded-xl flex items-center gap-2 mb-1.5 ${isOut ? 'bg-blue-700/50' : 'bg-slate-100'}`}>
                         <span className="material-symbols-outlined text-[16px]" data-icon="attachment">attachment</span>
                         <span className="text-sm italic opacity-90 truncate">{msg.media_url.replace('[File Sent: ', '').replace(']', '')}</span>
                      </div>
                    )}
                    {msg.content}
                  </div>
                  {/* AI badge (P3.10) */}
                  {msg.sender_type === 'ai' && (
                    <div className="flex items-center gap-1 mt-1 px-2 py-0.5 bg-emerald-50 border border-emerald-200 rounded-full w-fit">
                      <span className="text-emerald-600 text-[10px]">🤖</span>
                      <span className="text-[9px] font-bold text-emerald-700 uppercase tracking-wide">AI</span>
                    </div>
                  )}
                  <span className={`text-[11px] text-slate-400 mt-1 ${isOut ? 'mr-1' : 'ml-1'}`}>
                    {msg.created_at ? new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                  </span>
                </div>
              </div>
            );
          })}

          {/* AI Typing Indicator (P2.5) */}
          {aiTyping && (
            <div className="flex justify-start gap-2 self-start">
              <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 text-white text-xs">🤖</div>
              <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex items-center gap-1.5">
                <span className="ai-dot"></span>
                <span className="ai-dot"></span>
                <span className="ai-dot"></span>
              </div>
            </div>
          )}

          {messages.length === 0 && selectedContact && !aiTyping && (
            <div className="text-center text-slate-400 text-sm mt-10">No messages yet. Say hello! 👋</div>
          )}
        </div>

        {/* Jump to Latest button (P3.11) */}
        {showJumpToLatest && (
          <button
            onClick={() => { scrollToBottom(); setShowJumpToLatest(false); }}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 animate-bounce">
            <span className="material-symbols-outlined text-[14px]" data-icon="expand_more">expand_more</span>
            Latest
          </button>
        )}

        {/* AI Banner */}
        {selectedContact?.ai_enabled && (
          <div className="bg-emerald-50 border-t border-emerald-100 px-4 py-1.5 flex items-center gap-2 shrink-0">
            <span className="text-emerald-600 text-sm">🤖</span>
            <p className="text-xs font-medium text-emerald-700">AI is handling this conversation. You can still send manual messages.</p>
          </div>
        )}

        {/* Message Composer */}
        <footer className="p-3 bg-white border-t border-slate-100 shrink-0 relative">
          {/* Canned Responses dropdown (P3.12) */}
          {showCanned && (
            <div className="absolute bottom-full left-0 right-0 mx-3 mb-1 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-30">
              <div className="px-4 py-2 border-b border-slate-50">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Quick Replies</p>
              </div>
              {cannedResponses.map((r, i) => (
                <button key={i} onClick={() => { setNewMessage(r.text); setShowCanned(false); }}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 transition-colors border-b border-slate-50 last:border-0">
                  <span className="font-semibold text-slate-700">{r.label}</span>
                  <p className="text-xs text-slate-400 truncate mt-0.5">{r.text}</p>
                </button>
              ))}
            </div>
          )}
          <div className="flex flex-col gap-2 relative">
            {selectedFiles.length > 0 && (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-2 mx-3 flex flex-wrap gap-2">
                {selectedFiles.map((file, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs max-w-[160px]">
                    <span className="material-symbols-outlined text-[14px] text-blue-500" data-icon={file.type.startsWith('image/') ? 'image' : 'attach_file'}>
                      {file.type.startsWith('image/') ? 'image' : 'attach_file'}
                    </span>
                    <span className="truncate text-slate-700 flex-1">{file.name}</span>
                    <button onClick={() => removeSelectedFile(idx)} className="text-slate-300 hover:text-red-500 shrink-0 transition-colors">
                      <span className="material-symbols-outlined text-[14px]" data-icon="close">close</span>
                    </button>
                  </div>
                ))}
                <span className="text-[10px] text-slate-400 self-center ml-1">{selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''} selected</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              {/* Canned responses trigger */}
              <button onClick={() => setShowCanned(s => !s)} disabled={!selectedContact}
                className={`p-2 rounded-xl transition-colors disabled:opacity-40
                  ${showCanned ? 'bg-blue-100 text-blue-600' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
                title="Quick replies">
                <span className="material-symbols-outlined text-[20px]" data-icon="bolt">bolt</span>
              </button>
              
              <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileSelect} multiple accept="image/*,video/*,audio/*,application/*" />
              
              <button 
                className={`p-2 rounded-xl transition-colors disabled:opacity-40 ${selectedFiles.length > 0 ? 'text-blue-600 bg-blue-50' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`} 
                onClick={() => fileInputRef.current?.click()}
                disabled={!selectedContact}>
                <span className="material-symbols-outlined text-[20px]" data-icon="attach_file">attach_file</span>
              </button>
              
              <div className="flex-1 bg-slate-100 rounded-2xl flex items-center px-4 py-2">
                <input
                  className="flex-1 bg-transparent border-none focus:ring-0 text-sm disabled:opacity-50 outline-none"
                  placeholder={selectedContact ? 'Type a message…' : 'Select a conversation first'}
                  type="text"
                  value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) sendMessage(); }}
                disabled={!selectedContact}
              />
              <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
                <span className="material-symbols-outlined text-[18px]" data-icon="sentiment_satisfied">sentiment_satisfied</span>
              </button>
            </div>
            <button onClick={sendMessage} disabled={!selectedContact || (!newMessage.trim() && selectedFiles.length === 0)}
              className="w-10 h-10 bg-blue-600 text-white disabled:bg-slate-200 disabled:text-slate-400 rounded-full flex items-center justify-center shadow-md hover:scale-105 hover:bg-blue-700 transition-all duration-200 cursor-pointer shrink-0">
              <span className="material-symbols-outlined text-[18px]" data-icon="send">send</span>
            </button>
          </div>
        </div>
        </footer>
      </section>

      {/* ── Right Panel: Contact Details (P3.9) ── */}
      <aside className="hidden lg:flex w-[280px] shrink-0 flex-col bg-white border-l border-slate-100 overflow-y-auto custom-scrollbar">
        {selectedContact ? (
          <>
            {/* Avatar + Name */}
            <div className="p-6 flex flex-col items-center text-center border-b border-slate-100">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 mb-3 flex items-center justify-center text-white text-3xl font-bold shadow">
                {(selectedContact.display_name || '?').substring(0, 1).toUpperCase()}
              </div>
              <h2 className="font-bold text-base">{selectedContact.display_name || 'Unknown'}</h2>
              <div className="flex items-center gap-1.5 mt-1">
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase
                  ${selectedContact.platform === 'whatsapp' ? 'bg-green-100 text-green-700'
                  : selectedContact.platform === 'messenger' ? 'bg-blue-100 text-blue-700'
                  : 'bg-pink-100 text-pink-700'}`}>
                  {selectedContact.platform}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase
                  ${selectedContact.ai_enabled ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                  {selectedContact.ai_enabled ? '🤖 AI' : '👤 Manual'}
                </span>
              </div>
            </div>

            {/* Timestamps */}
            <div className="px-5 py-3 border-b border-slate-100 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-semibold uppercase tracking-wide text-[10px]">First Message</span>
                <span className="text-slate-600">{selectedContact.created_at ? new Date(selectedContact.created_at).toLocaleDateString() : '—'}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-semibold uppercase tracking-wide text-[10px]">Last Active</span>
                <span className="text-slate-600">{selectedContact.last_message_at ? new Date(selectedContact.last_message_at).toLocaleDateString() : '—'}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-semibold uppercase tracking-wide text-[10px]">Messages</span>
                <span className="text-slate-600 font-bold">{messages.length}</span>
              </div>
            </div>

            {/* Tags (P3.9) */}
            <div className="px-5 py-3 border-b border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Tags</p>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {contactTags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="hover:text-red-500 transition-colors leading-none">×</button>
                  </span>
                ))}
              </div>
              <div className="flex gap-1">
                <input
                  className="flex-1 text-xs bg-slate-100 border-none rounded-lg px-2 py-1.5 outline-none focus:ring-1 focus:ring-blue-400"
                  placeholder="+ Add tag…"
                  value={newTag}
                  onChange={e => setNewTag(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') addTag(); }}
                />
                <button onClick={addTag} className="bg-blue-600 text-white text-[10px] font-bold px-2 rounded-lg hover:bg-blue-700 transition-colors">Add</button>
              </div>
            </div>

            {/* AI Response Delay (per-contact override) */}
            <div className="px-5 py-3 border-b border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">AI Response Delay</p>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  className="w-16 text-xs text-center font-mono bg-slate-100 border-none rounded-lg px-2 py-1.5 outline-none focus:ring-1 focus:ring-blue-400"
                  placeholder="Global"
                  value={selectedContact.ai_response_delay ?? ''}
                  onChange={e => setSelectedContact({ ...selectedContact, ai_response_delay: e.target.value === '' ? null : parseInt(e.target.value) })}
                />
                <span className="text-[10px] text-slate-500 font-medium">seconds</span>
                <button
                  onClick={async () => {
                    if (!selectedContact) return;
                    const delayVal = selectedContact.ai_response_delay;
                    try {
                      const { data } = await api.patch(`/contacts/${selectedContact.id}`, { ai_response_delay: delayVal });
                      if (data.success) {
                        setContacts(contacts.map(c => c.id === selectedContact.id ? { ...c, ai_response_delay: delayVal } : c));
                        showToast('Delay saved ✓');
                      }
                    } catch (err) {
                      showToast('Failed to save delay', 'error');
                    }
                  }}
                  className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors shrink-0"
                >Save</button>
              </div>
              <p className="text-[9px] text-slate-400 mt-1">Leave blank to use the global setting from Settings.</p>
            </div>

            {/* Internal Notes (P3.9) */}
            <div className="px-5 py-3 border-b border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Internal Notes</p>
              <textarea
                className="w-full text-xs bg-slate-100 border-none rounded-xl px-3 py-2 outline-none focus:ring-1 focus:ring-blue-400 resize-none"
                rows={3}
                placeholder="Agent-only notes (not sent to customer)…"
                value={contactNotes}
                onChange={e => setContactNotes(e.target.value)}
              />
            </div>

            {/* Quick Actions (P3.9) */}
            <div className="px-5 py-3 border-b border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Quick Actions</p>
              <div className="space-y-1.5">
                <button onClick={() => setNewMessage('Here is our product catalog: [link]')}
                  className="w-full text-left text-xs font-semibold py-2 px-3 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                  📋 Send Catalog
                </button>
                <button onClick={() => setNewMessage('Your order update: [order details]')}
                  className="w-full text-left text-xs font-semibold py-2 px-3 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                  📦 Order Update
                </button>
                <button onClick={() => setNewMessage('Click here to complete your payment: [payment link]')}
                  className="w-full text-left text-xs font-semibold py-2 px-3 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                  🔗 Payment Link
                </button>
              </div>
            </div>

            {/* Mark Resolved */}
            <div className="px-5 py-4 mt-auto">
              <button className="w-full py-2 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 text-xs font-bold rounded-xl transition-colors">
                ✓ Mark as Resolved
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-2 p-6 text-center">
            <span className="material-symbols-outlined text-[40px]" data-icon="person">person</span>
            <p className="text-xs">Select a conversation to see contact details</p>
          </div>
        )}
      </aside>

    </main>

    </>
  );
}
