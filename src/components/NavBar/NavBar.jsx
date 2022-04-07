import { Navbar } from "react-bootstrap"
import { Container, Row } from "react-bootstrap"
import "./NavBar.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";


export const NavBar = () =>{
    return(
        <div className="bg-black py-3">
            <Container>
                <Row>
                    <Navbar className="navbar-expand-md px-0">
                        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                            <ul className="nav-bar nav">
                                <Row>
                                    <li className="nav-item col-sm">
                                        <NavLink to="/" activeClassName="active" className=" nav-link  item">Inicio</NavLink>
                                    </li>
                                    <li className="nav-item col-sm ">
                                        <NavLink to="sobre-mi" activeClassName="active" className=" nav-link item">S mi</NavLink>
                                    </li>
                                    <li className="nav-item col-sm">
                                        <NavLink to="proyectos" activeClassName="active" className=" nav-link  item">Proyectos</NavLink>
                                    </li>
                                    <li className="nav-item col-sm">
                                        <NavLink to="contacto" activeClassName="active" className=" nav-link  item">Contacto</NavLink>
                                    </li>
                                </Row>
                            </ul>
                        </div>
                        <div className="text-right nav my-lg-0">
                            <li><div className="text-right"><a href="Kevincv.pdf" id="cv" download="Kevincv.pdf">Descargá mi cv <FontAwesomeIcon icon={faDownload}/></a></div></li>
                        </div>
                    </Navbar>
                </Row>
            </Container>
        </div>
    )
}