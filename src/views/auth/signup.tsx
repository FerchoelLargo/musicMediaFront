import React,{ChangeEvent, Fragment,useState} from 'react';
import './auth.css'
import { Form, Button,Col,InputGroup, Modal, Spinner} from 'react-bootstrap'
import {withRouter,RouteComponentProps,Link} from 'react-router-dom'
import {ReactComponent as MusicIcon} from './../../img/icons/file-music.svg'
import {ReactComponent as EyeSlashIcon} from './../../img/icons/eye-slash-fill.svg'
import {ReactComponent as EyeIcon} from './../../img/icons/eye-fill.svg'
import Container from './container'

import { DayValue,Calendar} from 'react-modern-calendar-datepicker'
import {myCustomLocaleSpanish} from './../../utilities/helpers'

import personasAPI from '../../services/personas'
import usuariosAPI from './../../services/usuarios'

import Bienvenida from './../../modals/bienvenida'

import{PersonasCreacion,UsuariosCreacion} from './../../models/usuarios'

type currentPropsType = RouteComponentProps
const LeftSide = () => {
  return(
    <Fragment>
      <MusicIcon className="iconLogin" />
      <p className="normal-size text-justify"  >
        ¿Ya tienes una cuenta?<br/>
        <Link to="/auth/login" className="text-decoration-underline text-primary"> Inicia sesión </Link> ahora.
      </p>
    </Fragment>
  )
}

