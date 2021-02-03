import React from 'react';
import {Navbar,Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom'

const NavMenu = (props:any) => {

  return (
    <header>

      <Navbar className="fixedHead" fixed="top" bg="dark" variant="dark">
        <Link to="/">
          <Navbar.Brand as="div" >
            <i className="bi bi-play-fill">
              <svg width="32" height="32" fill="currentColor" className="bi bi-play-fill" viewBox="0 0 16 16">
                <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
              </svg>
            </i>
            I Music Social Media
          </Navbar.Brand>
        </Link>

        <Nav className="ml-auto align-items-center ">
          {props.children}
        </Nav>

        </Navbar>

    </header>
  );

}

export default NavMenu;