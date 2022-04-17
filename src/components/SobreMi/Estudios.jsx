import Studies from "../Studies.json";
import { Row } from "react-bootstrap";
const Estudios = ()=>{
    return(
        Studies && Studies.map( study=>{
            return(
                <div key={study.id} className="col-sm-6 col-12">
                    <div className="card shadow p-4 mb-3 mb-sm-5">
                        <Row>
                            <div className="col-sm-3 col-3">
                                <img src={study.img} className="imgEstudios" alt=""/>
                            </div>
                            <div className="col">
                                <h3>{study.caption}</h3>
                                <h3>{study.company}</h3>
                                <h4>{study.date}</h4>
                                <div>
                                    <ul>
                                        <li><span className="spann">{study.proyects}</span></li>
                                    </ul>
                                </div>
                            </div>
                        </Row>
                        <Row>
                            <div>
                                <a className="ml-3 verEmpresa" target="_blank" rel="noopener noreferrer" href={study.linkCompany}>VER EMPRESA</a>
                            </div>
                        </Row>
                    </div>
                </div>
            )
        })
    )
}
export default Estudios;