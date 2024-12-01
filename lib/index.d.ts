export type Rule = {
  "urlPattern": string,
  "completeProvider": boolean,
  "rules": string[],
  "referralMarketing": string[],
  "exceptions": string[],
  "rawRules": string[],
  "redirections": string[],
  "forceRedirection": boolean
}

export type Data = {
  providers: Record<string, Rule>
}


declare const DATA: Data

export default DATA
