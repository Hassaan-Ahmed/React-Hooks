import React from 'react';

import Grudges from './Grudges';
import NewGrudge from './NewGrudge';



const Application = () => {
  // const [grudges, setGrudges] = useState(initialState);

  return (
    <div className="Application">
      <NewGrudge />
      <Grudges />
    </div>
  );
};

export default Application;
