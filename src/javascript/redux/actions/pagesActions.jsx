export const setPageNumber = details => (dispatch) => {
  dispatch({
    type: 'SET_PAGE_NUMBER',
    payload: details,
  });
};

export const changePageAction = number => (dispatch) => {
  dispatch(setPageNumber(number));
};
