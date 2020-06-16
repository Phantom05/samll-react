export default {
  gameItem(context, payload) {
    context.commit('gameItem', payload);
  },
  addItem(context, payload) {
    context.commit('addItem', payload);
  },
  clearItem(context, payload) {
    context.commit('clearItem', payload);
  },
};
