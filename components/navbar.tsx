import {MenuItem} from "components/styled/menuItem";
import {useAppDispatch} from "../store/store";
import {newsActions, useNewsSelector} from "../store/news";
import {useState} from "react";
import searchSvg from '../images/search.svg';
import Image from 'next/image';

const menu = ['news', 'bookmarks'] as const;

export type MenuItemTextType = typeof menu[number];

export const Navbar = () => {
  const selected = useNewsSelector<MenuItemTextType>((state) => state.selectedMenu);
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState('');

  const handleSearch = () => dispatch(newsActions.changeSearch(search));

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

    <div css={`position: relative; padding-right: 22px;`}>
      <div
        onClick={handleSearch}
        css={`
          position: absolute;
          top: 6px;
          left: 6px;
          cursor: pointer;
      `}
      >
        <Image src={searchSvg} height={16} width={16} alt={'Search'} />
      </div>
      <input
        value={search}
        onKeyPress={(e) => {
          if (e.key === 'Enter') handleSearch()
        }}
        placeholder={'Search'}
        onChange={(e) => {
          setSearch(e.target.value);
          if (!e.target.value) {
            dispatch(newsActions.changeSearch(''));
          }
        }}
        css={`
          background-color: #191919; border: 0;
          height: 25px;
          color: #fff;
          padding-left: 30px;
          border-radius: 3px;
        `}
      />
    </div>
  </div>
}