import { VercelRequest, VercelResponse } from '@vercel/node'

import { getFulfilledResults, getRejectedResults } from '../helpers'
import { YoutubeCrawlService } from '../services'

export default async (request: VercelRequest, response: VercelResponse) => {
  const { codes }: { codes: string[] } = request.body
  if (codes.length > 20) {
    response
      .status(400)
      .json({ errorMessage: '최대요청 코드개수는 20개입니다.' })
  }

  const results = await Promise.allSettled(
    codes.map(
      (code) =>
        new Promise(async (resolve, reject) => {
          try {
            const $youtube = await YoutubeCrawlService.load(code)
            const viewCount = await $youtube.scrapViewCount()
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
