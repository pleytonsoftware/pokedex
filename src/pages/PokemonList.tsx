import { PaginationProvider } from '@/core/context/pagination.context'
import { PokemonList } from '@/pokemon/components/pokemon-list'
import { usePokemonList } from '@/pokemon/hooks/use-list-pokemon'

const PokemonListPage = () => {
  const { data, isLoading, error } = usePokemonList()

  return (
    <PaginationProvider initialPage={1} pageSize={3 * 5}>
      <PokemonList data={data} isLoading={isLoading} error={error} />
    </PaginationProvider>
  )
}

export default PokemonListPage
