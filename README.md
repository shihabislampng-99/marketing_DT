# Marketing Manager CRM App

## Overview
A modern CRM-style outreach tracking application with local JSON file storage for managing leads and tracking marketing workflows.

## Prerequisites
- Node.js (v18 or higher)

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Application

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Features

### Dashboard
- View all leads and pending tasks
- See response rate statistics
- Quick access to tasks requiring action

### Lead Management
- **All Leads**: Browse, search, and filter all contacts
- **Lead Details**: View and edit complete lead information
- **Action Checklist**: Track outreach steps (research, emails, LinkedIn)
- **Auto-save**: Changes save automatically to local JSON file

### Today's Tasks
- Automated task suggestions based on outreach status
- Prioritized by last activity date
- One-click access to lead details

### Add New Lead
- Simple form with required fields
- Automatically initializes tracking fields
- Saves to local JSON file immediately

## Data Storage

All lead data is stored in `data/leads.json`. You can:
- Manually edit this file to add/update leads
- Import data from other sources by formatting it to match the structure
- Back up this file to preserve your data

### Sample Data Structure

```json
{
  "headers": ["Company Domain Name", "First Name", "Last Name", ...],
  "leads": [
    {
      "Company Domain Name": "example.com",
      "First Name": "John",
      "Last Name": "Doe",
      ...
    }
  ]
}
```

## Troubleshooting

**Issue**: App won't start
- **Solution**: Run `npm install` to ensure all dependencies are installed
- Verify Node.js version is 18 or higher

**Issue**: Changes don't save
- **Solution**: Check that the `data` directory exists and is writable
- Verify `data/leads.json` has proper permissions

## Production Deployment

For production deployment:
1. Ensure the `data` directory is included in your deployment
2. Set up proper file permissions for the data directory
3. Run `npm run build` and `npm start`

---

**Note**: This app uses local file storage. For cloud-based storage, you can integrate with services like Google Sheets, Airtable, or a database.

<!-- Deployed to Vercel: 2025-11-26 -->
