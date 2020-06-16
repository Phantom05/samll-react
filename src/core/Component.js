import { Store } from 'core';
import { identity } from 'lib/utils';
export default class Component {
  constructor(props = {}) {
    let self = this;
    self.render = self.render || identity;
    self.controller = self.controller || identity;
    if (props.store instanceof Store) {
      props.store.events.subscribe('stateChange', () => self.render());
    }

    self.insert = () => {
      const render = self.render();
      setTimeout(async () => {
        await self.model?.();
        self.controller?.();
      }, 0);
      //
      return render;
    };
  }
}
