import type { Bag, Goal, Rcd, Time } from '~/types'

function get() {
  if (import.meta.env.SSR) {
    return undefined
  }
  const localValue = localStorage.getItem('reach-star-storage')
  return localValue ? JSON.parse(localValue) : undefined
}

function set(value: StarStore) {
  localStorage.setItem('reach-star-storage', JSON.stringify(value))
}

export interface StarStore {
  totalScore: number
  goals: Goal[]
  records: Rcd[]
  days: Time[]
  weeks: Time[]
  bags: Bag[]
}

const store = ref<null | StarStore>(null)

export function useStarStore() {
  const route = useRoute()
  const router = useRouter()

  const defaultStore: StarStore = {
    totalScore: 0,
    goals: [
      {
        goalName: 'Welcome',
        goalScore: 1,
        oneTimeContent: 'Welcome to Reach Star ✨',
        oneTimeScore: 1,
        color: 'yellow',
        icon: 'i-solar-star-shine-bold-duotone',
        timeRange: [
          1680940800000,
          4102329600000,
        ],
        points: [],
        currentScore: 0,
        doneTime: 0,
        records: [],
      },
    ],
    records: [],
    days: [],
    weeks: [],
    bags: [],
  }

  const getStore = async () => {
    const _store = await get() as StarStore | null
    if (!_store && !route.path.endsWith('/about'))
      router.push('/about')
    store.value = _store
  }

  getStore()

  watch(store, (value) => {
    if (!value)
      return
    set(value)
  }, {
    deep: true,
  })

  return {
    store,
    defaultStore,
  }
}
