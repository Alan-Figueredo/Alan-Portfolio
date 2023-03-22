import { Navbar } from "react-bootstrap"
import { Container } from "react-bootstrap"
import "./NavBar.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faBars } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";


export const NavBar = () =>{
        let ubicacionPrincipal = window.pageYOffset;
        window.onscroll = function(){
            let Desplazamiento_Actual = window.pageYOffset;
            if(ubicacionPrincipal >= Desplazamiento_Actual){
                document.getElementById('navBar').classList = 'py-3 myStyle';
                document.getElementById('navBar').style.top = '0';
            }else{
                document.getElementById('navBar').classList = 'py-3 myStyle';
                document.getElementById('navBar').style.top = '-100px';
            }
            ubicacionPrincipal = Desplazamiento_Actual;
        }
        function clickearCerrar(){
            document.getElementById("nav-ul").classList.toggle("show")
            document.getElementById("nav-ul").classList.remove("d-none");
        }
    return(
        <Navbar className="px-0" id="navBar" >
            <Container >
                <div>
                    <button className="hamburger" id="hamburger" onClick={()=>{
                            document.getElementById("nav-ul").classList.toggle("show");
                            document.getElementById("nav-ul").classList.remove("d-none");
                        }}>
                        <FontAwesomeIcon icon={faBars}/>
                    </button>
                    <ul id="nav-ul">
                        <li>
                            <a href="#sobreMi" to="/sobre-mi" activeClassName="active" className=" nav-link item" onClick={clickearCerrar}>Sobre mi</a>
                        </li>
                        <li>
                            <a href="#proyectos" to="/proyectos" activeClassName="active" className=" nav-link  item" onClick={clickearCerrar}>Proyectos</a>
                        </li> 
                        <li>
                            <a href="#stackTech" to="/proyectos" activeClassName="active" className=" nav-link  item" onClick={clickearCerrar}>Stack Tecnolgico</a>
                        </li> 
                        <li>
                            <a href="#JobXp" to="/proyectos" activeClassName="active" className=" nav-link  item" onClick={clickearCerrar}>Experiencia Laboral</a>
                        </li> 
                        <li>
                            <a href="#contacto" to="/contacto" activeClassName="active" className=" nav-link  item" onClick={clickearCerrar}>Contacto</a>
                        </li>
                    </ul>
                </div>
            </Container>
        </Navbar>
    )
}