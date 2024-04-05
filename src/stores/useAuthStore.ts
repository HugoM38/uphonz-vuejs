import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!)
      : null,
  }),
  actions: {
    setUser(userData: string | null) {
      if (userData) {
        localStorage.setItem("user", userData);
        this.user = userData;
      } else {
        localStorage.removeItem("user");
        this.user = null;
      }
    },
  },
  getters: {
    getUser(): any {
      return this.user;
    },
    isUserLoggedIn(): boolean {
      return this.user !== null;
    },
  },
});
