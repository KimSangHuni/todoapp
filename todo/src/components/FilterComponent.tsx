import React, { useEffect, useState } from 'react'
import { Box, BoxFlex } from './container/container'
import { Typography } from './typography/typography'
import styled from 'styled-components'
import { TodoBase } from 'types/todo'
import { color } from 'styles/color'
import { filterState } from 'recoil/todo/atoms'
import { useRecoilState } from 'recoil'

export type Filter = {
  idx: number;
  text: string;
  content: keyof TodoBase;
  value: boolean;
}


function FilterComponent({
  text, idx
}: Filter) {
  const [filter, setFilter] = useRecoilState(filterState);
  const [active, setActive] = useState(false);

  const handler = () => {
    let copy = {...filter[0]};
    let copyFilter = [...filter];

    copy.value = !copy.value;
    copyFilter[idx] = copy;

    setFilter(copyFilter);
    setActive(prev => !prev);
  }

  return (
    <FilterBox $active={active} onClick={handler}>
      <Typography style={{ color: active ? color.white : color.text }}>{text}</Typography>
    </FilterBox>
  )
}

const FilterBox = styled(Box)<{ $active: boolean }>`
  padding: 8px 12px;
  cursor: pointer;
  width: 80px;
  text-align: center;
  color: ${({$active}) => $active ? color.white : color.text};
  background: ${({$active}) => $active ? color.primary : color.background};
`

export default FilterComponent
