import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from "react-bootstrap";
import "./Inicio.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export const Inicio = () =>{
    return(
        <>
            <form action="" method="" className="index">
                <Container>
                    <Row>
                        <div className="col-sm-12">
                            <input type="text" name="" id="srch" disabled className="form-control text-center" placeHolder="Hola, mi nombre es Alan, desarrolador web Full Stack"/>
                        </div>
                    </Row>
                    <Row className="text-center mt-4">
                        <div className="col-sm-12">
                            <a  id="mmt">Mirá mi trabajo</a> 
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