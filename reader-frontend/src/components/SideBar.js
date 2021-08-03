import React from 'react'
import styled from 'styled-components'
import AddSubsPanel from './AddSubPanel'
import SubsPanel from './SubsPanel'

const SideBarDiv  = styled.div`
  width: 20%;
  padding: 10px;
`

const SideBar = () => {
  
  return(
    <SideBarDiv>
      <AddSubsPanel />
      <SubsPanel />
    </SideBarDiv>
  )
}

export default SideBar
