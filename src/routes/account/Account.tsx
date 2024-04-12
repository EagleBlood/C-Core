import { useState, useEffect, FunctionComponent, lazy, Suspense } from "react";
import { LogoBig } from "../../assets/LogoBig";
import { AccountProps } from "./account.props";
import { Wrapper } from './account.style';
import { Outlet } from "react-router-dom";

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
        <div className="loginBar">
          <div className="logoContainer">
            <LogoBig/>
            <h1><span>C - Core</span></h1>
          </div>
          
          <div className="render">
            <Outlet />
          </div>

          {/*  */}
          <p className="smallText">Powered by <span className="specialText">Vite</span></p>
        </div>

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