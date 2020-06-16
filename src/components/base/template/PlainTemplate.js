import { elt, parseHTML } from 'lib/utils';
import './template.scss';

function PlainTemplate(props = {}) {
  let { header = '', content = '', title = '' } = props;
  const template = elt('div', { class: 'PlainTemplate' }, parseHTML(header));
  const templateContent = elt('div', { class: 'PlainTemplate__content' }, parseHTML(content));

  template.append(templateContent);
  return template;
}

export default PlainTemplate;
