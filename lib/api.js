const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function checkHealth() {
  try {
    const res = await fetch(`${API_URL}/health`, { cache: "no-store" });
    return res.ok;
  } catch {
    return false;
  }
}

export async function predict(file) {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch(`${API_URL}/predict`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    let message = `Server error ${res.status}`;
    try {
      const body = await res.json();
      message = body?.detail || body?.message || message;
    } catch {
      // non-JSON error body
    }
    throw new Error(message);
  }

  return res.json();
}
