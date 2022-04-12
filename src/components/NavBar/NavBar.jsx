import { Navbar } from "react-bootstrap"
import { Container, Row } from "react-bootstrap"
import "./NavBar.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faDownload, faBars } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";


export const NavBar = () =>{
    const navUl = document.getElementById("nav-ul");
    return(
        <div className="bg-black py-3">
            <Container>
                <Row>
                    <Navbar className="navbar-expand-md px-0">
                        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                            <button className="hamburger" id="hamburger" onClick={()=>{
                                    navUl.classList.toggle("show");
                                }}>
                                <FontAwesomeIcon icon={faBars}/>
                            </button>
                            <ul className="nav-bar nav nav-ul" id="nav-ul">
                                <li className="nav-item col-sm">
                                    <NavLink to="/" activeClassName="active" className=" nav-link  item">Inicio</NavLink>
                                </li>
                                <li className="nav-item col-sm ">
                                    <NavLink to="sobre-mi" activeClassName="active" className=" nav-link item">Sobremi</NavLink>
                                </li>
                                <li className="nav-item col-sm">
                                    <NavLink to="proyectos" activeClassName="active" className=" nav-link  item">Proyectos</NavLink>
                                </li> 
                                <li className="nav-item col-sm">
                                    <NavLink to="contacto" activeClassName="active" className=" nav-link  item">Contacto</NavLink>
                                </li> 
                            </ul>
                        </div>
                        <div className="text-right nav col-sm col-12 text-sm text-right my-lg-0">
                            <li><div className="text-right"><a href="https://drive.google.com/file/d/1xIfuSJzIMA7nmLj56PiUvRV77LbK0LjI/view?usp=sharing" target="_blank" rel="noopener noreferrer" id="cv">Descargá mi cv <FontAwesomeIcon icon={faDownload}/></a></div></li>
                        </div>
                    </Navbar>
                </Row>
            </Container>
        </div>
    )
}