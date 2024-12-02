import DATA, { type Data, type Rule } from "../lib";

export function isLocal(s: string): boolean {
  const url = new URL(s);
  const host = url.hostname

  console.log("host", host, (/^\d/).test(host))

  return (/^\d/).test(host) || host === 'localhost' || ["10.0.0.0/8", "172.16.0.0/12",
    "192.168.0.0/16", "100.64.0.0/10",
    "169.254.0.0/16", "127.0.0.1"].includes(host)
}



export function regTest(reg: string, s: string): boolean {
  return new RegExp(reg).test(s)
}

export function getRules(data: Data, href: string): Rule[] {
  return Object.values(data.providers).filter(rule => {
    return !rule.exceptions.some(i => regTest(i, href)) && regTest(rule.urlPattern, href)
  })
}

export function applyRule(rule: Rule, href: string): string {
  const url = new URL(href)

  for (const name of [...url.searchParams.keys()]) {
    for (const param of rule.rules) {
      if (rule.referralMarketing.includes(param)) {
        continue
      }
      if (regTest(param, name)) {
        url.searchParams.delete(name);
      }
    };

    for (const raw of rule.rawRules) {
      url.href = url.href.replace(new RegExp(raw), '')
    }
  }

  return url.href
}


export function clean(href: string): string {
  const rules = getRules(DATA, href);
  let cleaned = href;
  for (const rule of rules) {
    cleaned = applyRule(rule, cleaned)
    if (rule.completeProvider) {
      break
    }
  }
  return cleaned
}