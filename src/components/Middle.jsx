import React from 'react';

import SaleForm from './SaleForm';

import logo from '../assets/logo.png';

function Middle(props) {
  return (
    <div className="text-center" style={{ color: "white", height: "85vh", margin: "auto"}}>
      <div className="d-none d-md-block img-fluid"><img src={logo} alt="logo" /></div>      
      <SaleForm 
        buyTokens={props.buyTokens}
        tokensSold={props.tokensSold}
        tokenPrice={props.tokenPrice}
        tokenSale={props.tokenSale}
        tokenBalance={props.tokenBalance}
        price={props.price}
        finish={props.finish}
      />
    </div>
  );
};

export default Middle;
