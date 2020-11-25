const initialState = {
  snackBarOpen: false,
  snackBarMessage: "",
  snackBarType: "",
};

const uiReducer = function (state = initialState, action) {
  switch (action.type) {
    case "SET_SNACKBAR":
      const { snackBarMessage, snackBarType } = action.payload;
      return {
        ...state,
        snackBarOpen: true,
        snackBarMessage: snackBarMessage,
        snackBarType: snackBarType,
      };

    case "HIDE_SNACKBAR":
      return {
        ...state,
        snackBarOpen: false,
      };

    default:
      return state;
  }
};

export default uiReducer;
