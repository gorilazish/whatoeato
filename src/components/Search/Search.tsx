/** @jsx jsx */
import React, { useEffect, useState, useRef } from 'react'
import * as JsSearch from 'js-search'
import styled from '@emotion/styled'
import { jsx, css } from '@emotion/core'

import { Category } from '../Dashboard/Recipe'
import CategoryToggle from '../Button/CategoryToggle'
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
  font-size: 1.2rem;
  font-family: inherit;
`

const Search = ({ items, fields, onResult, ...rest }: Props) => {
  const inputEl = useRef(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [search, setSearchInstance] = useState()
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])

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

  const filterByCategoryList = (items: any[], categories: Category[]) => {
    if (categories.length < 1) return items
    let filteredList = []

    filteredList = items.filter(item => {
      if (!item.tags || item.tags.length < 1) return false

      return item.tags.some((tag: any) => categories.includes(tag))
    })

    return filteredList
  }

  useEffect(() => {
    if (!search) return

    if (searchQuery === '') {
      onResult(filterByCategoryList(items, selectedCategories))
    } else {
      onResult(
        filterByCategoryList(search.search(searchQuery), selectedCategories),
      )
    }
  }, [searchQuery, selectedCategories])

  const handleSearchQueryChange = (e: any) => {
    setSearchQuery(e.target.value)
  }

  const resetSearch = () => {
    setSearchQuery('')
    onResult(items)
  }

  return (
    <div
      ref={inputEl}
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        margin: 10px auto 15px;
        width: 100%;
        transition: width 0.5s ease, transform 0.25s ease;
      `}
    >
      {items && (
        <div
          css={css`
            width: 100%;
            display: grid;
            grid-auto-flow: column;
            margin: 10px 0 15px;
            grid-gap: 5px;

            @media (min-width: 640px) {
              grid-gap: 10px;
            }
          `}
        >
          {Object.values(Category).map((item, index) => {
            const isActive = selectedCategories.includes(item)
            return (
              <CategoryToggle
                key={index}
                active={isActive}
                onClick={() => {
                  if (!isActive) {
                    setSelectedCategories([...selectedCategories, item])
                  } else {
                    setSelectedCategories(
                      selectedCategories.filter(
                        selectedTag => item !== selectedTag,
                      ),
                    )
                  }
                }}
              >
                {item}
              </CategoryToggle>
            )
          })}
        </div>
      )}

      <div
        css={css`
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          width: 100%;
          overflow: hidden;
          border: 1px solid lightgray;
        `}
      >
        {searchQuery ? (
          <div
            css={css`
              background-position: center;
              background-size: contain;
              height: 35px;
              width: 35px;
              background-repeat: no-repeat;
              background-image: url(${plus});
              transform: rotate(45deg);
              margin-left: 10px;
              opacity: 0.6;
              cursor: pointer;
            `}
            onClick={resetSearch}
          />
        ) : (
          <div
            css={css`
              background-position: center;
              background-size: contain;
              height: 20px;
              width: 20px;
              background-repeat: no-repeat;
              background-image: url(${searchIcon});
              margin-left: 15px;
              opacity: 0.6;
            `}
          />
        )}
        <StyledInput
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
    </div>
  )
}

export default Search
