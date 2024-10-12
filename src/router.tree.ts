export const routerTree = {
  home: {
    index: '/',
    pokemons: {
      index: '/pokemons',
      details: '/pokemons/:id',
    },
  },
} as const
