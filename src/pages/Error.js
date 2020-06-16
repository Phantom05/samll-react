import { Component } from 'core';
import { mapper } from 'lib/mapper';
import { clearAllWebApi } from 'lib/utils';

const pageUrl = mapper.pageUrl;
class Error extends Component {
  render() {
    clearAllWebApi();
    return `
    <div class="error page">
      <h3 class="error tx">The wrong approach.</h3>
      <a class="error link" href="${pageUrl.index}">GO HOME.</a>
    </div>
    `;
  }
}
export default Error;
