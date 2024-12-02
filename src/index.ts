import { clean } from './tool';

export function main() {
  const href = location.href
  const cleaned = clean(href);

  if (cleaned !== href) {
    // window.location.replace(cleaned);
    window.history.replaceState(window.history.state, "", cleaned);
  }
}
main()

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
  window.addEventListener(eventName, main);
}
