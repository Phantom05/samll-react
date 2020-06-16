import { address } from 'lib/config';
import { Ajax } from 'lib/utils';

const ajax = new Ajax({ baseUrl: address.api });

export const url = {
  wordGame: `/kakaopay-fe/resources/words`,
};
export const api = {
  getWordList: () => ajax.get(url.wordGame),
};
