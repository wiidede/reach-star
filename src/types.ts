import type { ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

interface RcdInfo {
  time: number
}

export interface Goal {
  goalName: string
  goalScore: number
  oneTimeContent: string
  oneTimeScore: number
  color: string
  icon: string
  timeRange: [number, number]
  points: GoalPoint[]
  currentScore: number
  doneTime: number
  records: RcdInfo[]
}

export interface Rcd {
  content: string
  point: number
  color: string
  icon: string
  time: number
  remark: string
}

export interface Time {
  time: number
  goalScore: number
  color: string
  currentScore: number
  doneTime: number
  records: RcdInfo[]
}

export type Bag =
({ type: 'goal' } & Goal) |
({ type: 'day' | 'week' } & Time) |
({ type: 'reward' } & Reward)

export interface Reward {
  icon: string
  color?: string
  doneTime: number
  doneTimes: number[]
}

export interface GoalPoint {
  value: number
  icon: string
}

export interface TheDescData {
  label: string
  value: string
  span?: number
}

export interface TheAchievementModalContent {
  icon: string
  content: string
  color?: string
}

export interface TheFeedbackContent {
  content: string
  type: 'success' | 'error'
}
