import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import Logo from './../img/logo.png'
import './bienvenida.css'

interface MyProps{
  visible:boolean;

}

type currentPropsType = MyProps

const Bienvenida = (props:currentPropsType) =>  {
  
  return (
    <Modal show={props.visible} backdrop="static" keyboard={false} centered className="modal-bienvenida" >

      <Modal.Header>
        <Modal.Title className="text-light d-flex justify-content-center align-items-center">
          <img src={Logo} />
          {/*<h4 className="sub-title-size">I Music Social Media</h4>*/}
          <h4 className="sub-title-size">Confirmar tu registro</h4>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body >
        
        <p className="normal-size text-justify"  >
          Hemos enviado un correo electrónico a la dirección indicada, deberás confirmar tu registro para poder continuar.
        </p>
        
        <div className="text-center" >
          <Button variant="dark">
            <Link to="/auth/login" className="text-light" > Entendido </Link>
          </Button>
        </div>

      </Modal.Body>
    </Modal>
  );

}

export default Bienvenida;