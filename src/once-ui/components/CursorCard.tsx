"use client";

import React, {
  useState,
  useRef,
  useEffect,
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from "react";
import {
  Placement,
} from "@floating-ui/react-dom";
import { Flex } from ".";
import styles from "./CursorCard.module.scss";

export interface CursorCardProps extends React.ComponentProps<typeof Flex> {
  trigger?: ReactNode;
  overlay?: ReactNode;
  placement?: Placement;
  className?: string;
  style?: React.CSSProperties;
}

const CursorCard = forwardRef<HTMLDivElement, CursorCardProps>(
  (
    {
      trigger,
      overlay,
      placement = "bottom-left",
      className,
      style,
      ...flex
    },
    ref
  ) => {
    const [isHovering, setIsHovering] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const cardRef = useRef<HTMLDivElement | null>(null);
    const triggerRef = useRef<HTMLDivElement | null>(null);

    useImperativeHandle(ref, () => cardRef.current as HTMLDivElement);
    
    useEffect(() => {
      const checkTouchDevice = () => {
        return ('ontouchstart' in window) || 
               (navigator.maxTouchPoints > 0);
      };
      
      setIsTouchDevice(checkTouchDevice());
    }, []);
    
    const handleMouseMove = useCallback((e: MouseEvent) => {
      if (isHovering && !isTouchDevice) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    }, [isHovering, isTouchDevice]);

    useEffect(() => {
      if (!isTouchDevice) {
        document.addEventListener("mousemove", handleMouseMove);
        
        return () => {
          document.removeEventListener("mousemove", handleMouseMove);
        };
      }
    }, [handleMouseMove, isTouchDevice]);

    return (
      <>
        {trigger && (
          <Flex
            ref={triggerRef}
            onMouseEnter={() => !isTouchDevice && setIsHovering(true)}
            onMouseLeave={() => !isTouchDevice && setIsHovering(false)}
          >
            {trigger}
          </Flex>
        )}
        {isHovering && !isTouchDevice && (
          <Flex
            zIndex={9}
            position="fixed"
            pointerEvents="none"
            {...flex}
            ref={cardRef}
            className={`${styles.fadeIn} ${className || ""}`}
            style={{
              top: mousePosition.y,
              left: mousePosition.x,
              transform: `translate(${placement.includes("left") ? "-100%" : placement.includes("right") ? "0" : "-50%"}, ${placement.includes("top") ? "-100%" : placement.includes("bottom") ? "0" : "-50%"})`,
              ...style,
            }}
          >
            {overlay}
          </Flex>
        )}
      </>
    );
  }
);

CursorCard.displayName = "CursorCard";

export { CursorCard };