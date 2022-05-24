import Cookies from "js-cookie";

export const cookiesStorage: Storage = {
  length: 0,
  clear() {
    return;
  },
  key(index) {
    return null;
  },
  removeItem(key) {
    Cookies.remove(key);
  },
  setItem(key, state) {
    return Cookies.set(key, state, {
      expires: 7,
      sameSite: "strict",
    });
  },
  getItem(key) {
    return Cookies.get(key) as string;
  },
};
