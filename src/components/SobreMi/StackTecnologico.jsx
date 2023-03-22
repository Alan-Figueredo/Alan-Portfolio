import Records from "../Records.json";

const StackTecnologico = ()=>{
    return(
    Records && Records.map( record =>{
        return(
            <div key={record.id} className="col-6 col-sm-2 mb-3">
                <div className="card shadow">
                    <img src={record.icon} alt="tecnologias" className="img-fluid cards"/> <br/>
                    <h3 className="text-center tec">{record.caption}</h3>
                </div>
            </div>
        )
    }))
}

export default StackTecnologico;