import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
  target: HTMLElement
}

export function Portal(props: PortalProps) {
  const { children, target } = props;

  return createPortal(children, target);
}
