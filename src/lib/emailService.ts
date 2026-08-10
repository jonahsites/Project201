export const TARGET_EMAIL = 'info@project201.org';

interface FormPayload {
  [key: string]: any;
}

/**
 * Sends a form submission directly to info@project201.org via AJAX formsubmit endpoint
 * and prepares a mailto fallback string.
 */
export async function sendFormToEmail(formType: string, payload: FormPayload): Promise<{ success: boolean; mailtoUri: string }> {
  const subject = `[Project 201 Website] ${formType} - ${payload.name || payload.parentName || payload.childName || payload.contactName || payload.clientName || 'New Submission'}`;
  
  // Format payload readable lines
  const formattedLines = Object.entries(payload)
    .filter(([_, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => {
      const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      const formattedVal = Array.isArray(value) ? value.join(', ') : typeof value === 'object' ? JSON.stringify(value) : value;
      return `${formattedKey}: ${formattedVal}`;
    });

  const emailBody = `Project 201 Form Submission (${formType})\n` +
    `--------------------------------------------------\n` +
    formattedLines.join('\n') +
    `\n\n--------------------------------------------------\n` +
    `Submitted on: ${new Date().toLocaleString()}\n` +
    `Destination: ${TARGET_EMAIL}`;

  const mailtoUri = `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: subject,
        _template: 'table',
        _captcha: 'false',
        form_type: formType,
        destination_email: TARGET_EMAIL,
        ...payload
      })
    });

    if (response.ok) {
      return { success: true, mailtoUri };
    }
  } catch (err) {
    console.warn('FormSubmit AJAX request error, using mailto fallback:', err);
  }

  return { success: true, mailtoUri };
}

export function openMailClient(mailtoUri: string) {
  window.open(mailtoUri, '_blank');
}
