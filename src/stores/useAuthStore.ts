import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
  id: 'auth', 
  state: () => ({
    user: localStorage.getItem('user') ? true : false,
  }),
  actions: {
    setUser(userData) {
      if (userData) {
        localStorage.setItem('user', userData);
        this.user = true;
      } else {
        localStorage.removeItem('user');
        this.user = false;
      }
    },
    isUserLoggedIn() {
      return this.user;
    },
  },
});