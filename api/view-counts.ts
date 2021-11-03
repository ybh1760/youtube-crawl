import { VercelRequest, VercelResponse } from '@vercel/node'

import { getFulfilledResults, getRejectedResults } from '../helpers'
import { YoutubeCrawlService } from '../services'

export default async (request: VercelRequest, response: VercelResponse) => {
  const { codes }: { codes: string[] } = request.body

  const youtubeCrawlService = new YoutubeCrawlService()
  const results = await Promise.allSettled(
    codes.map(
      (code) =>
        new Promise(async (resolve, reject) => {
          try {
            const viewCount = await youtubeCrawlService.crawlViewCount(code)
            resolve({ code, viewCount })
          } catch (err) {
            reject({ code })
          }
        }),
    ),
  )

  const fulfilledResults = getFulfilledResults(results)
  const rejectedResults = getRejectedResults(results)

  response.status(200).send({
    fulfilled: fulfilledResults,
    rejected: rejectedResults,
  })
}
