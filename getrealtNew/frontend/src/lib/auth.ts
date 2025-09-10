import { cookies } from "next/headers";

export async function getSession() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  const response = await fetch("https://your-api/api/user", {
    headers: { Authorization: `Bearer ${token}` },
    credentials: "include",
  });

  if (!response.ok) return null;
  return response.json();
}

export async function signOut() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  try {
    await fetch("https://your-api/api/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    // Очистка cookie на сервере
    return new Response(null, {
      status: 200,
      headers: {
        "Set-Cookie":
          "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict",
      },
    });
  } catch (error) {
    console.error("Logout failed", error);
    throw error;
  }
}
