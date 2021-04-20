import { useContext, useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';

import { Web3Context } from './Web3Context';
import ButtonConnectWallet from './ButtonConnectWallet';

import logo3 from '../assets/logo3.png';

function BrandNavbar(props) {
  const { web3, accounts } = useContext(Web3Context);
  const [balance, setBalance] = useState(0);
  const shorter = (str) => str && str.length > 8 ? str.slice(0, 6) + '...' + str.slice(-4) : str;
  const shorterb = (str) => str && str.length > 8 ? str.slice(0, 9) : str;

  useEffect(() => {
    if (!(web3 && accounts.length > 0)) return;
    (async () => {
      const balance = await web3.eth.getBalance(accounts[0]);
      setBalance(web3.utils.fromWei(balance, "ether"));
    })();
  }, [web3, accounts]);

  return (
    <Navbar bg={logo3} variant="dark" className="justify-content-between" style={{margin: "0 auto 15px auto"}}>
        <Navbar.Brand href="#home">
          <img alt="" src={logo3} width="300" height="50" className="d-inline-block align-top" />     
        </Navbar.Brand>
        { web3 
          ? <Navbar.Text style={{color: "#ffcc00"}} className="small">{accounts.map(a =><span  key={a}>{shorter(a)} <strong>({shorterb(balance)} ETH)</strong></span>)}</Navbar.Text>               
          : <ButtonConnectWallet /> 
        }             
    </Navbar>
  );
};

export default BrandNavbar;
