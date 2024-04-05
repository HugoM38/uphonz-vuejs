import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
  id: 'auth', 
  state: () => ({
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
  }),
  actions: {
    setUser(userData: string | null) {
      if (userData) {
        localStorage.setItem('user', userData);
        this.user = userData;
        console.log(localStorage.getItem('user'));
        console.log(this.user);
      } else {
        localStorage.removeItem('user');
        this.user = null;
        console.log(localStorage.getItem('user'));
        console.log(this.user);
      }
    },
  },
  getters: {
    getUser(): any {
      console.log("getUser: ", this.user)
      return this.user;
    },
    isUserLoggedIn(): boolean {
      return this.user !== null;
    }
  },

});