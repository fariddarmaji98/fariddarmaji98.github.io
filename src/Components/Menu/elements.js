import styled from 'styled-components';
import { PX_TO_VW } from '../../constants/cssConfig';

export const MenuRoot = styled.div({
  // border: '1px solid red'
});

export const MenuWrapper = styled.ul({
  // border: '1px solid red',
  display: 'flex',
  gap: PX_TO_VW(10),
  padding: 0,
  margin: 0,

  '&& > a': {
    textDecoration: 'none',
  }
});

export const MenuContent = styled.li({
  // border: '1px solid red',
  listStyle: 'none',
  cursor: 'pointer',
  padding: PX_TO_VW(20),
  backgroundColor: '#5B88FC',
  borderRadius: PX_TO_VW(10),
  color: '#ffffff',
  fontSize: PX_TO_VW(25),
  fontWeight: 600
});

