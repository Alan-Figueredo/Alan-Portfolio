import { Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./SobreMi.css";
import StackTecnologico from "../SobreMi/StackTecnologico";
import Estudios from "../SobreMi/Estudios";
import { Contacto } from "../Contacto/Contacto";
import { Proyectos } from "../ProyectosPage/Proyectos";
import ExperienciaLaboral from "../SobreMi/ExperienciaLaboral";
import { SobreMiDetail } from "./SobreMiDetail";
import { HobbiesNLang } from "./Hobbies&Lang";
export const SobreMi = () => {
    return (
        <Container className="sobre-mi" id="containerSobreMi">
            <SobreMiDetail />
            <hr />
            <Container>
                <section id="JobXp"><Row className="mb-4 ml-4"><div><h2 className="mt-5">Experiencia Laboral</h2></div></Row>
                    <Row><ExperienciaLaboral /></Row>
                </section>
            </Container>
            <hr />
            <Proyectos />
            <hr />
            <Container id="stackTech" className="my-5">
                <Row className="my-5">
                    <div className="col">
                        <h2>Stack Tecnológico</h2>
                    </div>
                </Row>
                <Row className="mb-3 mx-sm-4">
                    <StackTecnologico />
                </Row>
            </Container>
            <hr />
            <Container>
                <Row className="my-5">
                    <div className="col">
                        <h2>Información personal</h2>
                    </div>
                </Row>
                <Row>
                    <HobbiesNLang />
                </Row>
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