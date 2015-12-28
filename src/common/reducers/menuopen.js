function menuopen(state = true, action) {
  switch (action.type) {
    case 'TOGGLE_MENU':
      return !state;
    default:
      return state;
  }
}

export default menuopen;
