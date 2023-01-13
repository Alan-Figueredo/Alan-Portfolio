import { Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SobreMi.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faCommentAlt, faStar } from "@fortawesome/free-solid-svg-icons";
import StackTecnologico from "../SobreMi/StackTecnologico";
import Estudios from "../SobreMi/Estudios";
import { Contacto } from "../Contacto/Contacto";
import { Proyectos } from "../ProyectosPage/Proyectos";
import ExperienciaLaboral from "../SobreMi/ExperienciaLaboral";
export const SobreMi = () => {
    return (
        <Container className="sobre-mi" id="containerSobreMi">
            <Row className="mt-1">

            </Row>
            <Row className="mt-4">
                <div id="sobreMi" className="col-sm-6">
                    <h1 id="hsob">Sobre Mí</h1>
                    <p>Mi nombre es Alan Figueredo y soy Desarrollador Web Front end. Soy un joven con más de 2 años como desarrollador para empresas. Especialista en resolver problemas y realizar trabajo en equipo</p>
                    <p>Abajo está mi stack tecnológico, como también mis estudios, idiomas que manejo y mis hobbies. </p>
                    <Row className="my-5">
                        <a className="col-sm-1 col-6 text-sm text-center" href="https://github.com/Alan-Figueredo" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} className="fab fa-github" /></a>
                        <a className="col-sm-4 col-6 text-sm text-center" href="https://www.linkedin.com/in/alan-figueredo/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedinIn} className="fab fa-linkedin-in" /></a>
                        <a className="col-sm-4 col-10 mt-sm-0 mt-2 nav-link cv2 text-sm text-center " href="https://drive.google.com/file/d/1xIfuSJzIMA7nmLj56PiUvRV77LbK0LjI/view?usp=sharing" target="_blank" rel="noopener noreferrer">Descargar CV</a>
                    </Row>
                </div>
                <div className="col-12 mt-5 mb-4 mt-sm-0 col-sm-6 text-center">
                    <img className="img-fluid avatar shadow " src="images/Alan.jpg" alt="Alan Figueredo" />
                </div>
            </Row>
            <hr />
            <Proyectos />

            <hr />
            <Container id="stackTech" className="my-5">
                <Row className="my-5">
                    <div className="col">
                        <h2 id="htec">Stack Tecnológico</h2>
                    </div>
                </Row>
                <Row className="mb-3 inner">
                    <StackTecnologico />
                </Row>
            </Container>
            <hr />
            <Container className="idyh">
                <Row className="my-5">
                    <div className="col">
                        <h2 id="htec">Información personal</h2>
                    </div>
                </Row>
                <div className="row my-5">
                    <div className="col-sm-6 col-12 mb-3 mt-3">
                        <div className="card shadow">
                            <div className="row pl-3">
                                <div id="cardd" className="col-sm-3 col-5">
                                    <FontAwesomeIcon icon={faCommentAlt} className="fa-comment-alt text-center my-4" />
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
                                    <FontAwesomeIcon icon={faStar} className="fas fa-star text-center my-4" />
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
            <hr />
            <Container>
                <section id="JobXp">
                    <Row className="mb-4 ml-4">
                        <div>
                            <h2 className="mt-5">Experiencia Laboral</h2>
                        </div>
                    </Row>
                    <Row>
                        <ExperienciaLaboral />
                    </Row>
                </section>

            </Container>
            <hr />
            <Container>
                <section id="est">
                    <Row className="mb-4 ml-4">
                        <div>
                            <h2 className="mt-5">Estudios</h2>
                        </div>
                    </Row>
                    <Row className="mb-2">
                        <Estudios />
                    </Row>
                </section>
            </Container>
            <hr />
            <Contacto />
        </Container>
    )
}