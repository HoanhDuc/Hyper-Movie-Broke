import { AnimationProps } from 'framer-motion';

export interface TimelineEventProps {
  active?: boolean;
  children: React.ReactNode;
  last?: boolean;
}

export interface ExternalLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export interface NavItemHeaderAnimation {
  name: string;
  x: number;
  y: number;
  w: string;
}

export interface NavItemProps {
  href: string;
  text: string;
}

export interface AnimationContainerProps extends AnimationProps {
  children: React.ReactNode;
  className?: string;
  customDelay?: number;
  style?: Object;
}

export interface CardProjectProps {
  id?: string;
  title: string;
  des: string;
  // category: string[];
  category: string; // FIX THIS
  link: string;
}
