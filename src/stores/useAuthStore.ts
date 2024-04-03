import { ref } from 'vue';

const user = ref(localStorage.getItem('user') ? true : false);

export function useAuthStore() {
  const setUser = (userData: string | null) => {
    if (userData) {
      localStorage.setItem('user', userData);
      user.value = true;
    } else {
      localStorage.removeItem('user');
      user.value = false;
    }
  };

  const isUserLoggedIn = () => {
    return user.value;
  };

  return { setUser, isUserLoggedIn };
}
