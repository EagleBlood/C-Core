import React, { useState } from "react";
import { animated, useSpring } from "@react-spring/web";

export const DropDownMenu = () => {
  const [isToggled, setToggle] = useState(false);
  const { y } = useSpring({
    y: isToggled ? 180 : 0
  });
  const menuAppear = useSpring({
    transform: isToggled ? "translate3D(0,0,0)" : "translate3D(0,-40px,0)",
    opacity: isToggled ? 1 : 0
  });

  return (
    <div className="inputField" style={{ position: 'relative' }}>
      <animated.button
        style={{
          textDecoration: 'none',
          border: 'none',
          backgroundColor: 'transparent',
          padding: '0',
          justifyContent: 'left',
        }}
        onClick={() => setToggle(!isToggled)}
      >
        <div>

          <animated.p
            style={{
              transform: y.to(y => `rotateX(${y}deg)`)
            }}
          >
            &#9660;
          </animated.p>
        </div>
      </animated.button>
      <animated.div style={{ ...menuAppear, position: 'absolute', top: '100%', left: 0, right: 0 }}>
        {isToggled ? <RadioContent /> : null}
      </animated.div>
    </div>
  );
};

const RadioContent = () => {
  return (
    <div className="radiocontent">
      <p>Admin</p>
      <p>User</p>
      </div>
  );
};