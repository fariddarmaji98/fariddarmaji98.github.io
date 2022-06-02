import styled from 'styled-components';
import { PX_TO_VW } from '../../constants/cssConfig';

export const SortCharacterRoot = styled.div({
  // border: '1px solid red',  
});

export const SortCharacterWrapper = styled.div({
  // border: '1px solid red',  
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: PX_TO_VW(20),
  marginBottom: PX_TO_VW(30),
});

export const InputElements = styled.input.attrs({
  placeholderTextColor: '#035397'
})({
  borderRadius: PX_TO_VW(8),
  border: 0,
  padding: PX_TO_VW(16),
  fontSize: PX_TO_VW(25),
  color: '#06113C',
  minWidth: PX_TO_VW(600)
});

export const OutputWrapper = styled.div({
  // border: '1px solid red',
  display: 'flex',
  justifyContent: 'center',
  gap: PX_TO_VW(20),
  minHeight: 100
});

export const OutputContent = styled.div((props) => {
  return {
    fontSize: PX_TO_VW(30),
    fontWeight: 500,
    color: '#141E27',
    backgroundColor: '#ffffff',
    borderRadius: PX_TO_VW(8),
    padding: props.fullWidth ? PX_TO_VW(20) : `${PX_TO_VW(10)} ${PX_TO_VW(10)}`,
    width: !props.fullWidth && PX_TO_VW(400),
    maxWidth: props.fullWidth && PX_TO_VW(800),
    overflowWrap: 'break-word',
  }
});


