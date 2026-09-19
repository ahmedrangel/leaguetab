export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);
  if (!id) {
    throw createError({ status: 400, message: "Missing id" });
  }
  const target = await kv.get<string>(id);
  if (!target) {
    throw createError({ status: 404, message: "Target not found" });
  }
  const data = await $fetch(target).catch(() => null);
  if (!data) {
    throw createError({ status: 404, message: "Data not found" });
  }
  return data;
});
