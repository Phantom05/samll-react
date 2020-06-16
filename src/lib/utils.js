/**
 * NOTE: identity 함수
 * @param {*} item
 */
export const identity = item => item;

/**
 * NOTE: Ajax 만들기 위한 class
 */
export class Ajax {
  constructor(props = {}) {
    this.baseUrl = props?.baseUrl || '';
  }
  reqGet(config) {
    return new Promise((resolve, reject) => {
      const { url } = config;
      const self = this;
      let xhttp = window.XMLHttpRequest
        ? new XMLHttpRequest()
        : new ActiveXObject('Microsoft.XMLHTTP');

      xhttp.onreadystatechange = function () {
        if (xhttp.readyState !== XMLHttpRequest.DONE) return;
        if (xhttp.status == 200) {
          const result = { result: 1, data: JSON.parse(this.response) };
          resolve(result);
        } else {
          const result = { result: 2, error: xhttp.statusText };
          reject(result);
        }
      };
      xhttp.open('GET', self.baseUrl + url);
      xhttp.send();
    });
  }

  get(url, options) {
    const format = { url, options };
    return this.reqGet(format);
  }
}
/**
 * NOTE: 태그를 간편하게 생성하기 위한 함수
 * @param {*} name
 * @param {*} attributes
 */
export function elt(name, attributes) {
  let node = document.createElement(name);
  if (attributes && typeof attributes !== 'string') {
    for (let attr in attributes) {
      if (attributes.hasOwnProperty(attr)) {
        node.setAttribute(attr, attributes[attr]);
      }
    }
  }
  for (let i = 2; i < arguments.length; i++) {
    let child = arguments[i];
    if (typeof child === 'string') {
      child = document.createTextNode(child);
    }
    node.append(child);
  }
  return node;
}

/**
 * NOTE: string 으로 이루어진 태그를 태그형태로 만들어주는 함수
 * @param {*} markup
 */
export function parseHTML(markup) {
  if (typeof markup !== 'string') return markup;
  if (markup.toLowerCase().trim().indexOf('<!doctype') === 0) {
    let doc = document.implementation.createHTMLDocument('');
    doc.documentElement.innerHTML = markup;
    return doc;
  } else if ('content' in document.createElement('template')) {
    let el = document.createElement('template');

    el.innerHTML = markup;
    return el.content;
  } else {
    let docfrag = document.createDocumentFragment();
    let el = document.createElement('body');
    el.innerHTML = markup;
    for (i = 0; 0 < el.childNodes.length; ) {
      docfrag.appendChild(el.childNodes[i]);
    }

    return docfrag;
  }
}

/**
 * NOTE: Proxy Model을 만들기 위한 class
 */
export class Model {
  constructor(callback, obj) {
    const proxy = new Proxy(obj || this, {
      get(target, property) {
        return target[property];
      },
      set(target, property, value) {
        const oldValue = target[property];
        target[property] = value;
        if (value !== oldValue && callback) {
          if (callback) {
            callback(property, oldValue, value);
          }
        }
        return true;
      },
    });

    return proxy;
  }
}
/**
 * NOTE:
 * @param {*} type
 * @param {*} delay
 */
function WebAPIConcept(type = '', func = () => {}, delay = 0) {
  const self = this;
  const clearConfig = {
    setTimeout: 'clearTimeout',
    setInterval: 'clearInterval',
  };
  const typeClear = clearConfig[type];
  self.type = type;
  self.func = func;
  self.delay = delay;
  self.typeClear = typeClear;
  self.paused_timeLeft = 0;
  self.triggerSetAt = new Date().getTime();
  self.t_restart = null;
  self.triggerTime = self.triggerSetAt + self.delay;

  // clear
  self[typeClear] = function () {
    window[typeClear](self.ti);
  };

  WebAPIConcept.prototype.getTimeLeft = function () {
    let now = new Date();
    if (this.type === 'setTimeout') {
      return this.triggerTime - now;
    }
    return this.delay - ((now - this.triggerSetAt) % this.delay);
  };
  WebAPIConcept.prototype.start = function (callback, ms) {
    this.ti = window[this.type](callback || this.func, ms || this.delay);
  };
  WebAPIConcept.prototype.pause = function () {
    this.paused_timeLeft = this.getTimeLeft();
    window[this.typeClear](this.ti);
    this.ti = null;
  };

  WebAPIConcept.prototype.resume = function () {
    if (this.ti === null) {
      this.ti = window[type](this.func, this.paused_timeLeft, this);
    }
  };
  WebAPIConcept.prototype.restart = function (sender) {
    sender.ti = window[this.type](sender.func, sender.delay);
  };
  return;
}

/**
 * NOTE: timeout id claar 하기위한 contstucor
 * @param {*} func
 * @param {*} delay
 */
export function SetTimeout(func = () => {}, delay = 1000) {
  WebAPIConcept.apply(this, ['setTimeout', func, delay]);
}
SetTimeout.prototype = Object.create(WebAPIConcept.prototype);

/**
 * NOTE: interval id claar 하기위한 contstucor
 * @param {*} func
 * @param {*} delay
 */
export function SetInterval(func = () => {}, delay = 1000) {
  WebAPIConcept.apply(this, ['setInterval', func, delay]);
}
SetInterval.prototype = Object.create(WebAPIConcept.prototype);

/**
 * NOTE: Game class
 */
export class WordRelay {
  constructor(props) {
    const { items = [], render = () => {} } = props;
    // stage 0 => 시작,1 => 초기화,2 => 다시시작;
    this.render = render;
    this.state = new Model(() => render({ data: this }), {
      stage: 0,
      score: items.length,
      count: 0,
      question: '',
    });
    this.items = items;
    this.status = 0;
    this.averageTime = [];
    this.interval = new SetInterval(null, 1000);
    this.timeout = new SetTimeout(null, 1000);
  }

