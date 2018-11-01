const initialState = {
  number: 0, // 0 - main page, 1 - favorites
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PAGE_NUMBER':
      return {
        ...state,
        number: action.payload,
      };
    default:
      return state;
  }
};
