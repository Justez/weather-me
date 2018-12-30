const setPageNumber = details => dispatch => dispatch({
  type: 'SET_PAGE_NUMBER',
  payload: details,
});

const changePageAction = number => dispatch => dispatch(setPageNumber(number));

export {
  changePageAction,
  setPageNumber,
};
