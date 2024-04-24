import { useSpring, a } from "@react-spring/web"
import React, { useEffect, useRef, useState } from "react"
import { PhDot } from "../../assets/PhDot"
import { Content, toggle } from './tree.style'
import useMeasure from 'react-use-measure'
import theme from "../../styles/themes"

function usePrevious<T>(value: T) {
  const ref = useRef<T>()
  useEffect(() => void (ref.current = value), [value])
  return ref.current
}

export const Tree = React.memo<
  React.HTMLAttributes<HTMLDivElement> & {
    defaultOpen?: boolean
    name: string | JSX.Element
    icon?: React.ReactNode
    className?: string
    onClick?: () => void
    isOpen?: boolean
  }
>(({ children, name, style, defaultOpen = false, icon, className, onClick, isOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen)
  const previous = usePrevious(isOpen)
  const [ref, { height: viewHeight }, boundsRef] = useMeasure() // Get boundsRef from useMeasure
  const { height, opacity, y } = useSpring({
    from: { height: 0, opacity: 0, y: 0 },
    to: {
      height: isOpen ? viewHeight : 50,
      opacity: isOpen ? 1 : 0,
      y: isOpen ? 0 : 230,
    },
    config: { clamp: true },
  })

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    boundsRef(); // Call boundsRef when open state changes
  }, [open, boundsRef]);

  const handleClick = () => {
    setOpen(!open);
    if (onClick) {
      onClick();
    }
  }

  const handleChildClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  }

  return (
    <div onClick={handleClick} className="listContainer">
      <div className={className}>
        {icon}
        <p>{name}</p>
      </div>
      
      <Content open={open}
        style={{
          opacity,
          y,
          height,
        }}>  
        <PhDot/>
        <a.div key={open} ref={ref} style={{ y }} onClick={handleChildClick} children={children} />
      </Content>
    </div>
  )
})