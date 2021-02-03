import React,{Fragment,useEffect,useState} from 'react';
import './auth.css'
import usuariosAPI from './../../services/usuarios'

import axios from 'axios'

import { Form, Button, Modal} from 'react-bootstrap'
import {withRouter,RouteComponentProps,Link} from 'react-router-dom'
import {ReactComponent as MusicIcon} from './../../img/icons/music-player.svg'

import {PersonasCreacion} from './../../models/usuarios'

import Container from './container'

type currentPropsType = RouteComponentProps

const LeftSide = () => {
  useEffect(()=>{
    /*
    let persona:PersonasCreacion;
    usuariosAPI.obtenerPorId(1).then((personaResponse) => {
      persona = personaResponse
      console.log(persona)
      setAlert({visible:true,msj:persona.nombre +' '+ persona.apellidoPaterno})
    }).catch((error:any)=>{
      setAlert({visible:true,msj:'Not found'})
    })*/
  },[])

  return(
    <Fragment>
      <MusicIcon className="iconLogin" />
      <p className="normal-size text-justify"  >
        ¿Aún no tienes una cuenta?<br/>
        <Link to="/auth/singup" className="text-decoration-underline text-primary"> Registrate </Link> ahora.
      </p>
    </Fragment>
  )
}

const RightSide = () => {
  return(
    <div className="d-flex justify-content-around" style={{height:'100%',flexDirection:'column'}} >
      <h3 style={{marginBottom:'1rem'}} > Iniciar sesión </h3>
      <Form autoComplete="off">
        
        <Form.Group controlId="formGroupEmail"  >
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control type="email" />
        </Form.Group>

        <Form.Group controlId="formGroupPassword"  >
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" />
        </Form.Group>
        
        <Form.Label>
          <span className="text-primary" style={{cursor:'pointer'}} > Olvidé mi contraseña. </span>
        </Form.Label>

      </Form>
      
      <div>
        <Button variant="dark"> Entrar </Button>
      </div>

      <div className="d-flex justify-content-center align-items-center just-movil p-1">
        <Link to="/auth/singup" className="text-primary"> Registrate </Link>
      </div>
      
    </div>
  )
}

const Footer = () => {
  return(
    <Fragment>
      <p className="normal-size text-justify text-white" >
        Recuerda que mientras naveges debe de respetar las
        <Link to="/legacy/terminosdeuso" className="text-decoration-underline text-dark"> normas de la comunidad </Link>
      </p>
    </Fragment>
  )
}

const Login = withRouter( ( props : currentPropsType ) =>  {
  return (
    <Container
      LeftSide={<LeftSide/>}
      RightSide={<RightSide/>}
      Footer={ <Footer/>}
      ordeRigth={1}
      orderLeft={0}
    >
    </Container>      
  );

})

export default Login;