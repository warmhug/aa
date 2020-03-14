
export const init = (text) => {
  return { text: text };
}

export const todosReducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return {text: state.text + action.text};
    default:
      throw new Error();
  }
}