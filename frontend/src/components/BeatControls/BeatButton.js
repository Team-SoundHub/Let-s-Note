import styled from 'styled-components'

const BeatButton = styled.div`
  width: ${props => props.size || 50}px;
  height: ${props => props.size || 50}px;
  margin: 8px;
  border-radius: ${props => props.size / 2 || 25}px;;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: none;
  -webkit-transition: box-shadow 200ms;
  transition: box-shadow 200ms;
  transition-timing-function: ease-in-out;

  &:hover {
    box-shadow: 0 0 5px 3px #FFFFFF40;
  }
`

export default BeatButton
