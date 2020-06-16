import { Component } from 'core';

class Test extends Component {
  constructor() {
    super({
      number: 1,
    });
  }

  model() {}
  controller() {}
  render() {
    return `
    <button data-name="btn">Click</button>
    <div data-name="target">0</div>
    `;
  }
}

export default Test;

// this.state = new Model(this.render.bind(this), {
//   stage: 0,
//   score: items.length,
//   count: 0,
// });

// self.render({ type: "done" });
// self.render({ ...data, count: sec--, type: "running" });
// const interval = self.startInterval(() => {
//   // 성공시 바로 resolve
//   if (self.status === 1) {
//     self.status = 0;
//     self.averageTime.push(sec);
//     clearInterval(interval);
//     resolve({ result: 0 });
//   }
//   // 매 시간마다 초
//   // self.render({ ...data, count: sec--, type: "running" });
// }, ms);

// // 하나의 게임 챕터 다 끝났을때
// setTimeout(() => {
//   clearInterval(interval);
//   resolve({ result: -1 });
// }, data.second * ms);

// render() {
// const self = this;
// const {
//   score: stateScore,
//   count: stateCount,
//   question: stateQuestion,
// } = self.state;
// console.log("render", self.state);
// const questionElem = document.getElementById("question");
// const scoreElem = document.getElementById("score");
// const timeElem = document.getElementById("time");
// timeElem.innerHTML = stateCount;
// questionElem.innerHTML = stateQuestion;
// scoreElem.innerHTML = stateScore;
// }

// view(props) {
// const { type } = props;
// const self = this;
// const inputElem = document.getElementById("input");
// const controlBtn = document.getElementById("controlBtn");
// const header = document.getElementById("header");
// const question = document.getElementById("question");
// if (type === "reset") {
//   controlBtn.value = "시작";
//   inputElem.type = "button";
//   inputElem.value = "입력";
//   header.classList.remove("hidden");
//   inputElem.classList.remove("hidden");
// }
// if (type === "start") {
//   controlBtn.value = "초기화";
//   inputElem.type = "input";
//   inputElem.value = "";
//   header.classList.remove("hidden");
//   inputElem.classList.remove("hidden");
//   inputElem.focus();
// }
// if (type === "finish") {
//   controlBtn.value = "다시 시작";
//   inputElem.type = "button";
//   header.classList.add("hidden");
//   inputElem.classList.add("hidden");
//   question.innerHTML = self.template({ type: "finish" });
// }
// }

// DEBUG: 인터벌 손보기
// const myInterval = (callback, interval, times, end) => {
//   let flag = true;

//   const tick = count => {
//     setTimeout(() => {
//       if (!flag) return end && end(count);
//       if (times && count >= times) return end && end(count);

//       callback(count);
//       tick(count + 1);
//     }, interval);
//   };
//   tick(0);
//   return () => {
//     flag = false;
//   };
// };

// const stopInterval = myInterval(
//   count => {
//     console.log(`현재 ${count}번째 반복중`);
//   },
//   1000,
//   20,
//   () => {
//     console.log('끝나쪙');
//   },
// );

// setTimeout(() => {
//   stopInterval();
// }, 2400);

// function setDeceleratingTimeout(callback, factor, times) {
//   var internalCallback = (function (tick, counter) {
//     return function () {
//       if (--tick >= 0) {
//         window.setTimeout(internalCallback, ++counter * factor);
//         callback(counter);
//       }
//     };
//   })(times, 0);

//   window.setTimeout(internalCallback, factor);
// }

// setDeceleratingTimeout(
//   function (val) {
//     console.log(val);
//     console.log('bye');
//   },
//   1000,
//   10,
// );

// window.setVariableInterval = function (callbackFunc, timing) {
//   var variableInterval = {
//     interval: timing,
//     callback: callbackFunc,
//     stopped: false,
//     runLoop: function () {
//       if (variableInterval.stopped) return;
//       var result = variableInterval.callback.call(variableInterval);
//       if (typeof result == 'number') {
//         if (result === 0) return;
//         variableInterval.interval = result;
//       }
//       variableInterval.loop();
//     },
//     stop: function () {
//       this.stopped = true;
//       window.clearTimeout(this.timeout);
//     },
//     start: function () {
//       this.stopped = false;
//       return this.loop();
//     },
//     loop: function () {
//       this.timeout = window.setTimeout(this.runLoop, this.interval);
//       return this;
//     },
//   };

//   return variableInterval.start();
// };

