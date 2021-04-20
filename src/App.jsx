import React, { useContext, useEffect, useState } from 'react';
import Web3 from 'web3';

import { Web3Context } from './components/Web3Context';
import Bonus from './components/Bonus';
import FooterBar from './components/FooterBar';
import Middle from './components/Middle';
import Navbar from './components/BrandNavbar';
import Price from './components/Price';

import CoinvestingToken from './abis/CoinvestingDeFiToken.json';
import CoinvestingTokenSale from './abis/CoinvestingDeFiTokenSale.json';

function App() {
  //SaleForm Component
  const { web3, accounts} = useContext(Web3Context);

  const [levelOneDate, setLevelOneDate] = useState(null);
  const [levelTwoDate, setLevelTwoDate] = useState(null);  
  const [levelThreeDate, setLevelThreeDate] = useState(null);
  const [levelFourDate, setLevelFourDate] = useState(null);
  const [timestamp, setTimestamp] = useState(null); 
  const [tokenBalance, setTokenBalance] = useState("0");
  const [tokenSaleContract, setTokenSaleContract] = useState(undefined);
	const [tokensSold, setTokenSold] = useState("");
  
  let bonus;
  let sale;  

  //Price Component
  const [ETHPrice, setETHPrice] = useState(0);
  const [oracle, setOracle] = useState(0);
  const [priceContract, setPriceContract] = useState(0);
  const [tokenPrice, setTokenPrice] = useState(0);

  const web3Price = new Web3(`https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`);

  const addr = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419";
  const aggregatorV3InterfaceABI = [{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"description","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint80","name":"_roundId","type":"uint80"}],"name":"getRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
  const priceFeed = new web3Price.eth.Contract(aggregatorV3InterfaceABI, addr);

  let price;

  const financial = (x) => Number.parseFloat(x).toFixed(2);
  const converter = (x) => Number.parseFloat(x).toFixed(8);  
  
  (async () => {
    const block = await web3Price.eth.getBlockNumber();
    web3Price.eth.getBlock(block, (error, block) => {
      setTimestamp (block.timestamp);
    });
  })();

  console.log("1º DIA: ", parseInt(levelOneDate, 10));
  console.log("2º DIA: ", parseInt(levelOneDate, 10) + parseInt(levelTwoDate, 10));
  console.log("3º DIA: ", parseInt(levelOneDate, 10) + parseInt(levelTwoDate, 10) + parseInt(levelThreeDate, 10));
  console.log("4º DIA: ", parseInt(levelOneDate, 10) + parseInt(levelTwoDate, 10) + parseInt(levelThreeDate, 10) + parseInt(levelFourDate, 10));

  priceFeed.methods.latestRoundData().call().then(
    (roundData) => {      
      // Do something with roundData
      setOracle(roundData.answer);
      setETHPrice(financial(oracle/10**8));
      if (timestamp <= (parseInt(levelOneDate, 10) + parseInt(levelTwoDate, 10))) {
        setTokenPrice(converter(((0.01**2))/(ETHPrice*0.01)));
      }
      else if (timestamp <= (parseInt(levelOneDate, 10) + parseInt(levelTwoDate, 10) + parseInt(levelThreeDate, 10))) {
        setTokenPrice(converter(((0.01**2)*2)/(ETHPrice*0.01)));
      }
      else if (timestamp <= (parseInt(levelOneDate, 10) + parseInt(levelTwoDate, 10) + parseInt(levelThreeDate, 10) + parseInt(levelFourDate, 10))) {
        setTokenPrice(converter(((0.01**2)*3)/(ETHPrice*0.01)));
      }
      else {
        setTokenPrice(converter(((0.01**2)*4)/(ETHPrice*0.01)));
      }
      setPriceContract(tokenPrice*10**18);
    }
  );

  // Initialization of smart contracts
  useEffect(() => {
    if (!(web3 && accounts.length > 0)) return;
    const init = async () => {
      try {  
        // Get the contract Token instance.
        const networkId = await web3.eth.net.getId();
        const tokenData = CoinvestingToken.networks[networkId];
        if (tokenData) {
          const tokenContract = new web3.eth.Contract(
            CoinvestingToken.abi,
            tokenData && tokenData.address,
          );
          const tokenBalance = await tokenContract.methods.balanceOf(accounts[0]).call();
			    setTokenBalance(web3.utils.fromWei(tokenBalance, "ether"));
        } 
        else {
          window.alert("Por favor, conecte-se à MainNet.");
        }
        // Get the contract TokenSale instance.
        const tokenSaleData = CoinvestingTokenSale.networks[networkId];
        if (tokenSaleData) {
          const tokenSaleContract = new web3.eth.Contract(
            CoinvestingTokenSale.abi,
            tokenSaleData && tokenSaleData.address,
          );
          const _tokensSold = await tokenSaleContract.methods.tokensSold().call();
          setTokenSold(_tokensSold.toString());
          const _levelOneDate = await tokenSaleContract.methods.levelOneDate().call();
          setLevelOneDate(_levelOneDate);
          const _levelTwoDate = await tokenSaleContract.methods.levelTwoDate().call();
          setLevelTwoDate(_levelTwoDate);
          const _levelThreeDate = await tokenSaleContract.methods.levelThreeDate().call();
          setLevelThreeDate(_levelThreeDate);
          const _levelFourDate = await tokenSaleContract.methods.levelFourDate().call();
          setLevelFourDate(_levelFourDate);
          setTokenSaleContract(tokenSaleContract);
        } 
        else {
          window.alert("Por favor, conecte-se à MainNet.");
        }
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Não foi possível fazer a conexão. Tente novamente.`,
        );
        console.error(error);
      }
    }
    init(); 
  }, [web3, accounts]);

  // Sale of tokens
  const buyTokens = async (tokens, tokenPrice) => {
    await tokenSaleContract.methods
    .buyTokens(tokens, tokenPrice)
    .send({ value: (tokens * tokenPrice), from: accounts[0] })
    .on("transactionHash", (hash) => {});
  };

  //JSX Components
  bonus = <Bonus />

  price = <Price 
    ETHPrice = { ETHPrice }
    tokenPrice = { tokenPrice }
  />

  sale = <Middle 
    buyTokens={ buyTokens }
    tokenBalance={ tokenBalance }
    tokensSold={ tokensSold }
    tokenPrice={ priceContract }
    price={ tokenPrice }
  />

  return (
    <div style={{backgroundColor: "black"}}>
      <Navbar />
      <header className="fluid">
        {price}
        {bonus}
        {sale}
        <FooterBar />
      </header>
    </div>
  );
}

export default App;
