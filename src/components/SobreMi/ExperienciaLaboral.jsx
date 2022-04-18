import JobExperience from "../JobExperience.json"
import { Row } from "react-bootstrap";
const ExperienciaLaboral = ()=>{
    return(
        JobExperience && JobExperience.map( job=>{
            return(
                    <div key={job.id} className="col-sm-6 col-12">
                        <div className="card shadow p-4 mb-3 mb-sm-5">
                            <Row>
                                <div className="col-sm-3 col-3">
                                    <img src={job.img} className="imgEstudios" alt=""/>
                                </div>
                                <div className="col">
                                    <h3>{job.caption}</h3>
                                    <h3>{job.company}</h3>
                                    <h4>{job.date}</h4>
                                    <div>
                                        <ul>
                                            <li><span className="spann">{job.tasks}</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </Row>
                            <Row>
                                <div>
                                    <a className="ml-3 verEmpresa" target="_blank" rel="noopener noreferrer" href={job.linkCompany}>VER EMPRESA</a>
                                </div>
                            </Row>
                        </div>
                    </div>
            )
        })
    )
}
export default ExperienciaLaboral;