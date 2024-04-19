import { useState, useEffect, FunctionComponent, lazy, Suspense } from "react";
import { LogoBig } from "../../assets/LogoBig";
import { AccountProps } from "./account.props";
import { Wrapper } from './account.style';
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

const LazyLoadComponent = lazy(() => import('../../components/intro/Intro'));

const Account: FunctionComponent<AccountProps> = ({ }) => { 
  const [numberOfStars] = useState(100);
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(true);
    }, 1000); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <Wrapper>
        <motion.div 
          className="loginBar"
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{duration: 1, ease: [0.6, -0.05, 0.01, 0.90]}}
        >
          <div className="logoContainer">
            <LogoBig/>
            <h1><span>C - Core</span></h1>
          </div>
          
          <div className="render">
            <Outlet />
          </div>

          {/*  */}
          <p className="smallText">Powered by <span className="specialText">Vite</span></p>
        </motion.div>

        {showIntro && (
          <div className="fade-in">
            <Suspense>
              <LazyLoadComponent numberOfStars={numberOfStars} />
            </Suspense>
          </div>
        )}
    </Wrapper>
  );
};

export default Account;