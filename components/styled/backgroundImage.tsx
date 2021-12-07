import styled from "styled-components";

export const BackgroundContainer = styled.div<{ height: number, width: number }>`
    display: inline-block;
    overflow: hidden;
    position: relative;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    z-index: 1;
    margin: 0 18px 18px 0;
    border-radius: 6px;
`;

export const Background = styled.div`
  ${BackgroundContainer} > & {
    pointer-events: none;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;

    background: linear-gradient(180deg, rgba(28, 58, 82, 0) 0%, #05141B 75.5%);
    opacity: 0.49;
  }
`;