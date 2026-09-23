export default defineEventHandler(async (event) => {
  const body = await readBody<{ sid: string, state: string }>(event);
  const { sid, state } = body;
  if (!sid || !state) {
    return { verified: false };
  }
  const verification = await kv.get<{ user: User, state: string }>(`verification:${sid}`);
  if (!verification || verification.state !== state) {
    return { verified: false };
  }
  await kv.del(`verification:${sid}`);
  return { verified: true, user: verification.user };
});
