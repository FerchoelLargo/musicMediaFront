import React,{Fragment} from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './landing.css';

import {ReactComponent as MusicNoteList} from './../img/icons/music-note-list.svg'

const Landing = (props:any) => {
  return (
    <Fragment>

      <section id="main1" className="main main1" >
        
        <div className="content-landing" >
      
          <h1 className="big-title-size" > Comparte tus creaciones. </h1>
          
          <p className="normal-size text-justify" >
            Haz que el mundo conozca tu talento y disfruta de compartir tu contenido y ver el de otros artistas.
          </p>
          <p className="normal-size text-justify" >
            
          </p>
          
          <div className="container-buttons d-flex align-items-center " >
            <Link to="/auth/singup">
              <Button variant="dark" >
                <MusicNoteList />
                &nbsp;
                Comenzar
              </Button>
            </Link>
          </div>

        </div>

      </section>

    </Fragment>
  );

}

export default Landing;