import styled from 'styled-components';
import { PX_TO_VW } from '../constants/cssConfig';

export const LayoutRoot = styled.main({
  border: '1px solid blue',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#2980B9',
  background: '-webkit-linear-gradient(to right, #FFFFFF, #6DD5FA, #2980B9)',
  background: 'linear-gradient(to right, #FFFFFF, #6DD5FA, #2980B9)',
});

export const HeaderTitle = styled.span({
  // border: '1px solid red',
  fontSize: PX_TO_VW(40),
  fontWeight: 600,
  color: '#205375',
  marginBottom: PX_TO_VW(30)
})
