export default defineEventHandler(async (event) => {
  const { url, state } = getQuery<{ url: string, state: string }>(event);
  if (!url || !state) {
    throw createError({ status: 400, message: "Missing URL or state parameter" });
  }
  setCookie(event, "nuxt-websocket-proxy-url", url, {
    httpOnly: true,
    secure: !import.meta.dev,
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 1 day
    path: "/"
  });
  setCookie(event, "nuxt-websocket-proxy-state", state, {
    httpOnly: true,
    secure: !import.meta.dev,
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 1 day
    path: "/"
  });
  sendRedirect(event, "/auth/twitch");
});
