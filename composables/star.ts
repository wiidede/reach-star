import type { Bag, Goal, Rcd, Time } from '~/types/common'

function get() {
  if (!import.meta.client)
    return
  const localValue = localStorage.getItem('reach-star-storage')
  return localValue ? JSON.parse(localValue) : undefined
}

function set(value: StarStore) {
  if (!import.meta.client)
    return
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
    goals: [],
    records: [],
    days: [],
    weeks: [],
    bags: [],
  }

  const getStore = async () => {
    const _store = await get() as StarStore | null
    if (!_store && !route.path.endsWith('/app/about'))
      router.push('/app/about')
    store.value = _store
  }

  getStore()

  watch(store, (value) => {
    if (!value)
      return
    set(_cloneDeep(value))
  }, {
    deep: true,
  })

  return {
    store,
    defaultStore,
  }
}
