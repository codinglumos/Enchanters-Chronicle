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
        chronicle: ""
    })
    const { chronicleId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:8088/chronicles/${chronicleId}`)
            .then(response => response.json())
            .then((data) => {
                editChronicle(data)
            })
    }, [chronicleId])

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


    return <form className="ticketForm">
        <h2 className="ticketForm__title">Transfigure this Chronicle</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="chronicle">Chronicle Entry:</label>
                <textarea
                    required autoFocus
                    type="text"
                    style={{
                        height: "10rem"
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
    
        <button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn-btn-primary">
            Save Transfigurations
        </button>
    </form>
}