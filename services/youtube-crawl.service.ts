import axios from 'axios'
import * as cheerio from 'cheerio'

import { YOUTUBE_BASE_URL } from '../constants'
import { getViewCountFrom, hasViewCountData } from '../helpers'

export class YoutubeCrawlService {
  private async getHtml(code: string) {
    const { data } = await axios({
      method: 'get',
      baseURL: YOUTUBE_BASE_URL,
      params: {
        v: code,
      },
    })
    return data
  }

  async crawlViewCount(code: string) {
    const html = await this.getHtml(code)

    const $ = cheerio.load(html)
    const scripts = $('script').contents().toArray()
    const script = scripts.filter(hasViewCountData)[0]

    return getViewCountFrom(script.data)
  }
}
