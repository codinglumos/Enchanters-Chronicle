//I need to create an edit Chronicles function here to allow users to edit their chronicles.
//I need to call all the chronicles with a useEffect
//A button function to call chronicles and a PUT to update the chronicles with the new info
//JSX for the chronicle.chronicle information to print out
//Then a button (calling the button function Onclick) to save the changes
//You will need to add this to application views

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const ChronicleEdit = () => {
    const [chronicle, editChronicle] = useState({
        chronicle: "",
        moonPhase: ""
    })
    const { chronicleId } = useParams()
    const navigate = useNavigate()
    const [moonPhases, setMoonPhases] = useState([])


    useEffect(() => {
        fetch(`http://localhost:8088/chronicles/${chronicleId}`)
            .then(response => response.json())
            .then((data) => {
                editChronicle(data)
            })
    }, [chronicleId])

    useEffect(() => {
        fetch(`http://localhost:8088/moonPhases`)
        .then(response => response.json())
        .then((moonArray) =>{
            setMoonPhases(moonArray)
          //  editChronicle(moonArray)
        })    
    },
    [])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/chronicles/${chronicle.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(chronicle)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/chronicles")
            })
    }


    return <form className="chronicleForm">
        <h1 className="title-h1">Transfigure Chronicle</h1>
        <fieldset>
            <div className="select">
                <label className="title-h11" htmlFor="chronicle">Chronicle Entry:</label>
                <textarea
                    type="text"
                    style={{
                    }}
                    className="form-control"
                    value={chronicle.chronicle}
                    onChange={
                        (evt) => {
                            const copy = structuredClone(chronicle)
                            copy.chronicle = evt.target.value
                            editChronicle(copy)
                        }
                    }>{chronicle.chronicle}</textarea>
            </div>
        </fieldset>
        <fieldset>
                <div className="select">
                   <div><label className="label" htmlFor="moonPhases">Moon Phase:</label></div> 
                    <select placeholder="Moon Phase" id="moonPhases" value={chronicle.moonPhase}
                        onChange={(evt) => {
                            const copy = structuredClone(chronicle)
                                copy.moonPhase = evt.target.value
                                editChronicle(copy) 
                        }}>
                            <option value={moonPhases} placeholder="Moon Phase"></option>
                            {
                                moonPhases.map(moonPhase => {
                                    return <option placeholder="Moon Phase" value={chronicle.moonPhase.phaseName} key={`moonPhase--${moonPhase.id}`}>{moonPhase.phaseName}</option>
                                })
                            }
</select>
                </div>
            </fieldset>
        <button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn-btn-primary">
            Save Transfigurations
        </button>
    </form>
}

    