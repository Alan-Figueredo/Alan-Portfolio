import { Container, Row, Tab, Tabs } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Proyectos.css";
import CardProyectos from "./CardProyectos";
import Projects from "../Proyects.json"
import { useState } from "react";
import ProyectsUX from "../ProjectsUX.json"
export const Proyectos = () => {
    const [proyectos, setProyectos] = useState(3)
    const [hidden, setHidden] = useState(false)
    console.log(proyectos)
    return (
        <>
            <Container id="proyectos" className="proyectos">
                <Row>
                    <div className="col-sm col-12 mb-3 mt-4">
                        <h1>Mis proyectos</h1>
                    </div>
                </Row>
                <Row>
                    <Tabs defaultActiveKey="Desarrollo Frontend" id="uncontrolled-tab-example" className="mb-3">
                        <Tab eventKey="Desarrollo Frontend" className="fontTab" title="Desarrollo Frontend">
                            <Row>
                                <div className="col-sm-12 col-12 mb-4">
                                    <p id="p1">Estos son mis proyectos de desarrollo web frontend, donde se destacan el diseño y funcionalidad. Se adaptadan tanto a dispositivos móviles como a pantallas de escritorio. En cada proyecto se implementan de las últimas tecnologías y las mejores prácticas de desarrollo, con el objetivo de ofrecer experiencias en línea excepcionales. </p>
                                </div>
                            </Row>
                            <Row>
                                <CardProyectos projectsQ={proyectos} array={Projects} />
                                <button className="verMas m-auto" hidden={hidden} onClick={() => { setProyectos(Projects.length); setHidden(!hidden) }}>Ver más</button>
                            </Row>
                        </Tab>
                        <Tab eventKey="Diseño UX" className="fontTab" title="Diseño UX">
                            <Row>
                                <div className="col-sm-12 col-12 mb-4">
                                    <p id="p1">Estos son mis proyectos de diseño UX, donde se muestran rediseños de apps, mejorando la funcionalidad y diseño actuales. Para cada una de ellas se realizó una investigación profunda en la necesidad del usuario para así entregarles un producto completo y a medida. </p>
                                </div>
                            </Row>
                            <Row>
                                <CardProyectos projectsQ={3} array={ProyectsUX} />
                            </Row>
                        </Tab>
                    </Tabs>

                </Row>
            </Container>
        </>
    )
}