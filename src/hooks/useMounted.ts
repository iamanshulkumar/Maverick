import { useSyncExternalStore } from "react";

function noop() {
  return () => {};
}

export function useMounted() {
  return useSyncExternalStore(noop, () => true, () => false);
}
