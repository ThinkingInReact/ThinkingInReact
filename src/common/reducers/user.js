const initialState = {
  isLoggedIn: false,
  boughtPackageId: null,
  email: null,
  name: null,
  invitedToGithubRepo: false
};

function user(state = initialState, action) {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        ...action.user,
        isLoggedIn: true
      };
    default:
      return state;
  }
}

export default user;
