import { ReactNode } from "react";

export interface AccordionProps {
    controllerElement: (isExpanded: boolean) => ReactNode;
    children: ReactNode;
    isExpanded: boolean;
    setIsExpanded: (value: ((prevState: boolean) => boolean) | boolean) => void;
  }