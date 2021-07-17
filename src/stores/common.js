import {
  autoHideErrorMessageTimeOut,
  autoHideSuccessMessageTimeOut,
} from "../configs/commonMessages";

export const SET_ERROR_MESSAGE = "common/setErrorMessage";
export const SET_SUCCESS_MESSAGE = "common/setSucessMessage";
export const SET_PENDING = "common/setPending";

export let common = store => {
  store.on("@init", () => ({
    errorMessage: "",
    successMessage: "",
    isPending: false,
  }));

  store.on(SET_PENDING, (_, isPending) => ({ isPending }));

  store.on(SET_ERROR_MESSAGE, (_, errorMessage) => {
    if (errorMessage) {
      setTimeout(
        () => store.dispatch(SET_ERROR_MESSAGE, null),
        autoHideErrorMessageTimeOut
      );
    }

    return { errorMessage };
  });

  store.on(SET_SUCCESS_MESSAGE, (_, successMessage) => {
    if (successMessage) {
      setTimeout(
        () => store.dispatch(SET_SUCCESS_MESSAGE, null),
        autoHideSuccessMessageTimeOut
      );
    }

    return { successMessage };
  });
};
