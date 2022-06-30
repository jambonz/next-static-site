export const initialState = { clicks: 0 };

export function reducer(state, action) {
  switch (action.type) {
    case 'click':
      return { clicks: state.clicks + 1 };
    default:
      throw new Error();
  }
}