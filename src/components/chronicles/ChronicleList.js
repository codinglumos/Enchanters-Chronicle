import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./chronicles.css"

//export a fucntion to make the locationList set the state
    //using locations and setlocations to an empy array initially
//useEffect function to filter through locations and list them
//return html to list locations (iterated) with the name, address,size

export const ChronicleList = ({ searchChroniclesState }) => {
    const [chronicles, setChronicles] = useState([])
    const [filteredChronicles, setFiltered ] = useState ([])
   //use below to show only full moons??
    // const [topPriced, setTopPriced] = useState([])
   // const [productTypes, setProductTypes] = useState([])
   //Use below to search for entries with specific moonphases
   const [foundSearched, setFoundSearched] = useState(false)

const localEnchantedUser = localStorage.getItem("enchanted_user")
const enchantedUserObject = JSON.parse(localEnchantedUser)
const navigate = useNavigate()

useEffect(
    () => {
        const searchedChronicles = chronicles.filter(chronicle => 
            {return chronicle.moonPhaseId.toLowerCase().startsWith(searchChroniclesState.toLowerCase())}
            )
        searchedChronicles.length > 0 ? setFoundSearched(true) :setFoundSearched(false)
        setFiltered(searchedChronicles)
        searchChroniclesState === "" ? setFoundSearched(false) :setFoundSearched(true)
    },
    [searchChroniclesState]
)

useEffect (
    () => {
        fetch (`http://localhost:8088/chronicles`)
        .then(response => response.json())
        .then((chronicleArray) => {
            setChronicles(chronicleArray)
        })
    },
    []
)

useEffect(
    () => {
        if(enchantedUserObject) {
            setFiltered(chronicles)
        }
    },
    [chronicles]
)

//Need an ?: statement to determine if the user.id matches the current user logged in- if they match then only show the users chronicles

return <>
  { 
        <button onClick={() => navigate("/chronicle/create")}>Create New Chronicle</button>
    }
{/* <button onClick={() => {setTopPriced(true)}}>Top Priced</button>
<button onClick={() => {setTopPriced(false)}}>All Products</button> */}

    <h2>List of Chronicles</h2>

    <article className="chronicles">
        {
            filteredChronicles.map(
                (chronicle) => {
                    return <section className="chronicle" key={`chronicle--${chronicle.id}`}>
                        <header>{chronicle.chronicle}</header>
                        {/* Put a moonphase sorter below?? */}
                        {/* {!foundSearched && <section>Sweet Type: {chronicle?.chronicleType?.type}</section>} */}
                        <footer>Written on {chronicle.date}</footer>
                        
                    </section>
               
                }
            )
        }

    </article>
</>

}