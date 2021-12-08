import {useAppDispatch} from "../store/store";
import {newsActions, useNewsSelector} from "../store/news";
import React, {useCallback, useState} from "react";
import searchSvg from '../images/search.svg';
import Image from 'next/image';
import styled, {css} from "styled-components";

const menu = ['news', 'bookmarks'] as const;

export type MenuItemTextType = typeof menu[number];

export const Navbar = () => {

  return <NavbarContainer>
    <MenuMemo />
    <MemoSearch />
  </NavbarContainer>
}

const Search = () => {
  const [search, setSearch] = useState('');
  const dispatch = useAppDispatch();

  const handleSearch = useCallback(() => {
    dispatch(newsActions.changeSearch(search));
  }, []);

  return <div css={`position: relative; padding-right: 22px;`}>
    <MemoSearchButton handleSearch={handleSearch} />
    <Input
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
    />
  </div>
}

const MemoSearch = React.memo(Search);

const SearchButton = ({handleSearch}: { handleSearch: () => void }) => {
  return <SearchButtonContainer onClick={handleSearch}>
    <Image src={searchSvg} height={16} width={16} alt={'Search'} />
  </SearchButtonContainer>
}

const MemoSearchButton = React.memo(SearchButton);

const Menu = () => {
  const selected = useNewsSelector<MenuItemTextType>((state) => state.selectedMenu);
  const dispatch = useAppDispatch();

  return <div>
    {menu.map((e) => (
      <MenuItem
        active={selected === e}
        key={e}
        onClick={() => dispatch(newsActions.changeSelectMenu(e))}>
        {e.slice(0, 1).toUpperCase() + e.slice(1)}
      </MenuItem>
    ))}
  </div>
}

const MenuMemo = React.memo(Menu);

const Input = styled.input`
  background-color: #191919; border: 0;
  height: 25px;
  color: #fff;
  padding-left: 30px;
  border-radius: 3px;
`;

const SearchButtonContainer = styled.div`
  position: absolute;
  top: 6px;
  left: 6px;
  cursor: pointer;
`;

const NavbarContainer = styled.div`
  height: 83px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MenuItem = styled.span<{ active: boolean }>`
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