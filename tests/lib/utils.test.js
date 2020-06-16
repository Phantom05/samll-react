import * as Utils from '../../src/lib/utils';
import * as config from '../../src/lib/config';

describe('lib/utils', () => {
  // NOTE:
  it('function identity** 6 => 6', () => {
    expect(Utils.identity(6)).toBe(6);
  });

  // NOTE:
  it('function hashUrlParser**', () => {
    const data = Utils.hashUrlParser('http://www.kakao.com/#/?test=10');
    expect(data.has('test')).toEqual(true);
    expect(data.get('test')).toBe('10');
  });

  // NOTE:
  it('function convertObjectToHtmlAttr**', () => {
    const data = Utils.convertObjectToHtmlAttr({ class: 'hello' });
    expect(data).toBe('class="hello"');
  });

  // NOTE:
  it('function elt**', () => {
    const data = Utils.elt('button', { class: 'hello', type: 'button' }, 'click');
    expect(data.className).toBe('hello');
    expect(data.nodeName).toBe('BUTTON');
    expect(data.textContent).toBe('click');
  });

  // NOTE:
  it('function parseHTML**', () => {
    const data = Utils.parseHTML(`<div>hello</div>`);
    expect(data.nodeType).toBe(11);
    expect(data.textContent).toBe('hello');
  });

  // NOTE:
  it('class Ajax** ', () => {
    const ajax = new Utils.Ajax({ baseUrl: config.address.api });
    ajax.get(`/kakaopay-fe/resources/words`).then(res => {
      console.log(res, 'res');
      expect(res).toEqual([]);
    });
  });

  // NOTE:
  it('class WordRelay**', () => {
    const data = Utils.parseHTML(`<div>hello</div>`);
    expect(data.nodeType).toBe(11);
    expect(data.textContent).toBe('hello');
  });
});
