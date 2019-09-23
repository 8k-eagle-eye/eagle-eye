// ref: https://github.com/zeit/next.js/blob/canary/examples/with-mobx/store.js
import { action, observable } from 'mobx'
import { useStaticRendering } from 'mobx-react'

export interface StoreData {
  lastUpdate: number
  light: boolean
}

const isServer = typeof window === 'undefined'
useStaticRendering(isServer) // eslint-disable-line react-hooks/rules-of-hooks

export class Store {
  @observable public lastUpdate = 0

  @observable public light = false

  public timer = 0

  public hydrate(serializedStore: StoreData) {
    this.lastUpdate = serializedStore.lastUpdate != null ? serializedStore.lastUpdate : Date.now()
    this.light = !!serializedStore.light
  }

  @action public start = () => {
    this.timer = setInterval(() => {
      this.lastUpdate = Date.now()
      this.light = true
    }, 1000)
  }

  public stop = () => clearInterval(this.timer)
}

export async function fetchInitialStoreState() {
  // You can do anything to fetch initial store state
  return {}
}
