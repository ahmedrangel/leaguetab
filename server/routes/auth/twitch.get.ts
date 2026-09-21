export default defineOAuthTwitchEventHandler({
  async onSuccess (event, result) {
    const user = {
      id: result.user.id,
      login: result.user.login,
      displayName: result.user.display_name
    };
    await setUserSession(event, { user, loggedInAt: Date.now() });
    const session = getCookie(event, "nuxt-session");
    const response = await $fetch(`${SITE.localhost}/auth/session`, { method: "POST", body: { session } }).catch((e) => {
      console.info(e);
      return null;
    });
    console.info(response);
    if (!response) {
      throw createError({ status: 503, message: "Failed to communicate with the local service. Make sure the local service is running." });
    }
    return sendRedirect(event, "/done");
  }
});
