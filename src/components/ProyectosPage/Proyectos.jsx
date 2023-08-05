import {  Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Proyectos.css";
import CardProyectos from "./CardProyectos";
import Projects from "../Proyects.json"
import { useState } from "react";

export const Proyectos = () =>{
    const [proyectos, setProyectos] = useState(3)
    const [hidden, setHidden] = useState(false)
    console.log(proyectos)
    return(
        <>
            <Container id="proyectos" className="proyectos">
                <Row>
                    <div className="col-sm col-12 mb-3 mt-4">
                        <h1>Mis proyectos</h1>
                    </div>
                </Row>
                <Row>
                    <div className="col-sm-6 col-12 mb-4">
                        <p id="p1">Estos son los proyectos que fui realizando a medida que me iba forjando como desarrollador y estoy capacitado a realizar. </p>
                    </div>
                </Row>          
                <Row>
                    <CardProyectos projectsQ={proyectos} />
                    <button  className="verMas w-25 m-auto"  hidden={hidden} onClick={()=>{setProyectos(Projects.length); setHidden(!hidden)}}>Ver más</button>
                </Row>
            </Container>
        </>
    )
}