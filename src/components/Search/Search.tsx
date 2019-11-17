import React, { useEffect, useState, useRef } from 'react'
import styled from '@emotion/styled'
import * as JsSearch from 'js-search'

type Props = {
  items: any[]
  fields: string[]
  onResult: Function
  placeholder?: string
  style?: any
}

const StyledInput = styled.input`
  border: none;
  min-height: 40px;
  padding: 10px;
  background: lightgoldenrodyellow;
`

const Search = ({ items, fields, onResult, ...rest }: Props) => {
  const inputEl = useRef(null)
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
      ref={inputEl}
      onClick={e => e.stopPropagation()}
      type="text"
      placeholder="search"
      onChange={handleSearchQueryChange}
      onFocus={e => {
        if (inputEl.current) {
          const el: any = inputEl.current
          window.scroll({
            top: el.offsetTop,
            behavior: 'smooth'
          })
        }
      }}
      {...rest}
    />
  )
}

export default Search
