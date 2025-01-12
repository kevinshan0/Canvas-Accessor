import { json } from '@sveltejs/kit';

// Replace with your Canvas details
const CANVAS_BASE_URL = 'https://umamherst.instructure.com'; 
// Example: if your institution's Canvas is at https://<school>.instructure.com 
// then use that as the base URL. 
// The generic "canvas.instructure.com" is for demonstration only.

export async function GET({ request }) {
  try {
    // Canvas API: GET /api/v1/users/self/upcoming_events
    // or /api/v1/users/{user_id}/upcoming_events
    const response = await fetch(`${CANVAS_BASE_URL}/api/v1/users/${import.meta.env.VITE_USER_ID}/upcoming_events`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_CANVAS_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch upcoming events/assignments from Canvas');
    }

    const data = await response.json();
    return json({ success: true, assignments: data });
  } catch (err) {

    let message;
    if (err instanceof Error) {
        message = err.message;
    } else {
        message = String(err);
    }

    console.error(err);
    return json({ success: false, error: message }, { status: 500 });
  }
}