import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"
//This is the form used when a user doesn't have a login yet
//The form should collect the following objects to add to the user array
export const Register = (props) => {
    //const [magicUserUpdated, setMagicUser] = useState([])
    const [user, setUser] = useState({
        email: "",
        name: "",

    })
    let navigate = useNavigate()


    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("enchanted_user", JSON.stringify({
                        id: createdUser.id,
                        staff: createdUser.isStaff
                    }))

                    navigate("/")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${user.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateUser = (evt) => {
        const copy = structuredClone(user)
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for Enchanter's Chronicle</h1>
                <fieldset>
                    <label htmlFor="name"> Name </label>
                    <input onChange={updateUser}
                           type="text" id="name" className="form-control"
                           placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateUser}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                {/* <fieldset>
                    <label htmlFor="witch"> Witch Type </label>
                    <select>
                        <option value={witch.type} onChange={updateUser}
                        type="select" id="witch" className="form-control"
                        placeholder="Witch Type" required></option>  
                        </select>
                </fieldset>
                <fieldset>
                    <label htmlFor="sign"> Zodiac Sign </label>
                    <option onChange={updateUser}
                        type="select" id="sign" className="form-control"
                        placeholder="Zodiac Sign" required />
                </fieldset> THIS WILL BE UPDATED ON USER ACCOUNT INSTEAD*/}
                
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}

