import store from 'store';
import { Component } from 'core';
import { history, hashUrlParser } from 'lib/utils';
import { PlainButton } from 'components/common/button';
import { WordRelay } from 'lib/utils';
import { api } from 'lib/api';
import { mapper } from 'lib/mapper';
import './form.scss';

const pageUrl = mapper.pageUrl;
const getDataElem = name => document.querySelector(`[data-name='${name}']`);
class WordGame extends Component {
  async model() {
    const { data } = await api.getWordList();
    this.containerElem = getDataElem('container');
    this.questionElem = getDataElem('question');
    this.scoreElem = getDataElem('score');
    this.timeElem = getDataElem('time');
    this.inputElem = getDataElem('input');
    this.controlBtn = getDataElem('controlBtn');
    this.headerElem = getDataElem('header');
    this.spinnerElem = getDataElem('spinner');
    this.atempUrl = hashUrlParser().get('attempt');
    this.data = data;
  }

  controller() {
    const self = this;
    const gameConfig = {
      items: self.data,
      render: domUpdate,
    };
    const game = new WordRelay(gameConfig);

    if (self.atempUrl) {
      self.containerElem.classList.remove('unActive');
      self.spinnerElem.classList.add('hidden');
      self.inputElem.focus();
      game.start(1);
      history.replace(pageUrl.index);
    }
    /**
     * NOTE: // event start, reset, restart btn
     */
    self.controlBtn.addEventListener('click', function () {
      const { stage } = game.result();
      if (stage === 0) {
        game.start(1);
      } else if (stage === 1) {
        game.reset();
      } else if (stage === 2) {
        game.restart();
      }
    });

    /**
     * NOTE: enter keyboard
     */
    self.inputElem.addEventListener('keyup', function (e) {
      const { target, key: Key } = e;
      if (Key === 'Enter') {
        game.input(target.value);
        self.inputElem.value = '';
      }
    });

    /**
     * NOTE: Dom Update
     * @param {*} obj
     */
    function domUpdate(obj = {}) {
      const { name, type, data = {} } = obj;
      const { state } = data;
      const { score: stateScore, count: stateCount, question: stateQuestion } = state;

      if (type === 'screen') {
        if (name === 'start') {
          self.controlBtn.value = '초기화';
          self.headerElem.classList.remove('hidden');
          self.inputElem.type = 'input';
          self.inputElem.value = '';
          self.inputElem.classList.remove('hidden');
          self.inputElem.focus();
        }
        if (name === 'reset') {
          self.controlBtn.value = '시작';
          self.headerElem.classList.remove('hidden');
          self.inputElem.type = 'button';
          self.inputElem.value = '입력';
          self.inputElem.classList.remove('hidden');
        }

        if (name === 'finish') {
          store.dispatch('gameItem', data.result());
          history.push(pageUrl.result);
        }
      } else {
        self.timeElem.innerHTML = stateCount;
        self.questionElem.innerHTML = stateQuestion;
        self.scoreElem.innerHTML = stateScore;
      }
    }
  }
  render() {
    const atempUrl = hashUrlParser().get('attempt');
    const activeClassName = atempUrl ? 'unActive' : '';
    const spinnerActiveClassName = atempUrl ? '' : 'hidden';

    return `
    <div class="spinner box ${spinnerActiveClassName}" data-name="spinner">
      <p class="spinner item"></p>
    </div>
    <div class="container wrap WordGame ${activeClassName}" data-name="container">
    <div class="word__box" >
      <div data-name="header" class="word__rows">
        <div class="word__display item timer">남은 시간 : <span data-name="time">0</span>초</div>
        <div class="word__display item score">점수 : <span data-name="score">0</span>점</div>
      </div>
      <div class="word__rows center">
        <h2 data-name="question" class="word__question">문제 단어</h2>
      </div>
      <div class="word__rows center">
      ${PlainButton(
        { 'data-name': 'input', class: 'word__btn input', autocomplete: 'off' },
        '입력',
      )}
      </div>
      <div class="word__rows center">
        ${PlainButton({ 'data-name': 'controlBtn', class: 'word__btn control' }, '시작')}
      </div>
    </div>
  </div>
    `;
  }
}

function WordGameComponent() {
  const component = new WordGame();
  return component.insert();
}

export default WordGameComponent;
