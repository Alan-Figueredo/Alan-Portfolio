import React from "react";
import { Container, Row } from "react-bootstrap"
import "./Footer.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";


export const Footer = () =>{
    return(
        <>
            <Container id="footer" className="mb-4">
                <Row className="mb-3">
                    <div className="col-sm col-6 text-sm text-center">
                        <a href="https://github.com/Alan-Figueredo" className="mr-2" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} className="fab fa-github"/></a>
                    </div>
                    <div className="col-sm col-6 text-sm text-center">
                        <a href="https://www.linkedin.com/in/alan-figueredo/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedinIn} className="fab fa-linkedin-in"/></a>
                    </div>
                    <div className="col-sm text-center text-sm mt-sm mt-3">
                        <a href="mailto:afigueredo2000@gmail.com" id="mail">afigueredo2000@gmail.com</a>
                    </div>
                </Row>
                <Row>
                    <a href="https://api.whatsapp.com/send?phone=+541151212855&text=%C2%A1Hola!%20Gracias%20por%20contactar%20conmigo.%20Deja%20tu%20mensaje,%20te%20respondere%20en%20breve." target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faWhatsapp} className="fa-whatsapp"/></a>
                </Row>
            </Container>
        </>
    )
}