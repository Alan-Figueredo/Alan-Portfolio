import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCommentAlt, faStar } from "@fortawesome/free-solid-svg-icons";
import Hobbies from "../Hobbies&Lang.json"
export const HobbiesNLang = () => {
    return (
        Hobbies && Hobbies.map(hobbie => {
            return (
                <section className="col-sm-6 col-12 mb-3 mt-3">
                    <div className="card shadow">
                        <div className="row pl-3">
                            <div id="cardd" className="col-sm-3 col-5">
                                <FontAwesomeIcon icon={hobbie.type === "Idiomas" ? faCommentAlt : faStar} className="fa-comment-alt text-center my-4" />
                            </div>
                            <div className="col">
                                <h3 className="mt-2">{hobbie.type}</h3>
                                {hobbie.content && (hobbie.content).map(prueba => {
                                    return (
                                        <h4>{prueba}</h4>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            )
        }))
}