  scheduler(config = {}) {
    const { gap } = config;
    const self = this;
    const state = self.state;
    run(self.items, self.timeout.delay);

    async function run(array, ms) {
      for (let i = 0; i < array.length; i++) {
        const questionData = array[i];
        state.question = questionData.text;
        const { result } = await delay(questionData, ms);
        //결과 챕터가 지나갈때마다 업데이트 부분
        state.score = state.score + result;
      }
      // 모두 종류
      self.finish();
    }

    async function delay(data, ms) {
      return new Promise(resolve => {
        let sec = data.second;
        const tick = () => {
          const count = sec--;
          state.count = count;
          // 도중에 맞췄을 때 next 에서 status를 1로 바꿔줌
          if (self.status === 1) {
            controlStep(resolve, 1, count, data.second);
          }
        };
        if (gap === 1) tick();
        self.interval.start(tick);
        // 시간초과 됬을때
        self.timeout.start(function () {
          controlStep(resolve, 0);
        }, data.second * ms);
      });
    }
    function controlStep(resolve, type, count, second) {
      // 통과
      if (type === 1) {
        self.status = 0;
        self.timeout.clearTimeout();
        self.interval.clearInterval();
        self.averageTime.push(second - count);
        resolve({ result: 0 });
      } else if (type === 0) {
        // 타임오바
        self.interval.clearInterval();
        self.timeout.clearTimeout();
        resolve({ result: -1 });
      }
    }
  }
  model({ type = '' }) {
    const self = this;
    self.timeout.clearTimeout();
    self.interval.clearInterval();
    if (type === 'start') {
      self.state.stage = 1;
      self.state.score = self.items.length;
    }
    if (type === 'finish') {
      self.state.stage = 2;
    }
    if (type === 'restart') {
      self.state.score = 0;
      self.state.count = 0;
    }
    if (type === 'reset') {
      self.state.question = '문제 단어';
      self.state.stage = 0;
      self.state.score = 0;
      self.state.count = 0;
    }
  }

  // type - 1일 때 즉시실행
  start(type) {
    const self = this;
    self.model({ type: 'start' });
    self.scheduler({ gap: type });
    self.render({ type: 'screen', name: 'start', data: self });
  }
  reset() {
    const self = this;
    self.model({ type: 'reset' });
    self.render({ type: 'screen', name: 'reset', data: self });
  }
  finish() {
    const self = this;
    self.model({ type: 'finish' });
    self.render({ type: 'screen', name: 'finish', data: self });
  }
  restart() {
    const self = this;
    self.model({ type: 'restart' });
    self.start(1);
  }
  input(value) {
    const self = this;
    if (self.state.question === value?.trim()) {
      self.next(7);
    }
  }
  next() {
    this.status = 1;
  }

  result() {
    const self = this;
    const averageScore =
      self.averageTime.reduce((acc, item) => acc + item, 0) / self.averageTime.length;

    return {
      stage: self.state.stage,
      averageTime: isNaN(averageScore) ? 0 : averageScore.toFixed(0),
      question: self.state.question,
      score: self.state.score,
    };
  }
  template(config) {
    const { type } = config;
    const self = this;

    if (type === 'finish') {
      const { averageTime, score } = self.result();
      return `
      <div class="container wrap WordGame result" data-name="resultContainer">
        <div class="word__box">
          <div class="word__rows center">
            <h3 class="result__info title">Mission Complete!</h3>
            <p data-name="score" class="result__info score">당신의 점수는 ${score}점 입니다.</p>
            <p data-name="averageTime" class="result__info average">
              단어당 평균 답변 시간은 ${averageTime}초입니다.
            </p>
          </div>
          <div class="word__rows center">
            <input 
              class="word__btn control" 
              type="button" 
              data-name="controlBtn" 
              value="다시 시작"
            >
          </div>
        </div>
      </div>
      `;
    }
  }
}

/**
 * NOTE: history 관련된 객체
 */
export const history = {
  isHash: !!window.location.hash.substr(1).replace(/\//gi, '/'),
  parserUrl(url) {
    return !!this.isHash ? `#${url}` : url;
  },
  push(url) {
    window.location.href = url;
  },
  replace(url) {
    window.location.replace(url);
  },
};

/**
 * NOTE: interval과 timeout을 모두 삭제합니다.
 */
export function clearAllWebApi() {
  for (var i = setTimeout(function () {}, 0); i > 0; i--) {
    window.clearInterval(i);
    window.clearTimeout(i);
    if (window.cancelAnimationFrame) window.cancelAnimationFrame(i);
  }
}

/**
 * NOTE: url의 hash 상태를 파악하고 , query형태로 반환해줍니다.
 * @param {*} url
 */
export function hashUrlParser(url) {
  let hash = url || window.location.hash.substr(1).replace(/\//gi, '/');
  const queryParams = new Map();

  if (hash?.split('?')[1]) {
    hash
      .split('?')[1]
      .split('&')
      .map(queryParam => {
        const [key, value] = queryParam.split('=');
        queryParams.set(key, value);
      });
  }

  return queryParams;
}

/**
 * NOTE: object 형태를 Html Attribute 형태로 바꿔줍니다.
 * @param {*} obj
 */
export function convertObjectToHtmlAttr(obj = {}) {
  const stringAttr = Object.entries(obj)
    .map(item => item[0] + `="${item[1]}"`)
    .join(' ');

  return stringAttr;
}