// function intervalTimeout(props) {
//   const { timeout, interval, render } = props;
//   console.log(props, 'props');
//   // this.

//   this.start = function () {
//     const intervalId = setInterval(() => {
//       render();
//     }, interval);

//     setTimeout(() => {
//       clearInterval(intervalId);
//     }, timeout);
//   };
// }

// const test = new intervalTimeout({
//   timeout: 1000,
//   interval: 50,
//   render,
// });

// test.start();
// function render() {
//   console.log('render');
// }

// /**
//  * DEBUG: timeout id claar 하기위한 contstucor
//  * @param {*} func
//  * @param {*} delay
//  */
// export function SetTimeout(func = () => {}, delay = 1000) {
//   const self = this;
//   let _now = new Date().getTime();
//   self.func = func;
//   self.delay = delay;
//   self.triggerTime = _now + delay;
//   self.paused_timeLeft = 0;

//   WebAPIConcept.call(this, 'setTimeout');

//   // self.getTimeLeft = function () {
//   //   let now = new Date();
//   //   return self.triggerTime - now;
//   // };

//   // self.start = function (callback, ms) {
//   //   self.t = window.setTimeout(callback || self.func, ms || delay);
//   // };

//   // self.pause = function () {
//   //   self.paused_timeLeft = self.getTimeLeft();
//   //   window.clearTimeout(self.t);
//   //   self.t = null;
//   // };

//   // self.resume = function () {
//   //   if (self.t == null) {
//   //     self.t = window.setTimeout(self.func, self.paused_timeLeft);
//   //   }
//   // };

//   // self.clearTimeout = function () {
//   //   window.clearTimeout(self.ti);
//   // };
// }

// console.log(new SetTimeout());

// /**
//  * DEBUG: interval id claar 하기위한 contstucor
//  * @param {*} func
//  * @param {*} delay
//  */
// export function SetInterval(func = () => {}, delay = 1000) {
//   const self = this;
//   self.func = func;
//   self.delay = delay;
//   self.triggerSetAt = new Date().getTime();
//   self.triggerTime = self.triggerSetAt + delay;
//   self.paused_timeLeft = 0;
//   self.t_restart = null;

//   WebAPIConcept.call(this, 'setInterval');

//   self.getTimeLeft = function () {
//     let now = new Date();
//     return self.delay - ((now - self.triggerSetAt) % self.delay);
//   };

//   // self.start = function (callback, ms) {
//   //   self.ti = window.setInterval(callback || self.func, ms || self.delay);
//   // };

//   // self.pause = function () {
//   //   self.paused_timeLeft = self.getTimeLeft();
//   //   window.clearInterval(self.ti);
//   //   self.ti = null;
//   // };

//   // self.restart = function (sender) {
//   //   sender.ti = window.setInterval(sender.func, sender.delay);
//   // };

//   // self.resume = function () {
//   //   if (self.ti == null) {
//   //     self.ti = window.setTimeout(self.restart, self.paused_timeLeft, self);
//   //   }
//   // };

//   // self.clearInterval = function () {
//   //   window.clearInterval(self.i);
//   // };
// }

// DEBUG:
// function WebAPIConcept(type = '', delay) {
//   const self = this;
//   const clearConfig = {
//     setTimeout: 'clearTimeout',
//     setInterval: 'clearInterval',
//   };
//   const typeClear = clearConfig[type];
//   self.type = type;
//   self.typeClear = typeClear;
//   self.paused_timeLeft = 0;
//   self.triggerSetAt = new Date().getTime();
//   self.t_restart = null;
//   self.triggerTime = self.triggerSetAt + self.delay;

//   self.getTimeLeft = function () {
//     let now = new Date();
//     return self.triggerTime - now;
//   };

//   // self.start = function (callback, ms) {
//   //   self.ti = window[type](callback || self.func, ms || self.delay);
//   // };

//   // self.pause = function () {
//   //   self.paused_timeLeft = self.getTimeLeft();
//   //   window[typeClear](self.ti);
//   //   self.ti = null;
//   // };

//   // self.resume = function () {
//   //   if (self.ti == null) {
//   //     self.ti = window[type](self.func, self.paused_timeLeft, self);
//   //   }
//   // };
//   // self.restart = function (sender) {
//   //   sender.ti = window[type](sender.func, sender.delay);
//   // };

//   // clear
//   self[typeClear] = function () {
//     window[typeClear](self.ti);
//   };

//   return WebAPIConcept;
// }
