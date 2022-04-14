import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from "react-bootstrap";
import "./Inicio.css";
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
                            <NavLink id="linkBotonTrabajo" to="sobre-mi"><a id="botonTrabajo">Mirá mi trabajo</a></NavLink>
                        </div>
                    </Row>
                </Container>
            </form>
        </>
    )
}