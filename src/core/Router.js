import { routes } from 'core/core.config';
class Router {
  constructor(root) {
    this.root = root;
  }
  route() {
    const hash = window.location.hash;
    const routes = Router.routes;
    let route = routes[0];
    for (let index = 0; index < routes.length; index++) {
      let rRoute = routes[index];
      if (hash === rRoute.url) {
        route = rRoute;
        return route.component;
      }
    }
    return route.component;
  }
}

Router.routes = routes;
export default Router;
