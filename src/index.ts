import DATA from '../lib'
import type { Data, Rule } from '../lib'


function getRules(data: Data, href: string): Rule[] {
  return Object.values(data.providers).filter(rule => {
    return !rule.exceptions.some(i => new RegExp(i).test(href)) && new RegExp(rule.urlPattern).test(href)
  })
}


function applyRule(rule: Rule, href: string): string {
  const url = new URL(href)

  for (const param of rule.rules.map(i => new RegExp(i))) {
    url.searchParams.forEach((_, name) => {
      if (param.test(name)) {
        url.searchParams.delete(name);
      }
    })
  };

  return url.href
}


function clean() {
  const href = location.href
  const rules = getRules(DATA, href);
  let cleaned = href;
  for (const rule of rules) {
    cleaned = applyRule(rule, cleaned)
  }

  if (cleaned !== href) {
    // window.location.replace(cleaned);
    window.history.replaceState(window.history.state, "", cleaned);

  }
}

clean()

// https://stackoverflow.com/questions/6390341/how-to-detect-if-url-has-changed-after-hash-in-javascript
const oldPushState = history.pushState;
history.pushState = function pushState() {
  // @ts-ignore
  // biome-ignore lint/style/noArguments: <explanation>
  const ret = oldPushState.apply(this, arguments);
  window.dispatchEvent(new Event('pushstate'));
  // window.dispatchEvent(new Event('locationchange'));
  return ret;
};

const oldReplaceState = history.replaceState;
history.replaceState = function replaceState() {
  // @ts-ignore
  // biome-ignore lint/style/noArguments: <explanation>
  const ret = oldReplaceState.apply(this, arguments);
  window.dispatchEvent(new Event('replacestate'));
  // window.dispatchEvent(new Event('locationchange'));
  return ret;
};

for (const eventName of [
  "popstate",
  // 'hashchange',
  // "navigate",
  // "load",
  "replacestate",
  "pushstate"
]) {
  // @ts-ignore
  window.addEventListener(eventName, clean);
}
