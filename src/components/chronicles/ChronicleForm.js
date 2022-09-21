//This module creates the form for writing new chronicles for each user. 
//I need access to moon phases from the API- fetch call AND set state before
//I need to POST the completed form to the API when the button is clicked.
//Add the calendar to the form for users to select the date the entry was made (npm install from Google!)
import { useEffect, useState, React } from "react"
import { useNavigate } from "react-router-dom"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export const ChronicleForm = () => {

//const [name, setName] = useState("");
//const [selectedFile, setSelectedFile] = useState(null);
const [moonPhases, setMoonPhases] = useState([])
const [date, setDate] = useState(new Date())
//const [loading, setLoading] = useState(false)
const [image, setImage] = useState("")
const [url, setUrl] = useState("https://api.cloudinary.com/v1_1/dp9hatn4d/upload")

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
        TODO: Add the correct default properties to the
        initial state object
    */
    const [chronicle, update] = useState({
        chronicle: "",
        moonPhase: "",
        
    })

    /*
    TODO: Use the useNavigation() hook so you can redirect the user to the chronicle list
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
            dateCompleted: date    
        }

        const imageData = new FormData()
        imageData.append("file", image)
        imageData.append("upload_preset", "enchanters_chronicleForm")
            fetch(url, {
                method:"POST",
                body: imageData
            })
            .then(response => response.json())
            .then((data) => {
                chronicleToSendToAPI.chronicleImageUrl = data.url
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
            })

            .catch(err => console.log(err))
        
        // TODO: Perform the fetch() to POST the object to the API
        // return fetch(`http://localhost:8088/chronicles`, {
        //     method:"POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(chronicleToSendToAPI)
        // })
        // .then(response => response.json())
        // .then(() => {
        //     uploadImage()
        //     navigate("/chronicles")
        // })

      
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
                    <label htmlFor="moonPhases">Moon Phase:</label>
                    <select id="moonPhases" value={chronicle.moonPhaseId}
                        onChange={(evt) => {
                            const copy = structuredClone(chronicle)
                                copy.moonPhaseId = evt.target.value
                                update(copy) 
                        }}>
                            <option value={moonPhases}></option>
                            {
                                //TODO getting errors here- the moon phase is not printing out?!
                                moonPhases.map(moonPhase => {
                                    return <option value={chronicle.moonPhase.phaseName} key={`moonPhase--${moonPhase.id}`}>{moonPhase.phaseName}</option>
                                })
                            }
</select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <DatePicker
                   selected={date} onChange={(date) => {
                    const copy = structuredClone(chronicle)
                    copy.dateCompleted = date
                    setDate(date)
                    update(copy)}}/>
                </div>
            </fieldset>
<fieldset>
    <div>
        <div>
            <input type="file" onChange={(e)=> setImage(e.target.files[0])} />
        </div>
    </div>
</fieldset>

            <fieldset>
            <button 
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)} 
            className="btn btn-primary">
                Submit Chronicle Entry
            </button>
            </fieldset>
        </form>
    )
}


// cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); })