import { Fragment, useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

import { Web3Context } from './Web3Context';

function ButtonConnectWallet() {
  const { accounts, connect } = useContext(Web3Context);
  const [mmDetected, setMmDetected] = useState(false);
    
  useEffect(() => {
    setMmDetected(typeof window.ethereum !== 'undefined');
  }, [setMmDetected]);
    
  return (
    <Fragment>
      {mmDetected && accounts.length===0 &&
        <Button variant="light" onClick={connect}>Conectar wallet</Button>
      }
    </Fragment>
  );
};

export default ButtonConnectWallet;
