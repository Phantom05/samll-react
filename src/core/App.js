import { Router } from 'core';
import { history, Model } from 'lib/utils';
import 'styles/_reset.scss';

export default class App {
  constructor(container) {
    this.container = container;
    this.model = new Model(this.render.bind(this)); // main store
    this.router = new Model(this.render.bind(this));
    this.intialize();
  }

  intialize() {
    if (!history.isHash) history.push('#/');
    this.route();
  }
  route() {
    const self = this;
    const router = new Router();
    window.addEventListener('popstate', () => {
      self.router.component = router.route();
    });
    setTimeout(function () {
      self.router.component = router.route();
    }, 0);
  }

  render(property, oldValue, newValue) {
    const self = this;
    const { component = () => {} } = self.router;
    const container = self.container;
    const renderCompo = new component();
    const parser = renderCompo.render();

    setTimeout(async () => {
      console.log(renderCompo, 'Component Model Controller');
      await renderCompo.model?.();
      renderCompo.controller?.();
    }, 0);

    if (parser === null) return;
    if (typeof parser === 'object' && !!parser.nodeName) {
      container.innerHTML = '';
      container.append(parser);
    } else {
      container.innerHTML = parser;
    }
  }
}
