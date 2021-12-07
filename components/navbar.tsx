import {MenuItem} from "components/styled/menuItem";

const menu = ['news', 'bookmarks'] as const;

export type MenuItemTextType = typeof menu[number];

export const Navbar = ({selected, setSelected}: { selected: MenuItemTextType, setSelected: (e: MenuItemTextType) => void }) => {
  return <div css={`
      height: 83px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    `}>
    <div>
      {menu.map((e) => (
        <MenuItem
          active={selected === e}
          key={e}
          onClick={() => setSelected(e)}>
              {e.slice(0, 1).toUpperCase() + e.slice(1)}
            </MenuItem>
      ))}
    </div>

    <div>

    </div>
  </div>
}