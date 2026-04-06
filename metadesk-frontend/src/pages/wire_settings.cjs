const fs = require('fs');

let content = fs.readFileSync('Settings.jsx', 'utf8');

// 1. Inject imports
content = content.replace(
  "import React from 'react';", 
  "import React, { useState, useEffect } from 'react';\nimport api from '../api';"
);

// 2. Inject State inside the component
const stateInjection = `
  const [settings, setSettings] = useState({
    whatsapp_token: '',
    instagram_token: '',
    messenger_page_token: '',
    openrouter_api_key: '',
    ai_system_prompt_whatsapp: '',
    ai_system_prompt_instagram: '',
    ai_system_prompt_messenger: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    api.get('/settings').then(res => {
      if (res.data.success && res.data.data) {
        setSettings(prev => ({ ...prev, ...res.data.data }));
      }
    });
  }, []);

  const handleSave = async (key, value) => {
    setIsSaving(true);
    try {
      await api.patch('/settings', { [key]: value });
      alert('Saved successfully!');
    } catch (e) {
      alert('Error saving settings. Make sure backend is running.');
    }
    setIsSaving(false);
  };
`;

content = content.replace(
  "export default function Settings() {",
  "export default function Settings() {\n" + stateInjection
);

// 3. Replace token inputs
content = content.replace(
  /<label[^>]*>WhatsApp Token<\/label>\s*<div[^>]*>\s*<input([^>]*)value="[^"]*"\/>\s*<button([^>]*)>Save<\/button>/s,
  `<label className="block text-xs font-bold text-on-surface-variant uppercase ml-1">WhatsApp Token</label>
<div className="flex gap-2">
<input className="flex-1 bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-on-primary-container focus:bg-surface-container-lowest transition-all" type="password" value={settings.whatsapp_token || ''} onChange={(e) => setSettings({...settings, whatsapp_token: e.target.value})} />
<button className="bg-on-primary-container text-white px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity" onClick={() => handleSave('whatsapp_token', settings.whatsapp_token)}>Save</button>`
);

content = content.replace(
  /<label[^>]*>Instagram Token<\/label>\s*<div[^>]*>\s*<input([^>]*)value="[^"]*"\/>\s*<button([^>]*)>Save<\/button>/s,
  `<label className="block text-xs font-bold text-on-surface-variant uppercase ml-1">Instagram Token</label>
<div className="flex gap-2">
<input className="flex-1 bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-on-primary-container focus:bg-surface-container-lowest transition-all" type="password" value={settings.instagram_token || ''} onChange={(e) => setSettings({...settings, instagram_token: e.target.value})} />
<button className="bg-on-primary-container text-white px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity" onClick={() => handleSave('instagram_token', settings.instagram_token)}>Save</button>`
);

content = content.replace(
  /<label[^>]*>Messenger Token<\/label>\s*<div[^>]*>\s*<input([^>]*)value="[^"]*"\/>\s*<button([^>]*)>Save<\/button>/s,
  `<label className="block text-xs font-bold text-on-surface-variant uppercase ml-1">Messenger Token</label>
<div className="flex gap-2">
<input className="flex-1 bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-on-primary-container focus:bg-surface-container-lowest transition-all" type="password" value={settings.messenger_page_token || ''} onChange={(e) => setSettings({...settings, messenger_page_token: e.target.value})} />
<button className="bg-on-primary-container text-white px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity" onClick={() => handleSave('messenger_page_token', settings.messenger_page_token)}>Save</button>`
);

// 4. OpenRouter API Key
content = content.replace(
  /<label[^>]*>OpenRouter API Key<\/label>\s*<div[^>]*>\s*<input([^>]*)value="[^"]*"\/>\s*<button([^>]*)>Save<\/button>/s,
  `<label className="block text-xs font-bold text-on-surface-variant uppercase ml-1">OpenRouter API Key</label>
<div className="flex gap-2"><input className="flex-1 bg-surface-container-low border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-on-primary-container focus:bg-surface-container-lowest transition-all" type="password" value={settings.openrouter_api_key || ''} onChange={(e) => setSettings({...settings, openrouter_api_key: e.target.value})} /><button className="bg-on-primary-container text-white px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity" onClick={() => handleSave('openrouter_api_key', settings.openrouter_api_key)}>Save</button>`
);

// 5. System Prompts
content = content.replace(
  /<textarea([^>]*)>Adopt a vibrant, visual, and highly engaging tone. Use relevant hashtags and interactive language. Focus on brand aesthetics.<\/textarea>/s,
  `<textarea $1 value={settings.ai_system_prompt_instagram || ''} onChange={(e) => setSettings({...settings, ai_system_prompt_instagram: e.target.value})} onBlur={(e) => handleSave('ai_system_prompt_instagram', e.target.value)}></textarea>`
);

content = content.replace(
  /<textarea([^>]*)>Focus on rapid support and utility. Use structured lists where helpful. Be direct and concise.<\/textarea>/s,
  `<textarea $1 value={settings.ai_system_prompt_messenger || ''} onChange={(e) => setSettings({...settings, ai_system_prompt_messenger: e.target.value})} onBlur={(e) => handleSave('ai_system_prompt_messenger', e.target.value)}></textarea>`
);

fs.writeFileSync('Settings.jsx', content);
console.log('API Settings successfully wired up');
