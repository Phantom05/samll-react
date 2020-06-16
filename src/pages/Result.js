import store from 'store';
import { Component } from 'core';
import { PlainTemplate } from 'components/base/template';
import { ResultScreen } from 'components/common/form';
import { PlainHeader } from 'components/common/header';
import { mapper } from 'lib/mapper';
import { history, clearAllWebApi } from 'lib/utils';
const pageUrl = mapper.pageUrl;
class Result extends Component {
  render() {
    if (store.state.gameResult === null) {
      clearAllWebApi();
      history.push(pageUrl.error);
      return null;
    }

    return PlainTemplate({
      header: PlainHeader(),
      content: ResultScreen(),
    });
  }
}

export default Result;
