import _dayjs from 'dayjs'

export const dayjs = _dayjs

export function theSameWeek(time1: number, time2: number) {
  return dayjs(time1).subtract(1, 'day').isSame(dayjs(time2).subtract(1, 'day'), 'week')
}

export const isLargeScreen = useMediaQuery('(min-width: 768px)')

export function getPercentage2Value(percentage: number, min = 0, max = 100, step = 1) {
  if (percentage < 0)
    return min
  if (percentage > 100)
    return max
  const value = min + (max - min) * percentage / 100
  return Math.round(value / step) * step
}

export function getDuplicates(arr: any[]) {
  const duplicates = arr.filter((item, index) => arr.indexOf(item) !== index)
  return [...new Set(duplicates)]
}

export function displayNumber(number: number, fixed = 1) {
  if (typeof number !== 'number')
    return ''
  const n = 10 ** fixed
  return String(Math.round(number * n) / n)
}
