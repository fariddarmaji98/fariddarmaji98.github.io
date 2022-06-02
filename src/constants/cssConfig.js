export const SIZE = {
  MOBILE_S: '320px',
  MOBILE_M: '375px',
  MOBILE: '411px',
  MOBILE_L: '425px',
  TABLET: '768px',
  LAPTOP: '1024px',
  LAPTOP_L: '1440px',
  DEKSTOP: '2560px',
}

export const PX_TO_VW = (size, breakpoint = 1440) =>
  `${(size / breakpoint) * 100}vw`

export const PADDING = {
  CONTAINER: `0 ${PX_TO_VW(90)}`,
  CONTAINER_2: `${PX_TO_VW(95)} ${PX_TO_VW(90)}`,
  CONTAINER_3: `0 ${PX_TO_VW(90)}`,
}

export const COLOR = {
  TEXT_BLACK: '#333333',
  TEXT_MUTED: '#999999',
  TEXT_DANGER: '#FF0739',
}
