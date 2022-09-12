import { useEffect, useState } from "react"

export const NewUserForm = () => {
    // TODO: Provide initial state for profile
    const [profile, updatedProfile] = useState ({
        witchId: 0,
        signId: 0,
        userId: 0,
        email: ""
    })

    const localEnchantedUser = localStorage.getItem("enchanted_user")
    const enchantedUserObject = JSON.parse(localEnchantedUser)

    // TODO: Get employee profile info from API and update state
    useEffect(() => {
        fetch(`http://localhost:8088/users?userId=${enchantedUserObject.id}`)
        .then(response => response.json())
        .then((data) => {
            const userObject = data[0]
            updatedProfile(userObject)
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

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */
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
                <select options={profile.signId} className="form-group">
                    <label htmlFor="sign">Zodiac Sign:</label>
                    <input 
                        className="form-control"
                        value={profile.signId}
                        onChange={
                            (evt) => {
                                const copy = structuredClone(profile)
                               copy.signId = evt.target.value
                               updatedProfile(copy)
                            }
                        } />
                </select>
            </fieldset>
            <fieldset>
                <select options={profile.witchId} className="form-group">
                    <label htmlFor="witch">Witch Type:</label>
                    <input 
                        className="form-control"
                        value={profile.witchId}
                        onChange={
                            (evt) => {
                                const copy = structuredClone(profile)
                               copy.witchId = evt.target.value
                               updatedProfile(copy)
                            }
                        } />
                </select>
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
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Profile
            </button>
        </form>
        </>
    )
}