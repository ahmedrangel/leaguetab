export default defineEventHandler(async (event) => {
  const { login } = getRouterParams(event);
  if (!login) {
    throw createError({ status: 400, message: "Missing login" });
  }
  const target = await kv.get<string>(login);
  if (!target) {
    throw createError({ status: 404, message: "Target not found" });
  }
  const data = await $fetch(target).catch(() => null);
  if (!data) {
    throw createError({ status: 404, message: "Data not found" });
  }
  return data;
});
