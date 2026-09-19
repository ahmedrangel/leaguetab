import { createWebSocketProxy } from "crossws";

const proxy = createWebSocketProxy({
  connectTimeout: 5000, // Set the connection timeout to 5 seconds
  target: async (peer) => {
    const { pathname } = new URL(peer.request.url);
    const id = pathname.split("/").filter(Boolean).pop();
    if (!id) {
      peer.close(1008, "Missing id");
      return "";
    }
    const target = await kv.get<string>(id);
    if (!target) {
      peer.close(1008, "Target not found");
      return "";
    }
    return target.replace(/^https:/, "wss:");
  }
});
proxy.error = (peer) => {
  peer.close(1013, "Target unavailable");
};

export default defineWebSocketHandler(
  // @ts-expect-error imports break TypeScript type checking
  proxy
);
