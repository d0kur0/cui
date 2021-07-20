import { auth, googleProvider } from "../firebase";
import { SET_ERROR_MESSAGE, SET_PENDING } from "./common";

export const USER_SET_IS_SIGNED = "user/setIsSignedIn";
export const USER_SET_DATA = "user/setUserData";
export const USER_CLEAR_DATA = "user/clearUserData";
export const USER_SIGN_IN = "user/signIn";
export const USER_SIGN_OUT = "user/signOut";

const emptyUserStruct = { id: "", name: "", email: "", picture: "" };

export let user = store => {
  store.on("@init", () => ({
    user: {
      isSignedIn: false,
      ...emptyUserStruct,
    },
  }));

  store.on(USER_SET_IS_SIGNED, (state, isSignedIn) => ({
    user: {
      ...state.user,
      isSignedIn,
    },
  }));

  store.on(USER_CLEAR_DATA, state => ({
    user: {
      ...state.user,
      ...emptyUserStruct,
    },
  }));

  store.on(USER_SET_DATA, (state, { id, name, email, picture }) => ({
    user: {
      ...state.user,
      id,
      name,
      email,
      picture,
    },
  }));

  store.on(USER_SIGN_IN, async () => {
    store.dispatch(SET_PENDING, true);

    try {
      await auth.signInWithPopup(googleProvider);
    } catch (error) {
      store.dispatch(SET_ERROR_MESSAGE, "Ошибка авторизации");
      console.warn("error on signIn");
      console.log(error);
    }

    store.dispatch(SET_PENDING, false);
  });

  store.on(USER_SIGN_OUT, async () => {
    store.dispatch(SET_PENDING, true);

    try {
      await auth.signOut();
    } catch (error) {
      store.dispatch(SET_ERROR_MESSAGE, "Ошибка выхода из аккаунта");
      console.warn("error on signOut");
      console.log(error);
    }

    store.dispatch(SET_PENDING, false);
  });
};
