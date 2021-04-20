import Badge from 'react-bootstrap/Badge';
import Toast from 'react-bootstrap/Toast';

function Bonus() {
  return (
    <div className="d-none d-md-block">
      <Toast style={{position: "absolute", botton: 0, left: 0, backgroundColor: "black", color: "#ffcc00", width: "225px"}}>
        <Toast.Body style={{backgroundColor: "#090909"}}>
          <h5><strong>BÔNUS!!!</strong></h5>
          <h6>Até <Badge variant="danger">15/05/2021</Badge></h6>
          <h2>
            <small>Bônus de</small> <Badge variant="danger"> 50% </Badge>
          </h2>
        </Toast.Body>    
      </Toast>
    </div>    
  );
}

export default Bonus;
