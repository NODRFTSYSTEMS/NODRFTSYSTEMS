/**
 * NoDrftSystems — Website Form Endpoint
 * Google Apps Script Web App
 *
 * Handles all public form submissions from nodrftsystems.com.
 * Receives POST from: Start an Engagement, Inquiries, Careers, Onboarding, Intake.
 * Emails each submission to the correct mailbox.
 * Logs every submission to a Google Sheet.
 *
 * SETUP (one time):
 * 1. Open script.google.com — create a new project, paste this file.
 * 2. Run initSheet() once to create the log sheet.
 * 3. Deploy: Deploy → New deployment → Web App
 *    - Execute as: Me (admin@nodrftsystems.com)
 *    - Who has access: Anyone
 * 4. Copy the Web App URL.
 * 5. Paste it into index.html meta tags for each form endpoint.
 *    (All 5 meta tags can use the same URL — routing is handled here by form-kind.)
 */

// ─── CONFIG ───────────────────────────────────────────────────────────────────

const CONFIG = {
  // Paste your Google Sheet ID here after running initSheet()
  // Sheet URL: https://docs.google.com/spreadsheets/d/SHEET_ID/edit
  SHEET_ID: '',
  SHEET_NAME: 'Submissions',

  // Email routing by form kind
  ROUTING: {
    engagement:  'sales@nodrftsystems.com',
    inquiry:     'info@nodrftsystems.com',
    careers:     'admin@nodrftsystems.com',
    onboarding:  'info@nodrftsystems.com',
    intake:      'sales@nodrftsystems.com',
  },

  FALLBACK_EMAIL: 'info@nodrftsystems.com',

  // Subject prefix per form kind
  SUBJECT_PREFIX: {
    engagement: 'New Engagement Brief',
    inquiry:    'New Inquiry',
    careers:    'New Career Submission',
    onboarding: 'New Onboarding Submission',
    intake:     'New Client Intake',
  },
};

// ─── MAIN HANDLER ─────────────────────────────────────────────────────────────

function doPost(e) {
  try {
    const params = e.parameter || {};
    const formKind = (params['form-kind'] || params['formKind'] || 'inquiry').toLowerCase();
    const toEmail  = CONFIG.ROUTING[formKind] || CONFIG.FALLBACK_EMAIL;
    const subject  = buildSubject(formKind, params);
    const body     = buildEmailBody(formKind, params);

    MailApp.sendEmail({
      to:      toEmail,
      subject: subject,
      body:    body,
      replyTo: params.email || params['reply-email'] || '',
    });

    logToSheet(formKind, params);

    return jsonResponse({ ok: true });
  } catch (err) {
    logError(err);
    return jsonResponse({ ok: false, error: err.message }, 500);
  }
}

// Health check — confirms the endpoint is live
function doGet(e) {
  return jsonResponse({ ok: true, service: 'NoDrftSystems Form Endpoint', status: 'active' });
}

// ─── EMAIL BUILDERS ───────────────────────────────────────────────────────────

function buildSubject(formKind, params) {
  const prefix = CONFIG.SUBJECT_PREFIX[formKind] || 'New Form Submission';
  const name   = params.name || params['contact-name'] || '';
  const org    = params.organization || params.company || params['org-name'] || '';
  const suffix = [name, org].filter(Boolean).join(' — ');
  return suffix ? `${prefix}: ${suffix}` : prefix;
}

function buildEmailBody(formKind, params) {
  const lines = [
    `Form: ${formKind}`,
    `Received: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} ET`,
    '',
    '─── SUBMISSION ───',
  ];

  // Prioritized fields shown first
  const priority = ['name', 'email', 'organization', 'company', 'phone',
                    'offer', 'challenge', 'objective', 'investmentRange',
                    'timeline', 'message', 'role', 'discipline'];

  const seen = new Set();

  priority.forEach(key => {
    if (params[key] && params[key].trim()) {
      lines.push(`${formatKey(key)}: ${params[key].trim()}`);
      seen.add(key);
    }
  });

  // Remaining fields
  Object.entries(params).forEach(([key, val]) => {
    if (seen.has(key) || key === 'form-kind' || key === 'formKind') return;
    if (val && typeof val === 'string' && val.trim()) {
      lines.push(`${formatKey(key)}: ${val.trim()}`);
    }
  });

  lines.push('', '─────────────────', 'NoDrftSystems — nodrftsystems.com');
  return lines.join('\n');
}

function formatKey(key) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
    .trim();
}

// ─── SHEET LOGGING ────────────────────────────────────────────────────────────

function logToSheet(formKind, params) {
  if (!CONFIG.SHEET_ID) return;

  try {
    const ss    = SpreadsheetApp.openById(CONFIG.SHEET_ID);
    const sheet = ss.getSheetByName(CONFIG.SHEET_NAME) || ss.insertSheet(CONFIG.SHEET_NAME);

    // Write header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp', 'Form Kind', 'Name', 'Email', 'Organization',
        'Message / Challenge', 'Investment Range', 'Full Data',
      ]);
      sheet.getRange(1, 1, 1, 8).setFontWeight('bold');
    }

    sheet.appendRow([
      new Date(),
      formKind,
      params.name || '',
      params.email || '',
      params.organization || params.company || '',
      params.challenge || params.objective || params.message || '',
      params.investmentRange || params.budget || '',
      JSON.stringify(params),
    ]);
  } catch (err) {
    console.error('Sheet log failed:', err.message);
  }
}

// Run once manually to create the sheet
function initSheet() {
  const ss = SpreadsheetApp.create('NoDrftSystems — Form Submissions');
  const sheet = ss.getActiveSheet();
  sheet.setName(CONFIG.SHEET_NAME);
  sheet.appendRow([
    'Timestamp', 'Form Kind', 'Name', 'Email', 'Organization',
    'Message / Challenge', 'Investment Range', 'Full Data',
  ]);
  sheet.getRange(1, 1, 1, 8).setFontWeight('bold');

  console.log('Sheet created. Copy this Sheet ID into CONFIG.SHEET_ID:');
  console.log(ss.getId());
  console.log('Sheet URL:', ss.getUrl());
}

// ─── UTILITIES ────────────────────────────────────────────────────────────────

function jsonResponse(data, statusCode) {
  const output = ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
  return output;
}

function logError(err) {
  try {
    MailApp.sendEmail({
      to:      CONFIG.FALLBACK_EMAIL,
      subject: 'Form endpoint error — NoDrftSystems',
      body:    `Error: ${err.message}\nStack: ${err.stack || 'n/a'}`,
    });
  } catch (e) {
    console.error('Error notification failed:', e.message);
  }
}
