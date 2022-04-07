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
                <Row>
                    <div className="col-sm m-auto">
                        <a href="https://github.com/Alan-Figueredo" className="mr-2" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} className="fab fa-github"/></a>
                    </div>
                    <div className="col-sm m-auto">
                        <a href="https://www.linkedin.com/in/alan-figueredo/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedinIn} className="fab fa-linkedin-in"/></a>
                    </div> 
                    <div className="col-sm m-auto">
                        <a href="https://depcsuite.com/" target="_blank" rel="noopener noreferrer" id="depc">DePCSuite</a>
                    </div>
                    <div className="col-sm m-auto">
                        <a href="mailto:afigueredo2000@gmail.com" id="mail" >afigueredo2000@gmail.com</a>
                    </div>
                </Row>      
            </Container> 
        </>
    )
}