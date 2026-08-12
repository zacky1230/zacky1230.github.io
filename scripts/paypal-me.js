'use strict';

const WECHAT_BUTTON = /(<a(?=[^>]*\bclass="button donate")(?=[^>]*\bdata-type="wechat"))/g;

function escapeAttribute(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

hexo.extend.filter.register('after_render:html', html => {
  const paypal = hexo.theme.config.paypal_me;

  if (!paypal || !paypal.url || html.includes('data-type="paypal"')) {
    return html;
  }

  const url = escapeAttribute(String(paypal.url));
  const button = `<a class="button donate" href="${url}" target="_blank" rel="noopener noreferrer" data-type="paypal"><span class="icon is-small"><i class="fab fa-paypal"></i></span><span>PayPal</span></a>`;

  return html.replace(WECHAT_BUTTON, `${button}$1`);
}, 20);
