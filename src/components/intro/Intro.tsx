import { FunctionComponent, useRef } from "react";
import { IntroProps } from "./intro.props.ts";
import { Wrapper } from './intro.style.ts';
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax'
import { PhPlanet } from '../../assets/PhPlanet.tsx'
import { PhGalaxy } from "../../assets/PhGalaxy.tsx";
import { PhAsteroid } from "../../assets/PhAsteroid.tsx";
import { PhRocket } from "../../assets/PhRocket.tsx";
import { PhHomeFill } from "../../assets/PhHomeFill.tsx";

const Intro: FunctionComponent<IntroProps> = ({ numberOfStars }) => {

  const parallax = useRef<IParallax>(null!)

  const stars = [];
  for (let i = 1; i <= numberOfStars; i++) {
    const size = Math.floor(Math.random() * 5) + 2;
    const style = {
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      width: `${size}px`,
      height: `${size}px`,
      animation: `${Math.random() * 2}s flicker ${Math.random() * 2}s infinite`,
    };
    stars.push(<div className={`star-${i} stars`} style={style} key={i} />);
  }

  return (
    <Wrapper>
      <div className="introContainer">
        <Parallax ref={parallax} pages={3} style={{
              overflow: 'hidden',
            }}  >
          <ParallaxLayer offset={1} speed={1}/>
          <ParallaxLayer offset={2} speed={1}/>

          {/*bg render*/} 
          <ParallaxLayer
            offset={0}
            speed={0}
            factor={3}
            style={{
              //backgroundImage: url('stars', true),
              backgroundSize: 'cover',
            }}    
          >
            {stars} 
          </ParallaxLayer>

          {/*first factor render*/}
          <ParallaxLayer
            offset={0}
            speed={0.1}
            onClick={() => parallax.current.scrollTo(1)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: '1',
            }}>
            <h1 className="logoText"><span>Central - Core</span></h1>
          </ParallaxLayer>

          {/*asteroid render*/}
          <ParallaxLayer
            offset={0.2}
            speed={-0.45}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div className="obj" style={{
                marginRight: '65%',
                marginTop: '15%',
                animation: 'spin 23s linear infinite',
              }}> 
                <PhAsteroid />
              </div>
            
          </ParallaxLayer>

          <ParallaxLayer
            offset={0.1}
            speed={0.4}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

            }}>
              <div className="obj" style={{
                marginLeft: '65%',
                marginBottom: '50%',
                animation: 'spin 41s linear infinite',
              }}> 
                <PhAsteroid />
              </div>
            
          </ParallaxLayer>

          {/*second factor render*/}
          <ParallaxLayer
            offset={1}
            speed={0.1}
            onClick={() => parallax.current.scrollTo(2)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              
            }}>
            <div className="infoBox" style={{
              marginTop: '30%',
              marginRight: '50%',
              marginLeft: '5%',
              gap: '20px',
              zIndex: '1',
            }}>
              <h2>Take Control of Your Smart Home</h2>
              <PhHomeFill />
              <p>Our dashboard puts the power in your hands. Add and manage devices with ease, and make informed decisions with real-time data visualized on user-friendly charts. Experience the convenience and control of our smart technology.</p>
            </div>

            <div className="obj" style={{
              marginLeft: '85%',
              marginTop: '55%',
              rotate: '132deg',
              animation: 'spin 300s linear infinite',
              opacity: '0.5',
            }}>
              <PhGalaxy />
            </div>           
            
            <div className="infoBox" style={{
              marginBottom: '30%',
              marginLeft: '50%',
              marginRight: '5%',
              gap: '20px',
              
            }}>
              
              <h2>Revolutionizing Home Automation</h2>
              <PhRocket />
              <p>Experience seamless device management and data visualization like never before. Our dashboard offers swift access and interaction with your devices, while providing real-time data insights through intuitive charts. Designed for speed and efficiency, it's the smart way to make your home smarter.</p>
            </div>
          </ParallaxLayer>

          {/*third factor render*/}
          <ParallaxLayer
            offset={2}
            speed={0.2}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '10%',
            }}
            onClick={() => parallax.current.scrollTo(0)}>
            <h1 className="goodbyeText">See You In Space Cowboy</h1>
          </ParallaxLayer>

          <ParallaxLayer
            offset={2.5}
            speed={-0.2}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              marginTop: '10%',
            }}>
            <PhPlanet />
          </ParallaxLayer>
        </Parallax>
      </div>
    </Wrapper>
  );
};

export default Intro;