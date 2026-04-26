/**
 * NoDrftSystems - Website Form Endpoint
 * Google Apps Script Web App
 *
 * SETUP (one time):
 * 1. Open script.google.com - create a new project, paste this file.
 * 2. Run initSheet() once to create the log sheet.
 * 3. Deploy: Deploy > New deployment > Web App
 *    - Execute as: Me (admin@nodrftsystems.com)
 *    - Who has access: Anyone
 * 4. Copy the Web App URL.
 * 5. Paste it into index.html for all 5 ndrf-form-*-endpoint meta tags.
 */

var CONFIG = {
  SHEET_ID: '1cFER8uDp3xR_-q0x5znOJfWRubs0vX71I4Zeov6V0VE',
  SHEET_NAME: 'Submissions',

  ROUTING: {
    engagement: 'sales@nodrftsystems.com',
    inquiry:    'info@nodrftsystems.com',
    careers:    'admin@nodrftsystems.com',
    onboarding: 'info@nodrftsystems.com',
    intake:     'sales@nodrftsystems.com'
  },

  FALLBACK_EMAIL: 'info@nodrftsystems.com',

  SUBJECT_PREFIX: {
    engagement: 'New Engagement Brief',
    inquiry:    'New Inquiry',
    careers:    'New Career Submission',
    onboarding: 'New Onboarding Submission',
    intake:     'New Client Intake'
  }
};

function doPost(e) {
  try {
    var params   = e.parameter || {};
    var formKind = (params['form-kind'] || params['formKind'] || 'inquiry').toLowerCase();
    var toEmail  = CONFIG.ROUTING[formKind] || CONFIG.FALLBACK_EMAIL;
    var subject  = buildSubject(formKind, params);
    var body     = buildEmailBody(formKind, params);

    MailApp.sendEmail({
      to:      toEmail,
      subject: subject,
      body:    body,
      replyTo: params.email || params['reply-email'] || ''
    });

    sendConfirmation(formKind, params);
    logToSheet(formKind, params);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    logError(err);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, service: 'NoDrftSystems Form Endpoint', status: 'active' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function buildSubject(formKind, params) {
  var prefix = CONFIG.SUBJECT_PREFIX[formKind] || 'New Form Submission';
  var name   = params.name || params['contact-name'] || '';
  var org    = params.organization || params.company || params['org-name'] || '';
  var parts  = [];
  if (name) parts.push(name);
  if (org)  parts.push(org);
  return parts.length > 0 ? prefix + ': ' + parts.join(' - ') : prefix;
}

function buildEmailBody(formKind, params) {
  var divider  = '---';
  var received = new Date().toLocaleString();
  var lines    = [
    'Form: ' + formKind,
    'Received: ' + received,
    '',
    divider + ' SUBMISSION ' + divider
  ];

  var priority = [
    'name', 'email', 'organization', 'company', 'phone',
    'offer', 'challenge', 'objective', 'investmentRange',
    'timeline', 'message', 'role', 'discipline'
  ];

  var seen = {};

  for (var i = 0; i < priority.length; i++) {
    var key = priority[i];
    if (params[key] && params[key].trim()) {
      lines.push(formatKey(key) + ': ' + params[key].trim());
      seen[key] = true;
    }
  }

  var keys = Object.keys(params);
  for (var j = 0; j < keys.length; j++) {
    var k = keys[j];
    if (seen[k] || k === 'form-kind' || k === 'formKind') continue;
    var v = params[k];
    if (v && typeof v === 'string' && v.trim()) {
      lines.push(formatKey(k) + ': ' + v.trim());
    }
  }

  lines.push('');
  lines.push('-----------------');
  lines.push('NoDrftSystems - nodrftsystems.com');
  return lines.join('\n');
}

function formatKey(key) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, function(c) { return c.toUpperCase(); })
    .trim();
}

function logToSheet(formKind, params) {
  if (!CONFIG.SHEET_ID) return;

  try {
    var ss    = SpreadsheetApp.openById(CONFIG.SHEET_ID);
    var sheet = ss.getSheetByName(CONFIG.SHEET_NAME) || ss.insertSheet(CONFIG.SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp', 'Form Kind', 'Name', 'Email', 'Organization',
        'Message / Challenge', 'Investment Range', 'Full Data'
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
      JSON.stringify(params)
    ]);

  } catch (err) {
    Logger.log('Sheet log failed: ' + err.message);
  }
}

function initSheet() {
  var ss    = SpreadsheetApp.create('NoDrftSystems - Form Submissions');
  var sheet = ss.getActiveSheet();
  sheet.setName(CONFIG.SHEET_NAME);
  sheet.appendRow([
    'Timestamp', 'Form Kind', 'Name', 'Email', 'Organization',
    'Message / Challenge', 'Investment Range', 'Full Data'
  ]);
  sheet.getRange(1, 1, 1, 8).setFontWeight('bold');

  Logger.log('Sheet ID: ' + ss.getId());
  Logger.log('Sheet URL: ' + ss.getUrl());
}

function sendConfirmation(formKind, params) {
  var clientEmail = params.email || params['reply-email'] || '';
  if (!clientEmail) return;

  var name = params.name || params['contact-name'] || 'there';
  var firstName = name.split(' ')[0];

  var subjectMap = {
    engagement:  'We received your engagement brief — NoDrftSystems',
    inquiry:     'We received your inquiry — NoDrftSystems',
    careers:     'We received your submission — NoDrftSystems',
    onboarding:  'We received your onboarding request — NoDrftSystems',
    intake:      'We received your project information — NoDrftSystems'
  };
  var subject = subjectMap[formKind] || 'We received your submission — NoDrftSystems';

  var body = [
    'Hi ' + firstName + ',',
    '',
    'Thank you for reaching out to NoDrftSystems.',
    '',
    'We have received your submission and will review it carefully. You can expect to hear back from us within 1 business day.',
    '',
    'If your inquiry is time-sensitive, reply directly to this email and we will prioritize accordingly.',
    '',
    'Zero Drift. Zero Compromise. Built to Last.',
    '',
    'NoDrftSystems',
    'info@nodrftsystems.com',
    'nodrftsystems.com'
  ].join('\n');

  try {
    MailApp.sendEmail({
      to:      clientEmail,
      subject: subject,
      body:    body,
      replyTo: CONFIG.FALLBACK_EMAIL
    });
  } catch (e) {
    Logger.log('Confirmation email failed: ' + e.message);
  }
}

function logError(err) {
  try {
    MailApp.sendEmail({
      to:      CONFIG.FALLBACK_EMAIL,
      subject: 'Form endpoint error - NoDrftSystems',
      body:    'Error: ' + err.message + '\nStack: ' + (err.stack || 'n/a')
    });
  } catch (e) {
    Logger.log('Error notification failed: ' + e.message);
  }
}
