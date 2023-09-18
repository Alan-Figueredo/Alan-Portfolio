import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Row } from "react-bootstrap"

export const SobreMiDetail = () => {
    return (
        <Row className="mt-4 sobreMiDetail">
            <div id="sobreMi" className="col-sm-6 col-md-6 col-12">
                <h1 id="hsob">Sobre Mí</h1>
                <p>Mi nombre es Alan Figueredo y soy Desarrollador Web FullStack. Cuento con más de 2 años como desarrollador para empresas. Especialista en resolver problemas y realizar trabajo en equipo</p>
                <p>Abajo está mi stack tecnológico, como también mis estudios, idiomas que manejo y mis hobbies. </p>
                <Row className="my-5 justify-content-center">
                    <a className="col-sm-1 col-6 text-sm text-center" href="https://github.com/Alan-Figueredo" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} className="fab fa-github" /></a>
                    <a className="col-sm-4 col-6 text-sm text-center" href="https://www.linkedin.com/in/alan-figueredo/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedinIn} className="fab fa-linkedin-in" /></a>
                    <a className="col-sm-4 col-10 mt-sm-0 mt-2 nav-link cv2 text-sm text-center " href="https://drive.google.com/file/d/1_KachtCDyvc1kKi2pb5Gk3JAYwcw3aLv/view?usp=drive_link" target="_blank" rel="noopener noreferrer">Descargar CV</a>
                </Row>
            </div>
            <div className="col-12 mt-5 mb-4 mt-sm-0 col-sm-6 d-flex">
                <img className="img-fluid avatar shadow m-auto" src="images/Alan.jpg" alt="Alan Figueredo" />
            </div>
        </Row>
    )
}