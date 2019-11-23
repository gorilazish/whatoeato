/** @jsx jsx */
import React, { useEffect, useState, useRef } from 'react'
import * as JsSearch from 'js-search'
import styled from '@emotion/styled'
import { jsx, css } from '@emotion/core'

import searchIcon from './magnifying-glass.png'
import plus from '../Button/plus.png'

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
  margin: 0 auto;
`

const Search = ({ items, fields, onResult, ...rest }: Props) => {
  const inputEl = useRef(null)
  const [searchQuery, setSearchQuery] = useState('')
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
    setSearchQuery(e.target.value)
    if (!search) return
    const query = e.target.value
    if (query === '') {
      onResult(items)
    } else {
      onResult(search.search(e.target.value))
    }
  }

  const resetSearch = () => {
    setSearchQuery('')
    onResult(items)
  }

  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        margin: 30px auto 30px;
        box-shadow: 0px 3px 1px 0px rgba(0, 0, 0, 0.1);
        width: 100%;
        transition: width 0.5s ease, transform 0.25s ease;
      `}
    >
      {searchQuery ? (
        <div
          css={css`
            background-position: center;
            background-size: contain;
            height: 45px;
            width: 45px;
            background-repeat: no-repeat;
            background-image: url(${plus});
            transform: rotate(45deg);
          `}
          onClick={resetSearch}
        />
      ) : (
        <div
          css={css`
            background-position: center;
            background-size: contain;
            height: 30px;
            width: 30px;
            background-repeat: no-repeat;
            background-image: url(${searchIcon});
          `}
        />
      )}
      <StyledInput
        ref={inputEl}
        onClick={e => e.stopPropagation()}
        value={searchQuery}
        type='text'
        placeholder='search'
        onChange={handleSearchQueryChange}
        onFocus={e => {
          if (inputEl.current) {
            const el: any = inputEl.current
            window.scroll({
              top: el.offsetTop,
              behavior: 'smooth',
            })
          }
        }}
        {...rest}
      />
    </div>
  )
}

export default Search
