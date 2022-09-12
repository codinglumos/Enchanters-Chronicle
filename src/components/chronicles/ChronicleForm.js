import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const ChronicleForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */
const [moonPhases, setMoonPhases] = useState([])
    const [chronicle, update] = useState({
        chronicle: "",
        moonPhaseId: 0,
    })

    useEffect(() => {
        fetch(`http://localhost:8088/moonPhases`, )
        .then(response => response.json())
        .then((moonArray) =>{
            setMoonPhases(moonArray)
        }) 
        
    },
    []
    )
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */
    const navigate = useNavigate()

    const localEnchantedUser = localStorage.getItem("enchanted_user")
    const enchantedUserObject = JSON.parse(localEnchantedUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        

        // TODO: Create the object to be saved to the API
    
        const chronicleToSendToAPI = {
            userId: enchantedUserObject.id,
            chronicle: chronicle.chronicle,
            moonPhase: chronicle.moonPhaseId,
            dateCompleted: ""
        }

        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/chronicles`, {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(chronicleToSendToAPI)
        })
        .then(response => response.json())
        .then(() => {
            navigate("/chronicles")
        })
    }

    return (
        <form className="chronicleForm">
            <h2 className="chronicleForm__title">New Chronicle Entry</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="chronicle">Chronicle:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="New Chronicle Entry.."
                        value={chronicle.chronicle}
                        onChange={
                            (evt) => {
                                const copy = structuredClone(chronicle)
                                copy.chronicle = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Moon Phase:</label>
                    <select>
                    {
                        moonPhases.map(moonPhase => {
                <option 
                        // value={moonPhase.id}
                        // onChange={
                        //     (evt) => {
                        //         const copy = structuredClone(chronicle)
                        //         copy.phaseName = evt.target.value
                        //         update(copy)
                        //     }
                         >{moonPhase.phaseName}</option>
                        }
                        )}
                    </select>
                    
                    
                    
                </div>
            </fieldset>
            <button 
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)} 
            className="btn btn-primary">
                Submit Chronicle Entry
            </button>
        </form>
    )
}