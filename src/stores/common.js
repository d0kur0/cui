import {
  autoHideErrorMessageTimeOut,
  autoHideSuccessMessageTimeOut,
} from "../configs/commonMessages";

export const SET_ERROR_MESSAGE = "common/setErrorMesage";
export const SET_SUCCESS_MESSAGE = "common/setSucessMessage";
export const SET_PENDING = "common/setPending";

export let common = store => {
  store.on("@init", () => ({
    common: {
      errorMessage: null,
      successMessage: null,
      isPending: false,
    },
  }));

  store.on(SET_PENDING, (state, isPending) => ({
    common: {
      ...state.common,
      isPending,
    },
  }));

  store.on(SET_ERROR_MESSAGE, (state, errorMessage) => {
    setTimeout(
      () => store.dispatch(SET_ERROR_MESSAGE, null),
      autoHideErrorMessageTimeOut
    );

    return {
      common: {
        ...state.common,
        errorMessage,
      },
    };
  });

  store.on(SET_SUCCESS_MESSAGE, (state, successMessage) => {
    setTimeout(
      () => store.dispatch(SET_SUCCESS_MESSAGE, null),
      autoHideSuccessMessageTimeOut
    );

    return {
      common: {
        ...state.common,
        successMessage,
      },
    };
  });
};
