export default async function getWikiResults(searchTerm: string) {
  
  // Wikipedia API needs this
  const searchParams = new URLSearchParams({
    action: 'query',
    generator: 'search',
    gsrsearch: searchTerm, // searchTerm
    gsrlimit: '20',
    prop: 'pageimages|extracts',
    exchars: '100',
    exintro: 'true',
    explaintext: 'true',
    exlimit: 'max',
    format: 'json',
    origin: '*',
  })

  const response = await fetch(
    `https://en.wikipedia.org/w/api.php?${searchParams}`
  )

  return response.json()
}
