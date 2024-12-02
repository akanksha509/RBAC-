import { useContext, createContext } from "react";

export const SessionContext = createContext({
  session: {},
  setSession: () => {},
});

export function useSession() {
  return useContext(SessionContext);
}
