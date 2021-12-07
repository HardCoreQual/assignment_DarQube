import styled, {css} from "styled-components";

export const MenuItem = styled.span<{ active: boolean }>`
  font-family: Ubuntu;
  font-size: 28px;
  font-style: normal;
  cursor: pointer;
  font-weight: 700;
  color: #FFFFFF;
  line-height: 32px;
  margin-right: 20px;
  letter-spacing: 0em;
  text-align: left;
  ${props => !props.active && css`opacity: 0.5`}
`