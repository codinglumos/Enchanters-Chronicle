//This module will allow users to update their witch and sign identities on their account.
//Need to fetch witch and sign object arrays to use in the form below. 
//Need another fetch call here for the below. With the fetch call we need to set state too.
//The url could be expanded to include witches and signs for the below items on the form.
//If they are not expanded then there will need to be two fetch calls one for each. 
//TODO- fix the form so that it updates the witch/sign data in the original userObject- should it be moved to the register page??
//Should I make the initial state in register.js with the witch and sign!!

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const NewUserForm = () => {
    // TODO: Provide initial state for profile
    const [profile, updatedProfile] = useState ({
        witchId: 0,
        signId: 0,
        userId: 0
        
    })

    const localEnchantedUser = localStorage.getItem("enchanted_user")
    const enchantedUserObject = JSON.parse(localEnchantedUser)

    // TODO: Get employee profile info from API and update state
    const [witches, setWitches] = useState([])
    const [signs, setSigns] = useState([])
    const navigate = useNavigate()

//Go fetch users and 
    useEffect(() => {
        fetch(`http://localhost:8088/users?id=${enchantedUserObject.id}`)
        .then(response => response.json())
        .then((data) => {
            const userObject = data[0]
            updatedProfile(userObject)
        })
    },
    [])
//Go fetch witches
    useEffect(() => {
        fetch(`http://localhost:8088/witches`)
        .then(response => response.json())
        .then((witchArray) => {
            setWitches(witchArray)
        })
    },
    [])
//Go fetch signs
    useEffect(() => {
        fetch(`http://localhost:8088/zodiacSigns`)
        .then(response => response.json())
        .then((signArray) => {
            setSigns(signArray)
        })
    },
    [])

//Code from Steve to timeout the session for localhost:3000
const [feedback, setFeedback] = useState("")

useEffect(() => {
    if (feedback !== "") {
        // Clear feedback to make entire element disappear after 3 seconds
        setTimeout(() => setFeedback(""), 3000);
    }
}, [feedback])

//POST new user(profile) information to the API when the updateNewUser event happens (button click below)
const updateNewUser = (event) => {
    event.preventDefault()
    
    // const userToSendToAPI = {
    //     signId: profile.sign,
    //     witchId: profile.witch
    // }
    //Need to update the user, not create a new user-- use PUT
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
            <h2 className="profile__title">Update Enchanter</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="signs">Zodiac Sign:</label>
                    <select id="signs" value={profile.signId} type="number"

                        onChange={(evt) => {
                            const copy = structuredClone(profile)
                                copy.signId = parseInt(evt.target.value)
                                updatedProfile(copy)
                        }}>
                            <option value={signs}></option>
                            {
                                signs.map(sign => {
                                    return <option value={sign.id}>{sign.sign}</option>
                                })
                            }</select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="witch">Witch Type:</label>
                    <select id="witch" value={profile.witchId} type="number"
                        onChange={(evt) => {
                            const copy = structuredClone(profile)
                                copy.witchId = parseInt(evt.target.value)
                                updatedProfile(copy)
                        }}>
                            <option value={witches}></option>
                            {
                                witches.map(witch => {
                                    return <option value={witch.id}>{witch.type}</option>
                                })
                            }
</select>
                </div>
            </fieldset>
            
            <button
                onClick={(clickEvent) => updateNewUser(clickEvent)}
                className="btn btn-primary">
                Save Profile
            </button>
        </form>
        </>
    )
}