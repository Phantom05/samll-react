import { Home, Result, Error, Test } from 'pages';
import { mapper } from 'lib/mapper';
import { NODE_PROD } from 'lib/config';

const pageUrl = mapper.pageUrl;

if (NODE_PROD) {
  document.title = 'Hello, Kakao!';
  console.log('Hello, Kakao!');
  console.log = () => {};
  console.warn = () => {};
  console.group = () => {};
  console.groupEnd = () => {};
}
export const routes = [
  {
    url: pageUrl.index,
    component: Home,
  },
  {
    url: pageUrl.result,
    component: Result,
  },
  {
    url: pageUrl.error,
    component: Error,
  },
  {
    url: pageUrl.test,
    component: Test,
  },
];
