import React, { useEffect, useState } from 'react'
import * as JsSearch from 'js-search'

type Props = {
  items: any[]
  fields: string[]
  onResult: Function
}

const Search = ({ items, fields, onResult }: Props) => {
  const [search, setSearchInstance] = useState()

  useEffect(() => {
    const searchInstance = new JsSearch.Search('id')
    fields.forEach(field => searchInstance.addIndex(field))
    items.forEach(item => {
      // @ts-ignore
      if (item.ingredients) {
        // @ts-ignore
        for (let i = 0; i <= item.ingredients.length; i++) {
          searchInstance.addIndex(['ingredients', `${i}`, 'name'])
        }
      }
    })
    searchInstance.addDocuments(items)
    setSearchInstance(searchInstance)
  }, [items])

  const handleSearchQueryChange = (e: any) => {
    if (!search) return
    const query = e.target.value
    if (query === '') {
      onResult(items)
    } else {
      onResult(search.search(e.target.value))
    }
  }

  return (
    <input
      type="text"
      placeholder="search"
      onChange={handleSearchQueryChange}
    />
  )
}

export default Search
