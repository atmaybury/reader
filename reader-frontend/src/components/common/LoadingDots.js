import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

const ANIMATION_TIME = 2

const LoadingDots = () => (
  <DotDiv>
    <DotContainer>
      <Dot1 />
      <Dot2 />
      <Dot3 />
    </DotContainer>
  </DotDiv>
)

const blink = keyframes`
  0% { opacity: 0 }
  50% { opacity: 1 }
  100% { opacity: 0 }
`

const DotDiv = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`

const DotContainer = styled.div`
  width: 60px;
  height: 10px;
  margin: auto;
`

const Dot = styled.div`
  width: 10px;
  height: 10px;
  margin: 0px 5px;
  display: inline-block;
  background-color: white;
  border-radius: 50%;
`

const Dot1 = styled(Dot)`
  animation: ${blink} ${ANIMATION_TIME}s 0s linear infinite;
`

const Dot2 = styled(Dot)`
  animation: ${blink} ${parseInt(ANIMATION_TIME)}s ${ANIMATION_TIME / 3}s linear infinite;
`

const Dot3 = styled(Dot)`
  animation: ${blink} ${ANIMATION_TIME}s ${ANIMATION_TIME / 1.5}s linear infinite;
`


export default LoadingDots;