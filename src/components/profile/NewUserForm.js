//This module will allow users to update their witch and sign identities on their account.
//Need to fetch witch and sign object arrays to use in the form below. 
//Need another fetch call here for the below. With the fetch call we need to set state too.
//The url could be expanded to include witches and signs for the below items on the form.
//If they are not expanded then there will need to be two fetch calls one for each. 
//TODO- fix the form so that it updates the witch/sign data in the original userObject- should it be moved to the register page??

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const NewUserForm = () => {
    // TODO: Provide initial state for profile
    const [profile, updatedProfile] = useState ({
        witchId: 0,
        zodiacSignId: 0,
        userId: 0,
        email: ""
    })

    const localEnchantedUser = localStorage.getItem("enchanted_user")
    const enchantedUserObject = JSON.parse(localEnchantedUser)

    // TODO: Get employee profile info from API and update state
    const [witches, setWitches] = useState([])
    const [signs, setSigns] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:8088/users?userId=${enchantedUserObject.id}`)
        .then(response => response.json())
        .then((data) => {
            const userObject = data[0]
            updatedProfile(userObject)
        })
    },
    [])

    useEffect(() => {
        fetch(`http://localhost:8088/witches`)
        .then(response => response.json())
        .then((witchArray) => {
            setWitches(witchArray)
        })
    },
    [])

    useEffect(() => {
        fetch(`http://localhost:8088/zodiacSigns`)
        .then(response => response.json())
        .then((signArray) => {
            setSigns(signArray)
        })
    },
    [])

const [feedback, setFeedback] = useState("")


useEffect(() => {
    if (feedback !== "") {
        // Clear feedback to make entire element disappear after 3 seconds
        setTimeout(() => setFeedback(""), 3000);
    }
}, [feedback])
//POST new user(profile) information to the API when the addNewUser event happens (button click below)
const addNewUser = (event) => {
    event.preventDefault()
    
    const userToSendToAPI = {
        name: profile.name,
        email: profile.email,
        zodiacSignId: profile.signId,
        witchId: profile.witchId
    }
    
    fetch(`http://localhost:8088/users`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userToSendToAPI)
    })
        .then(response => response.json())

         .then(() => {
                navigate("/chronicles")
            })
        
            return fetch(`http://localhost:8088/users/${profile.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(profile)
               })
        
               .then(response => response.json())
               .then(() => {
                setFeedback("Witch profile successfully saved")
            })
    }   

    return (<>
    <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
    {feedback}
</div>
        <form className="profile">
            <h2 className="profile__title">New Enchanter's Chronicle Witch</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty">Email:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.email}
                        onChange={
                            (evt) => {
                               const copy = structuredClone(profile)
                               copy.email = evt.target.value
                               updatedProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="signs">Zodiac Sign:</label>
                    <select id="signs" value={profile.sign}
                        onChange={(evt) => {
                            const copy = structuredClone(profile)
                                copy.signId = evt.target.value
                                updatedProfile(copy)
                        }}>
                            <option value={signs}></option>
                            {
                                signs.map(sign => {
                                    return <option value={profile.signId}>{sign.sign}</option>
                                })
                            }
</select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="witch">Witch Type:</label>
                    <select id="witch" value={profile.witch}
                        onChange={(evt) => {
                            const copy = structuredClone(profile)
                                copy.witchId = evt.target.value
                                updatedProfile(copy)
                        }}>
                            <option value={witches}></option>
                            {
                                witches.map(witch => {
                                    return <option value={profile.witchId}>{witch.type}</option>
                                })
                            }
</select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text"
                        className="form-control"
                        value={profile.name}
                        onChange={
                            (evt) => {
                                const copy = structuredClone(profile)
                               copy.name = evt.target.value
                               updatedProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => addNewUser(clickEvent)}
                className="btn btn-primary">
                Save Profile
            </button>
        </form>
        </>
    )
}