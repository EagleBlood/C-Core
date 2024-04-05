import React from 'react';
import './home';
import Header from '../components/header/header';

interface Props {
  // define your props here
}

const Home: React.FC<Props> = (props) => {
  return (
    <div>
        <Header/>
    </div>
  );
}

export default Home;