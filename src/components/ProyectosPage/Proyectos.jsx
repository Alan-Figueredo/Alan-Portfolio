import {  Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Proyectos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Proyects from "../Proyects.json"

export const Proyectos = () =>{
    return(
        <>
            <Container className="proyectos">
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
                    {
                        Proyects && Proyects.map( proyect=>{
                            return(
                                <div className="col-sm-4 col-12" key={proyect.id}>
                                    <div className="card shadow mb-3">
                                        <div className="mx-3 my-3">
                                            <Row className="mb-3 mx-2">
                                                <img src={proyect.img} className="img-fluid shadow" alt=""/>
                                            </Row>
                                            <Row className="sv">
                                                <h2 className="my-2 text-center">{proyect.caption}</h2>
                                            </Row>
                                            <Row className="mx-1 my-3">
                                                <p>{proyect.description}</p>
                                            </Row>
                                            <Row className="mb-5">
                                                <div className="col text-right mr-2">
                                                    <a href={proyect.code} target="_blank" rel="noopener noreferrer" className="btn">Código fuente</a>
                                                </div>                                                            
                                            </Row>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </Row>
            </Container>
            <div>
                <a href="https://api.whatsapp.com/send?phone=+541151212855&text=%C2%A1Hola!%20Gracias%20por%20contactar%20conmigo.%20Deja%20tu%20mensaje,%20te%20respondere%20en%20breve." target="_blank" rel="noopener noreferrer" ><FontAwesomeIcon icon={faWhatsapp} className="fa-whatsapp"/></a>
            </div>  
        </>
    )
}