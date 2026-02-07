/* ========================================
   Bret's Mulching - Form Handler
   Lead Capture & localStorage Management
   ======================================== */

const LEADS_STORAGE_KEY = 'brets_mulching_leads';

document.addEventListener('DOMContentLoaded', function() {
  initQuoteForm();
  initContactForm();
});

/* ========================================
   Quote Form Handler
   ======================================== */
function initQuoteForm() {
  const form = document.getElementById('quote-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    if (!validateForm(form)) return;

    const formData = new FormData(form);
    const lead = {
      id: generateId(),
      type: 'quote',
      status: 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: '',
      data: {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        propertySize: formData.get('property-size'),
        services: formData.getAll('services'),
        description: formData.get('description'),
        source: formData.get('source'),
        preferredContact: formData.get('preferred-contact')
      }
    };

    saveLead(lead);

    // Redirect to thank you page
    window.location.href = 'thank-you.html';
  });
}

/* ========================================
   Contact Form Handler
   ======================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    if (!validateForm(form)) return;

    const formData = new FormData(form);
    const lead = {
      id: generateId(),
      type: 'contact',
      status: 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: '',
      data: {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message'),
        source: 'Contact Page'
      }
    };

    saveLead(lead);

    // Redirect to thank you page
    window.location.href = 'thank-you.html';
  });
}

/* ========================================
   Form Validation
   ======================================== */
function validateForm(form) {
  let isValid = true;
  const requiredFields = form.querySelectorAll('[required]');

  // Clear previous errors
  form.querySelectorAll('.form-error').forEach(el => el.remove());
  form.querySelectorAll('.form-input, .form-textarea, .form-select').forEach(el => {
    el.style.borderColor = '';
  });

  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      isValid = false;
      showFieldError(field, 'This field is required');
    } else if (field.type === 'email' && !isValidEmail(field.value)) {
      isValid = false;
      showFieldError(field, 'Please enter a valid email');
    } else if (field.name === 'phone' && !isValidPhone(field.value)) {
      isValid = false;
      showFieldError(field, 'Please enter a valid phone number');
    }
  });

  return isValid;
}

function showFieldError(field, message) {
  field.style.borderColor = 'var(--color-error)';
  const error = document.createElement('span');
  error.className = 'form-error';
  error.textContent = message;
  field.parentNode.appendChild(error);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10;
}

/* ========================================
   Lead Storage Functions
   ======================================== */
function saveLead(lead) {
  const leads = getLeads();
  leads.unshift(lead); // Add to beginning
  localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
  console.log('Lead saved:', lead);
}

function getLeads() {
  const stored = localStorage.getItem(LEADS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function updateLead(id, updates) {
  const leads = getLeads();
  const index = leads.findIndex(l => l.id === id);
  if (index !== -1) {
    leads[index] = { ...leads[index], ...updates, updatedAt: new Date().toISOString() };
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
    return leads[index];
  }
  return null;
}

function deleteLead(id) {
  const leads = getLeads().filter(l => l.id !== id);
  localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
}

function generateId() {
  return 'lead_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

/* ========================================
   Export Functions for Admin
   ======================================== */
function exportLeadsToCSV() {
  const leads = getLeads();
  if (leads.length === 0) {
    alert('No leads to export');
    return;
  }

  const headers = ['Date', 'Type', 'Status', 'Name', 'Email', 'Phone', 'Address', 'Property Size', 'Services', 'Source', 'Description', 'Notes'];

  const rows = leads.map(lead => [
    new Date(lead.createdAt).toLocaleDateString(),
    lead.type,
    lead.status,
    lead.data.name || '',
    lead.data.email || '',
    lead.data.phone || '',
    lead.data.address || '',
    lead.data.propertySize || '',
    (lead.data.services || []).join('; '),
    lead.data.source || '',
    (lead.data.description || lead.data.message || '').replace(/,/g, ';'),
    (lead.notes || '').replace(/,/g, ';')
  ]);

  const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `leads-export-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// Make functions globally available
window.leadManager = {
  getLeads,
  updateLead,
  deleteLead,
  exportLeadsToCSV
};
