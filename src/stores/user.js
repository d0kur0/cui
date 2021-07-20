import { auth, googleProvider } from "../firebase";
import { SET_ERROR_MESSAGE, SET_PENDING } from "./common";

export const USER_SET_IS_SIGNED = "user/setIsSignedIn";
export const USER_SET_DATA = "user/setUserData";
export const USER_CLEAR_DATA = "user/clearUserData";
export const USER_SIGN_IN = "user/signIn";
export const USER_SIGN_OUT = "user/signOut";

const emptyUserStruct = { id: "", name: "", email: "", picture: "" };

export let user = store => {
  store.on("@init", () => {
    return {
      user: {
        isSignedIn: false,
        ...emptyUserStruct,
      },
    };
  });

  store.on(USER_SET_IS_SIGNED, ({ user }, isSignedIn) => {
    return { user: { ...user, isSignedIn } };
  });

  store.on(USER_CLEAR_DATA, ({ user }) => {
    return { user: { ...user, ...emptyUserStruct } };
  });

  store.on(USER_SET_DATA, ({ user }, { id, name, email, picture }) => {
    return {
      user: {
        ...user,
        id,
        name,
        email,
        picture,
      },
    };
  });

  store.on(USER_SIGN_IN, async () => {
    store.dispatch(SET_PENDING, true);

    try {
      await auth.signInWithPopup(googleProvider);
    } catch (error) {
      store.dispatch(SET_ERROR_MESSAGE, "Ошибка авторизации");
      console.warn("error on signIn");
      console.error(error);
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
      console.error(error);
    }

    store.dispatch(SET_PENDING, false);
  });
};
