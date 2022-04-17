import { Navbar } from "react-bootstrap"
import { Container, Row } from "react-bootstrap"
import "./NavBar.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faBars } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";


export const NavBar = () =>{
    return(
        <div className="bg-black py-3">
            <Container>
                <Row>
                    <Navbar className=" px-0">
                        <div >
                            <button className="hamburger" id="hamburger" onClick={()=>{
                                    document.getElementById("nav-ul").classList.toggle("show");
                                }}>
                                <FontAwesomeIcon icon={faBars}/>
                            </button>
                            <ul className="nav-bar nav nav-ul" id="nav-ul">
                                <li className="nav-item ">
                                    <a href="#sobreMi" to="/sobre-mi" activeClassName="active" className=" nav-link item" >Sobre mi</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#proyectos" to="/proyectos" activeClassName="active" className=" nav-link  item" >Proyectos</a>
                                </li> 
                                <li className="nav-item">
                                    <a href="#contacto" to="/contacto" activeClassName="active" className=" nav-link  item" >Contacto</a>
                                </li> 
                                <li className="mt-1"><a href="https://drive.google.com/file/d/1xIfuSJzIMA7nmLj56PiUvRV77LbK0LjI/view?usp=sharing" target="_blank" rel="noopener noreferrer" id="cv">Descargá mi cv <FontAwesomeIcon icon={faDownload}/></a></li>
                            </ul>
                        </div>
                    </Navbar>
                </Row>
            </Container>
        </div>
    )
}