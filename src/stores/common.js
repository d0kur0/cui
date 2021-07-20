import {
  autoHideErrorMessageTimeOut,
  autoHideSuccessMessageTimeOut,
} from "../configs/commonMessages";

export const SET_ERROR_MESSAGE = "common/setErrorMessage";
export const SET_SUCCESS_MESSAGE = "common/setSucessMessage";
export const SET_PENDING = "common/setPending";

let successTimer;
let errorTimer;

export let common = store => {
  store.on("@init", () => {
    return {
      errorMessage: null,
      successMessage: null,
      isPending: false,
    };
  });

  store.on(SET_PENDING, (_, isPending) => {
    return { isPending };
  });

  store.on(SET_ERROR_MESSAGE, (_, errorMessage) => {
    errorTimer && clearTimeout(errorTimer);

    if (errorMessage) {
      errorTimer = setTimeout(
        () => store.dispatch(SET_ERROR_MESSAGE, null),
        autoHideErrorMessageTimeOut
      );
    }

    return { errorMessage };
  });

  store.on(SET_SUCCESS_MESSAGE, (_, successMessage) => {
    successTimer && clearTimeout(successTimer);

    if (successMessage) {
      successTimer = setTimeout(
        () => store.dispatch(SET_SUCCESS_MESSAGE, null),
        autoHideSuccessMessageTimeOut
      );
    }

    return { successMessage };
  });
};
