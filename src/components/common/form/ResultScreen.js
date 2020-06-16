import store from 'store';
import { Component } from 'core';
import { PlainButton } from 'components/common/button';
import { history } from 'lib/utils';
import { mapper } from 'lib/mapper';
import { hashUrlParser } from 'lib/utils';
import 'components/common/form/form.scss';

const getDataElem = name => document.querySelector(`[data-name='${name}']`);
const pageUrl = mapper.pageUrl;
class ResultScreen extends Component {
  model() {
    const { score, averageTime } = store.state.gameResult || {};
    this.scoreElem = getDataElem('score');
    this.averageTimeElem = getDataElem('averageTime');
    this.controlBtn = getDataElem('controlBtn');
    this.resultContainerElem = getDataElem(['resultContainer']);
    this.atempUrl = hashUrlParser().get('attempt');
    this.attempCount = self.atempUrl ? Number(self.atempUrl) + 1 : 1;
    this.score = score;
    this.averageTime = averageTime;
    this.pushUrl = `${pageUrl.index}?attempt=${self.attempCount}`;
  }
  controller() {
    const self = this;
    /**
     * NOTE: 다시시작 버튼 이벤트 (게임 화면으로 이동)
     */
    self.controlBtn.addEventListener('click', function () {
      store.state.gameResult = null;
      history.push(self.pushUrl);
    });
    self.scoreElem.innerHTML = `당신의 점수는 ${self.score}점 입니다.`;
    self.averageTimeElem.innerHTML = `단어당 평균 답변 시간은 ${self.averageTime}초입니다.`;
    self.resultContainerElem.classList.add('active');
  }
  render() {
    return `
    <div class="container wrap WordGame result" data-name="resultContainer">
      <div class="word__box">
        <div class="word__rows center">
          <h3 class="result__info title">Mission Complete!</h3>
          <p data-name="score" class="result__info score">당신의 점수는 00점 입니다.</p>
          <p data-name="averageTime" class="result__info average">단어당 평균 답변 시간은 00초입니다.</p>
        </div>
        <div class="word__rows center">
          ${PlainButton({ class: 'word__btn control', 'data-name': 'controlBtn' }, '다시 시작')}
        </div>
      </div>
    </div>
    `;
  }
}
function ResultScreenComponent() {
  const component = new ResultScreen();
  return component.insert();
}

export default ResultScreenComponent;
