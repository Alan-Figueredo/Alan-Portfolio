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
                            <a href="" id="mmt">Mirá mi trabajo</a>
                        </div>
                    </Row>
                </Container>
            </form>
            <div>
                <a href="https://web.whatsapp.com/" target="_blank" ><FontAwesomeIcon icon={faWhatsapp} className="fa-whatsapp"/></a>
            </div>  
        </>
    )
} 