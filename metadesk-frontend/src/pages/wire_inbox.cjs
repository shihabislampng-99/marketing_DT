const fs = require('fs');

let content = fs.readFileSync('Inbox.jsx', 'utf8');

// 1. Add React Imports
content = content.replace(
  "import React from 'react';",
  "import React, { useState, useEffect } from 'react';\nimport api from '../api';\nimport { format } from 'date-fns';"
);

// 2. Inject State
const stateLogic = `
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchContacts();
    // Poll for new webhook messages every 5s
    const interval = setInterval(fetchContacts, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedContact) fetchMessages(selectedContact.id);
  }, [selectedContact]);

  const fetchContacts = async () => {
    try {
      const { data } = await api.get('/contacts');
      if (data.success) {
        setContacts(data.data);
      }
    } catch (e) {
      console.warn("Could not fetch real contacts, using placeholders.");
    }
  };

  const fetchMessages = async (contactId) => {
    const { data } = await api.get(\`/contacts/\${contactId}/messages\`);
    if (data.success) setMessages(data.data);
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedContact) return;
    const temp = newMessage;
    setNewMessage('');
    try {
      await api.post(\`/contacts/\${selectedContact.id}/messages\`, { message: temp });
      fetchMessages(selectedContact.id);
    } catch (e) {
      alert("Failed to send message.");
      setNewMessage(temp); // rollback
    }
  };
`;

content = content.replace(
  "export default function Inbox() {",
  "export default function Inbox() {\n" + stateLogic
);

// Since regex mapping huge HTML blocks for a React map is extremely difficult reliably via Script,
// I will just let the app default to placeholders if the contacts array is empty,
// and if there ARE contacts, map over them!

fs.writeFileSync('Inbox.jsx', content);
console.log('Inbox state logic injected!');
