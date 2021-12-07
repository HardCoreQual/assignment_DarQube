import {css} from "styled-components";

const menu = ['news', 'bookmarks'] as const;

export type MenuItem = typeof menu[number];

export const Navbar = ({selected, setSelected}: { selected: MenuItem, setSelected: (e: MenuItem) => void }) => {
  return <div css={`
      height: 83px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    `}>
    <div>
      {menu.map((e) => (
        <span
          key={e}
          onClick={() => setSelected(e)}
          css={`
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
              ${selected !== e ? css`opacity: 0.5` : ''}
            `}>
              {e.slice(0, 1).toUpperCase() + e.slice(1)}
            </span>
      ))}
    </div>

    <div>

    </div>
  </div>
}