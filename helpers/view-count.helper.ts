import { VIEW_COUNT_REGEX } from '../constants'

export const hasViewCountData = ({ data }: cheerio.Element) => {
  if (!data) {
    return false
  }
  return VIEW_COUNT_REGEX.test(data)
}

export const getViewCountFrom = (data: string) => {
  if (!data) {
    return null
  }
  return VIEW_COUNT_REGEX.exec(data)[1]
}
