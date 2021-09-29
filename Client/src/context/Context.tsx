import { createContext, useContext } from "react";

export type ContextType = {
  page: string;
  name: string;
  setPage: (String: string) => void;
  setName: (String: string) => void;
};

export const Context = createContext<ContextType>({
  page: "1",
  name: "",
  setPage: (page) => "",
  setName: (name) => "",
});

export const usePeopleContext = () => useContext(Context);
