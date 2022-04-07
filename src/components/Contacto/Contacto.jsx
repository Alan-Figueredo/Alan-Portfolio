import { Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Contacto.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export const Contacto = () =>{
    return(
        <>
            <Container className="mt-sm-4 contacto">
                <Row>
                    <div className="col mb-4">
                        <h1>Contacto</h1>
                    </div>
                </Row>     
                <Row>
                    <div className="col-sm col-12">
                        <p>Cualquier consulta o duda enviar un mensaje o bien un Whatsapp mediante el botón de la esquina inferior derecha.</p>
                    </div>
                    <div className="col-12 col-sm-6">
                        <form action="" method="POST">
                            <input type="text" name="txtNombre" id="nombre" placeholder="Nombre" className="shadow form-control"/><br/>
                            <input type="email" name="txtCorreo" id="email" placeholder="Email" className="shadow form-control"/>
                            <textarea name="txtMensaje" id="comentarios" cols="78" rows="10" placeholder="Comentarios..." className="shadow form-control"/>
                            <div class="mr-0 text-right">
                                <input type="submit" value="Enviar" id="enviar"/>
                            </div>
                        </form>
                    </div>
                </Row>               
            </Container>    
            <div>
                <a href="https://web.whatsapp.com/" target="_blank" ><FontAwesomeIcon icon={faWhatsapp} className="fa-whatsapp"/></a>
            </div>  
        </>
    )
}