import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Spinner from 'react-bootstrap/Spinner';

import { Web3Context } from './Web3Context';

function SaleForm(props) {
  const { connect } = useContext(Web3Context);

  const [load, setLoad] = useState(true);
  const [tokens, setTokens] = useState(0);
  
  const now = (props.tokensSold / 100000000)*100;
  
  const handleChange = (event) => {
    setTokens(event.target.value);   
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setLoad(false);
      await props.buyTokens(tokens, props.tokenPrice);
      setLoad(true);
      setTokens(0);
      connect();
    } catch (error) {
      console.error(error);
      alert(
        `Falha ao confirmar a transação.`,
      );
      setLoad(true);
      setTokens(0);
      connect();
    }
  };

  if (load === true) {
    return (
      <div className="text-center">
        <Card style={{width: "50%", margin: "auto", backgroundColor: "#090909"}} className="text-center">
          <Card.Title style={{  padding: "2%"}}>
            COINVEX - Compre agora!
          </Card.Title>
          <Form className="text-center" onSubmit={handleSubmit}>
            <Form.Group style={{width: "100%", margin: "auto"}}>
              <Form.Control className="mb-2 text-center" size="sm" style={{width: "50%", margin: "auto"}} type="number" min="4000" value={tokens} max={100000000 - props.tokensSold} onChange={handleChange} placeholder="Quantidade" />         
              <Button className="mb-2" size="md" type="submit" variant="dark" style={{backgroundColor: "#00c800", color: "black", fontWeight: "bolder"}}>
                Comprar
              </Button>
            </Form.Group>            
          </Form>
          <Card.Footer>
            <ProgressBar style={{width: "70%", margin: "auto"}} striped variant="warning" now={now} />
            <Form.Text style={{color: "#ffcc00"}}>COINVEX vendidos: <strong>{props.tokensSold}</strong>/100000000.</Form.Text>
            <Form.Text style={{color: "#ffcc00"}}>Você possui <strong>{props.tokenBalance}</strong> COINVEX.</Form.Text>
          </Card.Footer>
        </Card>
      </div>
    );
  } 
  else {
    return (
      <div className="text-center">
         <Card style={{width: "50%", margin: "auto", backgroundColor: "#090909"}} className="text-center">
         <Card.Title style={{  padding: "2%"}}>
            Você está comprando <strong>{tokens}</strong> COINVEX.
          </Card.Title>
          <Form className="text-center">
            <Form.Group>
              <Form.Text style={{color: "#ffcc00"}}>
                Confirme sua transação na MetaMask!
              </Form.Text>
            </Form.Group>
            <Button variant="light" disabled={true} style={{margin: "auto auto 20px auto"}}>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                Carregando...
            </Button>
            <Card.Footer />
          </Form>          
        </Card>
      </div>
    );
  }
};

export default SaleForm;
