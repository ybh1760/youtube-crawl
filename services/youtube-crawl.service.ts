import axios from 'axios'
import * as cheerio from 'cheerio'

import { YOUTUBE_BASE_URL } from '../constants'
import { getViewCountFrom, hasViewCountData } from '../helpers'

export class YoutubeCrawlService {
  private readonly html: string

  constructor(html: string) {
    this.html = html
  }

  static async load(code: string) {
    const { data } = await axios({
      method: 'get',
      baseURL: YOUTUBE_BASE_URL,
      params: {
        v: code,
      },
    })
    return new YoutubeCrawlService(data)
  }

  async scrapViewCount() {
    const $ = cheerio.load(this.html)
    const scripts = $('script').contents().toArray()
    const script = scripts.filter(hasViewCountData)[0]

    return getViewCountFrom(script.data)
  }
}
