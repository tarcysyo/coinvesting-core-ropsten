import Toast from 'react-bootstrap/Toast';

import coinvex from '../assets/coinvex.png';
import eth from '../assets/eth-home-icon.png';

function Price(props) {
  return (
    <div className="d-none d-md-block">
      <Toast style={{position: "absolute", botton: 0, right: 0, backgroundColor: "black", color: "#ffcc00", width: "225px"}}>
        <Toast.Body style={{backgroundColor: "#090909"}}>
        <h5><strong>COTAÇÃO</strong></h5>    
        <h6><img alt="ETH" src={eth} width="22" height="35" /> <strong> {props.ETHPrice} <small>USD</small></strong> </h6>
        <h6><img alt="COINVEX" src={coinvex} width="22" height="25" /> <strong> {props.tokenPrice} <small>ETH</small></strong></h6>  
        </Toast.Body>    
      </Toast>
    </div>
    
  );
}

export default Price;
