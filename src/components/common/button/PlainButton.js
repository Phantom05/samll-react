import { convertObjectToHtmlAttr } from 'lib/utils';

function PlainButton(attr, content) {
  return `
  <input 
    type="button" 
    ${convertObjectToHtmlAttr(attr)} 
    value="${content}"
  >
  `;
}

export default PlainButton;
