import getWikiResults from '@/lib/getWikiResults'
import React from 'react'
import Item from './components/Item'

type Props = {
  params: {
    searchTerm: string
  }
}

export async function generateMetadata({ params: { searchTerm } }: Props) {
  const wikiData: Promise<SearchResult> = getWikiResults(searchTerm)
  const data = await wikiData
  const displayTerm = searchTerm.replaceAll('%20', ' ')
  console.log('searchTerm:', searchTerm)
  console.log('displayTerm:', displayTerm)

  if (!data?.query?.pages) {
    return {
      title: `${displayTerm} Not Found`,
    }
  }

  return {
    title: displayTerm,
    description: `Search results for ${displayTerm}`,
  }
}

export default async function SearchResults({ params: { searchTerm } }: Props) {
  const wikiData: Promise<SearchResult> = getWikiResults(searchTerm)
  const data = await wikiData
  const displayTerm = searchTerm.replaceAll('%20', ' ')
  const results: Result[] | undefined = data?.query?.pages

  return (
    <main className="bg-slate-200 mx-auto max-w-lg py-1 min-h-screen">
      {results ? (
        Object.values(results).map((result) => {
          return <Item key={result.pageid} result={result} />
        })
      ) : (
        <h2 className="p-2 text-xl">{`'${displayTerm}' Not Found`}</h2>
      )}
    </main>
  )
}
