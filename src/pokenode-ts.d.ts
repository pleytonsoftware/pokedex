import * as pokenode from 'pokenode-ts'

declare module 'pokenode-ts' {
  interface Pokemon extends pokenode.Pokemon {
    cries: {
      latest: string
      legacy: string
    }
  }
}
