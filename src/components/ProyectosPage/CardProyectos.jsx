import Proyects from "../Proyects.json"
import { Row } from "react-bootstrap";

const CardProyectos = ()=>{
    const verOnline = (URL)=>{
        if(URL !== ""){
            return(<div className="col-6 text-right"><a href={URL} target="_blank" rel="noopener noreferrer" className="btn">Ver online</a></div>)
        }
    }
    return(
        Proyects && Proyects.map( proyect=>{
            return(
                <div className="col-sm-4 col-12" key={proyect.id}>
                    <div className="card shadow mb-3">
                        <div className="mx-3 my-3">
                            <Row className="mb-3 mx-2">
                                <img src={proyect.img} className="img-fluid shadow" alt=""/>
                            </Row>
                            <Row className="sv">
                                <h2 className="my-2 text-center">{proyect.caption}</h2>
                            </Row>
                            <Row className="mx-1 my-3">
                                <p>{proyect.description}</p>
                            </Row>
                            <Row className="mb-5">
                                <div className=" col-6 text-right mr-2">
                                    <a href={proyect.code} target="_blank" rel="noopener noreferrer" className="btn">Código fuente</a>
                                </div>
                                {verOnline(proyect.onlineURL)}                                                         
                            </Row>
                        </div>
                    </div>
                </div>
            )
        })
    )
}
export default CardProyectos;