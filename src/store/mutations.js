export default {
  gameItem(state, payload) {
    state.gameResult = payload;
    return state;
  },
  addItem(state, payload) {
    state.items.push(payload);
    return state;
  },
  clearItem(state, payload) {
    state.items.splice(payload.index, 1);
    return state;
  },
};
