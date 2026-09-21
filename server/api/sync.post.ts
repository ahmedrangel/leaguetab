export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  const { url } = await readBody<{ url: string }>(event);
  if (!url || !url) {
    throw createError({ status: 401, message: "Unauthorized" });
  }
  await kv.set(user.login, url);
  return { synced: true };
});
