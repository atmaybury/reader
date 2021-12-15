import styled from '@emotion/styled'
import AddSubsPanel from './AddSubPanel'
import SubsPanel from './SubsPanel'

const SideBar = () => {
  
  return(
    <SideBarDiv>
      <AddSubsPanel />
      <SubsPanel />
    </SideBarDiv>
  )
}

const SideBarDiv  = styled.div`
  width: 20%;
  padding: 10px;
`

export default SideBar
