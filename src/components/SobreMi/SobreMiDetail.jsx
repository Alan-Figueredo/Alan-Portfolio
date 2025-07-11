import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row } from "react-bootstrap";
import { links } from "../data/links.ts";

export const SobreMiDetail = () => {
  return (
    <Row className="mt-4 sobreMiDetail">
      <div id="sobreMi" className="col-sm-6 col-md-6 col-12">
        <h1 id="hsob">Sobre Mí</h1>
        <p>
          ¡Hola! Soy Alan Figueredo, Desarrollador Web Full Stack. Cuento con
          más de 3 años de experiencia trabajando en entornos empresariales,
          desarrollando soluciones eficientes y escalables tanto del lado del
          cliente como del servidor. Me especializo en la resolución de
          problemas complejos y disfruto colaborar en equipos
          multidisciplinarios para alcanzar objetivos comunes.
        </p>
        <p>
          Más abajo encontrarás mi stack tecnológico, formación académica,
          idiomas que manejo y algunos de mis hobbies personales.
        </p>
        <Row className="my-5 justify-content-center">
          <a
            className="col-sm-1 col-6 text-sm text-center"
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} className="fab fa-github" />
          </a>
          <a
            className="col-sm-4 col-6 text-sm text-center"
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faLinkedinIn}
              className="fab fa-linkedin-in"
            />
          </a>
          <a
            className="col-sm-4 col-10 mt-sm-0 mt-2 nav-link cv2 text-sm text-center"
            href={links.cv}
            target="_blank"
            rel="noopener noreferrer"
          >
            Descargar CV
          </a>
        </Row>
      </div>
      <div className="col-12 mt-5 mb-4 mt-sm-0 col-sm-6 d-flex">
        <img
          className="img-fluid avatar shadow m-auto"
          src="images/Alan.jpg"
          alt="Alan Figueredo"
        />
      </div>
    </Row>
  );
};