const RightSide = () => {
  const maxDate = new Date();
  
  const [day, setDay] = React.useState<DayValue>({day:maxDate.getDate(), month:maxDate.getMonth()+1,year:maxDate.getFullYear()-18 });

  const[validated,setValidated] = useState<boolean>(false)
  const[errorPassword2,setErrorPassword2] = useState({visible:false,msj:'',class:''})
  const[invalidDate,setInvalidDate] = useState({visible:false,msj:'',class:''})
  const[loading,setLoading] = useState(false)
  const[bienvenida,setBienvenida] = useState(false)

  const [showPassword,setShowPassword] = useState(false)
  const [showPasswordConfirm,setShowPasswordConfirm] = useState(false)


  const [settingFecha,setSettingFecha] = useState(false)

  const submit = async (event:React.FormEvent<HTMLFormElement> ) =>{
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
    const form = event.currentTarget;
    const formData: FormData = new FormData(form);
    if (form.checkValidity() === false) {
      return
    }
    const dateInputString:string = (formData.get('fechaNacimiento') as string) || ''

    if( dateInputString.length === 0 ){
      setInvalidDate({visible:true,msj:'Este campo es obligatorio',class:'is-invalid'})
      return      
    }else{
      const partsOfDate = dateInputString.split('-')
      const dateInput = new Date(Number(partsOfDate[0]),Number(partsOfDate[1])-1,Number(partsOfDate[2]))
      const minDate = new Date()
      minDate.setFullYear( minDate.getFullYear()-18 )
      if(dateInput > minDate){
        setInvalidDate({visible:true,msj:'Debes tener al menos 18 años para registrarte',class:'is-invalid'})
        return
      }
    }
    setInvalidDate({visible:false,msj:'',class:'is-valid'})
    const inputPassword = (document.getElementById('formGroupPasswordConfirm') as HTMLInputElement )
    if(inputPassword.value !== formData.get('contrasena')){
      console.log(formData.get('contrasena'),inputPassword.value)
      return
    }
    setErrorPassword2({visible:false,msj:'',class:'is-valid'})
    setLoading(true)
    const persona:PersonasCreacion={
      nombre: formData.get('nombre')?.toString() || '',
      apellidos : formData.get('apellidos')?.toString() || '',
      fechaNacimiento: formData.get('fechaNacimiento')?.toString() || '',
      pais: '',
      estado: '',
      ciudad: '',
    }
    try{
      const responsePersona = await personasAPI.crear(persona);
      const usuario:UsuariosCreacion ={
        correoElectronico: formData.get('correoElectronico')?.toString() || '',
        contrasena: inputPassword.value,
        tipoUsuario: 1,
        personaId:responsePersona.key,
        nombre:persona.nombre
      }
      try{
        const responseUsuario = await usuariosAPI.crear(usuario)
        setBienvenida(true)
        setLoading(false)
      }catch(err){
        setLoading(false)
        console.log('Usuario Error',err)
      }
    }catch(err){
      setLoading(false)
      console.log('Persona Error',err)
    }
  }

  const formatInput = () =>{
    if(!day)return ''
    return day.year+'-'+(day.month<10?'0'+day.month:day.month)+'-'+(day.day<10?'0'+day.day:day.day)
  }

  const changePassword2 = (e:ChangeEvent<HTMLInputElement>) =>{
    const inputPasswordOriginal = (document.getElementById('formGroupPassword') as HTMLInputElement )
    const inputPassword = e.target
    if(inputPasswordOriginal.value !== inputPassword.value)
      setErrorPassword2({visible:true,msj:'Las contraseñas ingresadas no coinciden',class:'is-invalid'})
    else
      setErrorPassword2({visible:false,msj:'',class:'is-valid'})
  }

  return(
    <div className="d-flex justify-content-around" style={{height:'100%',flexDirection:'column'}} >

      <Modal show={loading} backdrop="static" keyboard={false} centered className="transparent" >
        <Modal.Body className="d-flex justify-content-center align-items-center" style={{flexDirection:'column'}} >
          <Spinner animation="border" variant="info" style={{width:'3rem', height:'3rem'}} />
          <span className="text-white normal-size" > Cargando </span>
        </Modal.Body>
      </Modal>

      <Modal show={settingFecha} backdrop="static" keyboard={false} centered className="bodyCalendarModal" size="sm">
        <Modal.Body>
        <Calendar
          value={day}
          onChange={setDay}
          locale={myCustomLocaleSpanish}
          maximumDate={{ day:maxDate.getDate(), month:maxDate.getMonth()+1,year:maxDate.getFullYear()-18 }}
          shouldHighlightWeekends colorPrimary="#007bff"
          calendarClassName="calendarClassNameOwn"
        />
        <div
          style={{padding:'10px 0', backgroundColor:"#ffffff",borderBottomLeftRadius:'10px',borderBottomRightRadius:'10px'}}
          className="text-center"
          onClick={()=>setSettingFecha(false)}
        >
          <Button variant="primary" style={{width:'90%'}} > Guardar </Button>
        </div>

        </Modal.Body>
      </Modal>

      <Bienvenida visible={bienvenida} />

      <h3> Crea una cuenta </h3>
      <Form autoComplete="off" validated={validated} onSubmit={submit} >

        <Form.Row>
          <Col  md={6} xs={12} >
            <Form.Group controlId="formGroupName"  >
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" required name="nombre" />
              <Form.Control.Feedback type="invalid">
                Este campo es requerido
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col  md={6} xs={12} >
            <Form.Group controlId="formGroupAppelidos"  >
              <Form.Label>Apelidos</Form.Label>
              <Form.Control type="text" required name="apellidos" />
              <Form.Control.Feedback type="invalid">
                Este campo es requerido
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

        </Form.Row>

        <Form.Group controlId="formGroupFecha"  >
          <Form.Label>Fecha de nacimiento</Form.Label>
          <Form.Control type="text" required name="apellidos" value={formatInput()} readOnly onClick={()=>setSettingFecha(true)} />
          {
            invalidDate['visible']&&
            <Form.Control.Feedback type="invalid" style={{display:'block'}} >
              {invalidDate['msj']}
            </Form.Control.Feedback>
          }            
        </Form.Group>

        <Form.Group controlId="formGroupEmail"  >
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control type="email" required name="correoElectronico" />
          <Form.Control.Feedback type="invalid">
            Este campo es requerido
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Row>
          
          <Col md={6} xs={12}  >
            <Form.Group controlId="formGroupPassword"  >
              <Form.Label>Contraseña</Form.Label>
              <InputGroup>
                <Form.Control type={showPassword?'text':"password"} required minLength={8} name="contrasena" />
                <InputGroup.Append>
                  <InputGroup.Text title="Mostrar contraseña">
                    {
                      !showPassword ?
                      <EyeSlashIcon height={16} width={16} className="iconPassword" title="Mostrar contraseña" onClick={()=>setShowPassword(!showPassword)} /> : 
                      <EyeIcon height={16} width={16} className="iconPassword" title="Mostrar contraseña" onClick={()=>setShowPassword(!showPassword)} />
                    }
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>

              <Form.Control.Feedback type="invalid">
                Este campo es requerido
              </Form.Control.Feedback>
            </Form.Group>
 
          </Col>

          <Col md={6} xs={12}  >
            <Form.Group controlId="formGroupPasswordConfirm"  >
              <Form.Label>Confirmar contraseña</Form.Label>
              <InputGroup>
                <Form.Control type={showPasswordConfirm ?'text':"password"} onChange={changePassword2} className={errorPassword2['class']} name="contrasenaConfirm" />
                <InputGroup.Append>
                  <InputGroup.Text title="Mostrar contraseña">
                    {
                      !showPasswordConfirm ?
                      <EyeSlashIcon height={16} width={16} className="iconPassword" title="Mostrar contraseña" onClick={()=>setShowPasswordConfirm(!showPasswordConfirm)} /> : 
                      <EyeIcon height={16} width={16} className="iconPassword" title="Mostrar contraseña" onClick={()=>setShowPasswordConfirm(!showPasswordConfirm)} />
                    }
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
              {
                errorPassword2['visible']&&
                <Form.Control.Feedback type="invalid" style={{display:'block'}} >
                  {errorPassword2['msj']}
                </Form.Control.Feedback>
              }
            </Form.Group> 
          </Col>

        </Form.Row>

      </Form>

      <div>
        <Button variant="dark" type="submit" > Registrarme </Button>
      </div>
      
      <div className="d-flex justify-content-center align-items-center just-movil p-1">
        <Link to="/auth/login" className="text-primary"> Ya tengo una cuenta </Link>
      </div>
      
    </div>
  )
}

const Footer = () => {
  return(
    <Fragment>
      <p className="normal-size text-justify text-white" >
        Al registrarte en I Music Social Media aceptas nuestros
        <Link to="/legacy/terminosdeuso" className="text-decoration-underline text-dark"> términos y condiciones </Link>
        de uso.
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
      ordeRigth={0}
      orderLeft={1}
      classContainer="fillHeight"
    >
    </Container>      
  );

})

export default Login;