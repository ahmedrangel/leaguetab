import { randomUUID } from "node:crypto";
import { withQuery } from "ufo";

export default defineOAuthTwitchEventHandler({
  async onSuccess (event, result) {
    const user = {
      id: result.user.id,
      login: result.user.login,
      displayName: result.user.display_name
    };
    await setUserSession(event, { user, loggedInAt: Date.now() });
    const proxyURL = getCookie(event, "nuxt-websocket-proxy-url");
    const proxyState = getCookie(event, "nuxt-websocket-proxy-state");
    if (!proxyURL || !proxyState) {
      throw createError({ statusCode: 400, statusMessage: "Proxy URL or state not found." });
    }
    kv.set(result.user.login, proxyURL);
    const sid = randomUUID();
    kv.set(`sid:${sid}`, { user, state: proxyState }, { ttl: 600 });
    deleteCookie(event, "nuxt-websocket-proxy-url");
    deleteCookie(event, "nuxt-websocket-proxy-state");
    return sendRedirect(event, withQuery("/done", { sid }));
  }
});
