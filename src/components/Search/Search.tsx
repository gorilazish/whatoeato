import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import * as JsSearch from 'js-search'

type Props = {
  items: any[]
  fields: string[]
  onResult: Function
  placeholder?: string
}

const StyledInput = styled.input`
  border: none;
  min-height: 40px;
  padding: 10px;
  background: lightgoldenrodyellow;
`

const Search = ({ items, fields, onResult, ...rest }: Props) => {
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
  }, [items, fields])

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
    <StyledInput
      onClick={e => e.stopPropagation()}
      type="text"
      placeholder="search"
      onChange={handleSearchQueryChange}
      {...rest}
    />
  )
}

export default Search
