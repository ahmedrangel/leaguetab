import { withQuery } from "ufo";

export default defineOAuthTwitchEventHandler({
  async onSuccess (event, result) {
    const user = {
      id: result.user.id,
      login: result.user.login,
      displayName: result.user.display_name
    };
    await setUserSession(event, { user, loggedInAt: Date.now() });
    const nuxtSession = getCookie(event, "nuxt-session");
    if (!nuxtSession) {
      throw createError({ statusCode: 400, statusMessage: "Session not found." });
    }
    const base64URL = Buffer.from(nuxtSession).toString("base64url");
    return sendRedirect(event, withQuery("/done", { session: base64URL }));
  }
});
