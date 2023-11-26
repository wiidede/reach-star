import type { Bag, Goal, Rcd, Time } from '~/types/common'

function get() {
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

export function useStarStore(loadedCallback?: (value: StarStore | null) => void) {
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
    loadedCallback && loadedCallback(_store)
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
