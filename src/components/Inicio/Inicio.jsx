import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from "react-bootstrap";
import "./Inicio.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { NavLink } from "react-router-dom";

export const Inicio = () =>{
    return(
        <>
            <form action="" method="" className="index">
                <Container>
                    <Row>
                        <div className="col-12 text-center">
                            <img src="images/programer.png" alt="programer" className="img-fluid" id="programer"/>
                        </div>
                    </Row>
                    <Row>
                        <div className="col-sm-12">
                            <input type="text" name="" id="srch" disabled className="form-control text-center" placeHolder="Hola, mi nombre es Alan, desarrolador web Frontend"/>
                        </div>
                    </Row>
                    <Row className="text-center mt-4">
                        <div className="col-sm-12">
                            <NavLink id="linkBotonTrabajo" to="sobre-mi"><a href="#" id="botonTrabajo">Mirá mi trabajo</a></NavLink>
                        </div>
                    </Row>
                </Container>
            </form>
            <div>
                <a href="https://api.whatsapp.com/send?phone=+541151212855&text=%C2%A1Hola!%20Gracias%20por%20contactar%20conmigo.%20Deja%20tu%20mensaje,%20te%20respondere%20en%20breve." target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faWhatsapp} className="fa-whatsapp"/></a>
            </div>  
        </>
    )
}