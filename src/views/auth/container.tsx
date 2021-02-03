import React,{Fragment,ReactNode} from 'react';
import './auth.css'

interface MyProps{
  LeftSide: ReactNode;
  RightSide:ReactNode;
  Footer:ReactNode;
  children?:ReactNode;
  orderLeft:number;
  ordeRigth:number;
  classContainer?:string;
}

type currentPropsType = MyProps

const Container = (props:currentPropsType) =>  {
  
  return (
    <Fragment>
      <div className="login-container d-flex justify-content-center align-items-center">

        <div className="parent-bgfake"> <div className="bgfake"/> </div>

        <svg style={{visibility: 'hidden', position: 'absolute'}} width={0} height={0} xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />    
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
              <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
            </filter>
          </defs>
        </svg>

        <div className={"innerLogin-container d-flex z-elevation2 "+(props.classContainer ? props.classContainer : '' )}>
          
          <div className="body d-flex justify-content-center align-items-center">
            <div className="right-side" style={{order:props.ordeRigth}} >
              {props.RightSide}
            </div>

            <div className="left-side d-flex justify-content-center align-items-center"
              style={{
                order:props.orderLeft
              }} >
              {props.LeftSide}
            </div>

          </div>

          <div className="footer">
            {props.Footer}
          </div>

        </div>
      </div>
      
    </Fragment>
  );

}

export default Container;