import styled from 'styled-components';
import { PX_TO_VW } from '../../constants/cssConfig';

export const PsbbRoot = styled.div({
  // border: '1px solid red',  
});

export const PsbbWrapper = styled.div({
  // border: '1px solid red',
  display: 'flex',
  flexDirection: 'column',
  gap: PX_TO_VW(20),
  marginBottom: PX_TO_VW(50)
});


export const InputWrapper = styled.div({
  // border: '1px solid orange',
  display: 'flex',
  flexDirection: 'column',
  gap: PX_TO_VW(10),
});

export const ProccessButton = styled.button({
  border: 0,
  cursor: 'pointer',
  padding: `${PX_TO_VW(16)} ${PX_TO_VW(20)}`,
  backgroundColor: '#06113C',
  borderRadius: PX_TO_VW(10),
  color: '#ffffff',
  fontSize: PX_TO_VW(25),
  fontWeight: 600
});

export const OutputWrapper = styled.div({
  border: '1px solid orange',
});

export const BusInfoWrapper = styled.div({
  border: '1px solid purple'
})

