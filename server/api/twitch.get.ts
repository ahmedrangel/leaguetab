export default defineEventHandler(async (event) => {
  const { url } = getQuery<{ url: string }>(event);
  if (!url) {
    throw createError({ status: 400, message: "Missing URL parameter" });
  }
  setCookie(event, "nuxt-websocket-proxy", url, {
    httpOnly: true,
    secure: !import.meta.dev,
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 1 day
    path: "/"
  });
  sendRedirect(event, "/auth/twitch");
});
