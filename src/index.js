import { App } from 'core';
import * as serviceWorker from './service-worker';

const root = document.getElementById('root');
new App(root);

// cache service worker
serviceWorker.unregister();
