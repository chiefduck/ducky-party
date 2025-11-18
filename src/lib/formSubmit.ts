/**
 * Submit form data to Make.com webhook
 * @param formType - Type identifier for the form (used for routing in Make.com)
 * @param formData - The form data object to submit
 * @returns Promise with success status
 */
export async function submitToMake(formType: string, formData: any) {
  const webhookUrl = import.meta.env.VITE_MAKE_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error('Make.com webhook URL not configured');
    return { success: false, error: 'Webhook URL not configured' };
  }

  const payload = {
    formType,
    timestamp: new Date().toISOString(),
    ...formData
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    console.error('Form submission error:', error);
    return { success: false, error };
  }
}
