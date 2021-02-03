import React,{Fragment} from 'react';
import {Nav,Button} from 'react-bootstrap';
import {setIntoView} from '../utilities/helpers'
import {Link} from 'react-router-dom'

const NavRouter = (props:any) => {

  return (
    <Fragment>

      <Nav.Link onClick={()=>setIntoView('main1')} > Inicio </Nav.Link>

      <Nav.Link onClick={()=>setIntoView('main2')} > Artistas </Nav.Link>

      <Nav.Link className="lastItem" onClick={()=>setIntoView('main3')} > Álbumes </Nav.Link>

      <Link to="/auth/singup" className="nav-link" >
        <Button variant="dark" > Registrarme </Button>
      </Link>

      <Link to="/auth/login" className="nav-link" >
        <Button variant="outline-light" > Iniciar sesión </Button>
      </Link>


    </Fragment>
  );

}

export default NavRouter;