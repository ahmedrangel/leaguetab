export default defineOAuthTwitchEventHandler({
  async onSuccess (event, result) {
    const user = {
      id: result.user.id,
      login: result.user.login,
      displayName: result.user.display_name
    };
    await setUserSession(event, { user, loggedInAt: Date.now() });
    const proxyURL = getCookie(event, "nuxt-websocket-proxy");
    if (!proxyURL) {
      throw createError({ statusCode: 400, statusMessage: "Proxy URL not found." });
    }
    kv.set(result.user.login, proxyURL);
    deleteCookie(event, "nuxt-websocket-proxy");
    return sendRedirect(event, "/done");
  }
});
