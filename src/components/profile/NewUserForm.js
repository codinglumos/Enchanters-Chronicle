//This module will allow users to update their witch and sign identities on their account.
//Need to fetch witch and sign object arrays to use in the form below. 
//Need another fetch call here for the below. With the fetch call we need to set state too.
//The url could be expanded to include witches and signs for the below items on the form.
//If they are not expanded then there will need to be two fetch calls one for each. 
//TODO- fix the form so that it updates the witch/sign data in the original userObject- should it be moved to the register page??
//Should I make the initial state in register.js with the witch and sign!!
//TODO- for the new table I will need to expand users with the userInfo Objectarray to access all the information
        //TODO- OR I need to create a useEffect and useState for the new userInfo array

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./NewUserForm.css"

export const NewUserForm = () => {
    // TODO: Provide initial state for profile
    const [userInfo, updatedUserInfo] = useState ({
        witchId: 0,
        signId: 0,
        userId: 0      
    })
    
    const localEnchantedUser = localStorage.getItem("enchanted_user")
    const enchantedUserObject = JSON.parse(localEnchantedUser)
    //set state for userInfo id
    const [updateInfoId, setUpdateInfoId] = useState(0)

    // TODO: Get employee profile info from API and update state
    const [witches, setWitches] = useState([])
    const [signs, setSigns] = useState([])

//TODO Go fetch userInfo to use and update the below information with the new table
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

//Go fetch users 
useEffect(() => {
    fetch(`http://localhost:8088/users?id=${enchantedUserObject.id}`)
    .then(response => response.json())
    .then((data) => {
        const userObject = data[0]
        updatedUserInfo(userObject)
    })
    fetch(`http://localhost:8088/userInfos?userId=${enchantedUserObject.id}`)
    .then(response => response.json())
    .then((data) => {
        setUpdateInfoId(data[0].id)
    })
},
[])

//POST new user(profile) information to the API when the updateNewUser event happens (button click below)
const updatedUser = (event) => {
    event.preventDefault()

    const userInfoToSendToAPI = {
        signId: userInfo.signId,
        witchId: userInfo.witchId,
        userId: enchantedUserObject.id
    } 

   //TODO-paseInt the updateInfoId?? 
  
        console.log(updateInfoId)
        return fetch(`http://localhost:8088/userInfos/${updateInfoId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userInfoToSendToAPI)
        })
        .then(response => response.json())
        .then(() =>{
            setFeedback("Enchanter's profile successfully updated")
    
        })
    
 
} 
    return (<>
    <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
    {feedback}
</div>
        <form className="profile">
            <h2 className="title-h1">Update Enchanter</h2>
            <fieldset className="updateforms">
                <div className="select">
                    <label className="title-h11" htmlFor="signs">Zodiac Sign:</label>
                    <select className="select option" id="signs" value={userInfo.signId} type="number"
                        
                        onChange={(evt) => {
                            const copy = structuredClone(userInfo)
                                copy.signId = parseInt(evt.target.value)
                                updatedUserInfo(copy)
                        }}>
                            <option value={signs}></option>
                            {
                                signs.map(sign => {
                                    return <option className="box" value={sign.id} key={`sign--${sign.id}`}>{sign.sign}</option>
                                })
                            }</select>
                </div>
            </fieldset>
            <fieldset className="updateforms">
                <div className="select">
                    <label className="title-h11" htmlFor="witch">Witch Type:</label>
                    <select className="select option" id="witch" value={userInfo.witchId} type="number" 
                        onChange={(evt) => {
                            const copy = structuredClone(userInfo)
                                copy.witchId = parseInt(evt.target.value)
                                updatedUserInfo(copy)
                        }}>
                            <option value={witches}></option>
                            {
                                witches.map(witch => {
                                    return <option className="box" value={witch.id} key={`witch--${witch.id}`}>{witch.type}</option>
                                })
                            }
</select>
                </div>
            </fieldset>
            
            <button
                onClick={(clickEvent) => updatedUser(clickEvent)}
                className="btn-btn-primary">
                Save Profile
            </button>
        </form>
        </>
    )
}
