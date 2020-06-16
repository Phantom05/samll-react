import { Component } from 'core';
import { PlainTemplate } from 'components/base/template';
import { PlainHeader } from 'components/common/header';
import { WordGame } from 'components/common/form';
class Home extends Component {
  render() {
    return PlainTemplate({
      header: PlainHeader(),
      content: WordGame(),
    });
  }
}

export default Home;
