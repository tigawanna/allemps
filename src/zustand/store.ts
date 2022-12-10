import create from "zustand";
import {
  persist,
  devtools,
} from "zustand/middleware";
import { User } from "../utils/types";



interface LocalState {
  localValues: {
    token?: string | null;
    theme: string | null;
    user: User | null
  };
  updateTheme: (theme: string) => void;
  updateToken: (token: string | null) => void;
  updateUser: (user: User|null) => void;
}

export const useLocalStoreValues = create<LocalState>()(
  devtools(
    persist(
      (set, get) => ({
        localValues: get()?.localValues ?? {
          theme: null,
          token: null,
          user: null,
        },

        updateTheme: (theme) =>
          set((state) => ({
            localValues: {
              ...state?.localValues,
              theme,
            },
          })),

        updateToken: (token) =>
          set((state) => ({
            localValues: {
              ...state?.localValues,
              token,
            },
          })),
        
          updateUser: (user) =>
          set((state) => ({
            localValues: {
              ...state?.localValues,
              user,
            },
          })),
      }),

      {
        name: "all-emps",
        getStorage: () => localStorage,
      }
    )
  )
);
