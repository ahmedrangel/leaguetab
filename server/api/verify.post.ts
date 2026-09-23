export default defineEventHandler(async (event) => {
  const body = await readBody<{ sid: string, state: string }>(event);
  const { sid, state } = body;
  if (!sid || !state) {
    return { verified: false };
  }
  const key = `sid:${sid}`;
  const verification = await kv.get<{ user: User, state: string }>(key);
  if (!verification || verification.state !== state) {
    return { verified: false };
  }
  await kv.del(key);
  return { verified: true, user: verification.user };
});
