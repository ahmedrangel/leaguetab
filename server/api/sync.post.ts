import { StaticAuthProvider } from "@twurple/auth";
import { ApiClient } from "@twurple/api";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const { id, accessToken, url } = await readBody<{ id: string, accessToken: string, url: string }>(event);
  console.info({ id, accessToken, url });
  console.info(config.twitch.clientId);
  const authProvider = new StaticAuthProvider(config.twitch.clientId, accessToken);
  const api = new ApiClient({ authProvider });
  const user = await api.callApi<{ data: { id: string, login: string }[] }>({ type: "helix", url: "/users" }).catch(() => null);
  const authenticatedUser = user?.data?.[0];
  if (!authenticatedUser || authenticatedUser.id !== id) {
    throw createError({ status: 401, message: "Unauthorized" });
  }
  await kv.set(authenticatedUser.login, url);
  return { synced: true };
});
