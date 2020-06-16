import { elt, parseHTML } from 'lib/utils';
import { mapper } from 'lib/mapper';
import { address, NODE_PROD } from 'lib/config';
import './header.scss';

function PlainHeader(props = {}) {
  if (NODE_PROD) return;
  const linkList = parseHTML(`
    <div>
      <a 
        href="${mapper.pageUrl.index}"
        class="PlainHeader__link"
      >Home</a>
      <a 
        href="${mapper.pageUrl.result}"
        class="PlainHeader__link"
      >Result</a>

      <span class="PlainHeader__profile box">
        <a 
          href="${address.github}" target="_blank"
          class="PlainHeader__link profile name"
        >Lee JunYeong</a>
      </span>
      
    </div>
  `);
  return elt('header', { class: 'PlainHeader' }, linkList);
}

export default PlainHeader;
