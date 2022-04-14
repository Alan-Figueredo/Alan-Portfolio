import { Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Contacto.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import React, { useRef } from 'react';
import emailjs from 'emailjs-com';

export const Contacto = () =>{
    const alertaMensaje = document.getElementById("alertaMensaje")
    const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('gmail', 'template_qmxhiv3', e.target, '-1FLgxPUmudOciL-d')
        .then((result) => {
            console.log(result.text);
            
        }, (error) => {
            console.log(error.text);
        });
        e.target.reset();
    };
    return(
        <>
            <Container className="mt-sm-4 contacto">
                <Row>
                    <div className="col mb-4 mt-sm mt-4">
                        <h1 id="contactoH1">Contacto</h1>
                    </div>
                </Row>     
                <Row>
                    <div className="col-sm col-12">
                        <p>Cualquier consulta o duda sobre mis proyectos enviar un mensaje o bien un Whatsapp mediante el botón de la esquina inferior derecha, responderé a la brevedad.</p>
                    </div>
                    <div className="col-12 col-sm-6">
                        <form action="" method="POST" ref={form} onSubmit={sendEmail}>
                            <input type="text" name="name" id="nombre" placeholder="Nombre" className="shadow form-control"/><br/>
                            <input type="email" name="email" id="email" placeholder="Email" className="shadow form-control"/>
                            <textarea name="message" id="comentarios" cols="78" rows="10" placeholder="Comentarios..." className="shadow form-control"/>
                            <div>
                                <input  className="mb-3" type="submit" value="Enviar" id="enviar"/>
                            </div>
                            <div id="alertaMensaje">

                            </div>
                        </form>
                    </div>
                </Row>               
            </Container>    
            <div>
                <a href="https://api.whatsapp.com/send?phone=+541151212855&text=%C2%A1Hola!%20Gracias%20por%20contactar%20conmigo.%20Deja%20tu%20mensaje,%20te%20respondere%20en%20breve." target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faWhatsapp} className="fa-whatsapp"/></a>
            </div>  
        </>
    )
}