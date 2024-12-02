import {test,expect} from 'vitest'

import {clean, isLocal} from '../src/tool'

test("isLocal", ()=>{
  expect(isLocal("https://www.youtube.com/")).toBe(false)
  expect(isLocal("http://192.168.0.1:8080/")).toBe(true)
})

test("clean", ()=>{
  expect(clean("https://www.youtube.com/watch?v=BnnbP7pCIvQ")).toBe("https://www.youtube.com/watch?v=BnnbP7pCIvQ")
  expect(clean("http://192.168.0.1:8080/")).toBe("http://192.168.0.1:8080/")
  expect(clean("https://www.bilibili.com/video/BV1f8BCY9Emh/?spm_id_from=333.337.search-card.all.click&vd_source=81bdac61e8f7bbda16b695409d4f8123")).toBe("https://www.bilibili.com/video/BV1f8BCY9Emh/")
})