import { Container,  Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SobreMi.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faCommentAlt, faStar } from "@fortawesome/free-solid-svg-icons";
import Records from "../Records.json";
import Studies from "../Studies.json"

export const SobreMi = () =>{
    return(
        <Container className="sobre-mi">
            <Row className="my-4">
                <div className="col-sm-6">
                    <h1 id="hsob">Sobre Mí</h1>
                    <p>Mi nombre es Alan Figueredo y soy Desarrollador Web Front end. Soy un joven que busca su primera experiencia laboral en un equipo como desarrollador, para así seguir formandome, seguir aprendiendo y lograr mejorar mis habilidades tecnicas.</p>
                    <p>Abajo está mi stack tecnológico, como también mis estudios, idiomas que manejo y mis hobbies. </p>
                    <Row className="my-5">
                        <a className="col-sm-1 col-6 text-sm text-center" href="https://github.com/Alan-Figueredo" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} className="fab fa-github"/></a>
                        <a className="col-sm-4 col-6 text-sm text-center" href="https://www.linkedin.com/in/alan-figueredo/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedinIn} className="fab fa-linkedin-in"/></a>
                        <a className="col-sm-4 col-10 mt-sm-0 mt-2 nav-link cv2 text-sm text-center " href="https://drive.google.com/file/d/1xIfuSJzIMA7nmLj56PiUvRV77LbK0LjI/view?usp=sharing" target="_blank" rel="noopener noreferrer">Descargar CV</a>
                    </Row>
                </div>
                <div className="col-12 mt-5 mb-4 mt-sm-0 col-sm-6 text-center">
                    <img className="img-fluid avatar shadow" src="images/Alan.jpg" alt="Alan Figueredo"/>
                </div>
            </Row>
            <hr/>
            <Container id="tecs" className="my-5">
                <Row className="my-5">
                    <div className="col">
                        <h2 id="htec">Stack Tecnológico</h2>
                    </div>
                </Row>
                <Row className="mb-3 inner">
                    {
                        Records && Records.map( record =>{
                            return(
                                <div className="col-6 col-sm-2 mb-3">
                                    <div className="card shadow">
                                        <img src={record.icon} alt="tecnologias" className="imgflud cards"/> <br/>
                                        <h3 className="text-center tec">{record.caption}</h3>
                                    </div>
                                </div>
                            )
                        })
                    }
                   
                </Row>        
            </Container>
            <hr/>
            <Container className="idyh">
                <div className="row my-5">
                    <div className="col-sm-6 col-12 mb-3 mt-3">
                        <div className="card shadow">
                            <div className="row pl-3"> 
                                <div id="cardd" className="col-sm-3 col-5">
                                    <FontAwesomeIcon icon={faCommentAlt} className="fa-comment-alt text-center my-4"/> 
                                </div>
                                <div className="col">
                                    <h3 className="mt-2">IDIOMAS</h3>
                                    <h4>INGLES- FCE</h4>
                                    <h4>ESPAÑOL-Nativo</h4>
                                </div>
                            </div>  
                        </div>
                    </div>  
                    <div className="col-sm-6 col-12 mb-3 mt-3">
                        <div className="card shadow">
                            <div className="row pl-3"> 
                                <div id="cardd" className="col-sm-3 col-5">
                                    <FontAwesomeIcon icon={faStar} className="fas fa-star text-center my-4"/>
                                </div>
                                <div className="col">
                                    <h3 className="mt-2">HOBBIES</h3>
                                    <h4>Bateria</h4>
                                    <h4>Videojuegos</h4>
                                    <h4>Programar</h4>
                                </div>
                            </div>  
                        </div>
                    </div>
                </div>
            </Container>
            <hr/>
            <Container>
                <section id="est">
                    <Row className="mb-4 ml-4">
                        <div className="col-sm-1 col-4 mt-4">
                            <i className="fas fa-graduation-cap"></i>
                        </div>
                        <div>
                            <h2 className="mt-5">Estudios</h2>
                        </div>
                    </Row>
                    <Row className="mb-2">
                        {
                            Studies && Studies.map( study=>{
                                return(
                                    <div className="col-sm-6 col-12">
                                        <div className="card shadow p-4 mb-3 mb-sm-5">
                                            <Row>
                                                <div className="col-sm-3 col-3">
                                                    <img src={study.img} className="img-fluid" alt=""/>
                                                </div>
                                                <div className="col">
                                                    <h3>{study.caption}</h3>
                                                    <h3>{study.company}</h3>
                                                    <h4>{study.date}</h4>
                                                    <div>
                                                        <ul>
                                                            <li><span className="spann">{study.proyects}</span></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </Row>
                                            <Row>
                                                <div>
                                                    <a className="ml-3 vremprojo" target="_blank" rel="noopener noreferrer" href={study.linkCompany}>VER EMPRESA</a>
                                                </div>
                                            </Row>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </Row>
                </section>
            </Container>
        </Container>
    )
}