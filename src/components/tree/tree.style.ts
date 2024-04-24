import { animated } from '@react-spring/web';
import styled from 'styled-components';

export const Content = styled(animated.div)<{ open: boolean }>`
  will-change: transform, opacity, height;
  margin-left: 6px;
  padding: 0px 0px 0px 14px;
  border-left: 1px dashed rgba(255, 255, 255, 0.4);
  overflow: hidden;
`;

export const toggle = {
  width: '1em',
  height: '1em',
  cursor: 'pointer',
  verticalAlign: 'middle',
};