export const isFulfilled = <T = {}>(result: PromiseSettledResult<T>) =>
  result.status === 'fulfilled'

export const isRejected = <T = {}>(result: PromiseSettledResult<T>) =>
  result.status === 'rejected'

export const getFulfilledResults = <T = {}>(
  results: PromiseSettledResult<T>[],
) => {
  return results
    .filter(isFulfilled)
    .map((v) => (v as PromiseFulfilledResult<T>).value)
}

export const getRejectedResults = <T = {}>(
  results: PromiseSettledResult<T>[],
) => {
  return results
    .filter(isRejected)
    .map((v) => (v as PromiseRejectedResult).reason)
}
