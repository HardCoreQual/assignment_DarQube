import {MenuItem} from "components/styled/menuItem";
import {useAppDispatch} from "../store/store";
import {newsActions, useNewsSelector} from "../store/news";

const menu = ['news', 'bookmarks'] as const;

export type MenuItemTextType = typeof menu[number];

export const Navbar = () => {
  const selected = useNewsSelector<MenuItemTextType>((state) => state.selectedMenu);
  const dispatch = useAppDispatch();

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
          onClick={() => dispatch(newsActions.changeSelectMenu(e))}>
              {e.slice(0, 1).toUpperCase() + e.slice(1)}
            </MenuItem>
      ))}
    </div>

    <div>

    </div>
  </div>
}