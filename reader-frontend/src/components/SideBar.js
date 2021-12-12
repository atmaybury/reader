/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import styled from 'styled-components'
import AddSubsPanel from './AddSubPanel'
import SubsPanel from './SubsPanel'

const SideBarDiv  = styled.div`
  width: 20%;
  padding: 10px;
`
const styles = {
  sidebar: css({ backgroundColor: 'red' }),
  sidebarGreen: { backgroundColor: 'green' }
}

const SideBar = () => {
  
  return(
    <div css={css(styles.sidebarGreen)}>
      <AddSubsPanel />
      <SubsPanel />
    </div>
  )
}

export default SideBar
