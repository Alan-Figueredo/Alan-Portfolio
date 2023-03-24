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
import { SobreMiDetail } from "./SobreMiDetail";
export const SobreMi = () => {
    return (
        <Container className="sobre-mi" id="containerSobreMi">
            <Row className="mt-1">

            </Row>
            <SobreMiDetail />
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
            <hr/>
            <Proyectos />

            <hr />
            <Container id="stackTech" className="my-5">
                <Row className="my-5">
                    <div className="col">
                        <h2 id="htec">Stack Tecnológico</h2>
                    </div>
                </Row>
                <Row className="mb-3 mx-sm-4">
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