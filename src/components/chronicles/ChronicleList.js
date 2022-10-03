import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./chronicles.css"

//export a fucntion to make the locationList set the state
    //using locations and setlocations to an empy array initially
//useEffect function to filter through locations and list them
//return html to list locations (iterated) with the name, address,size


export const ChronicleList = ({searchChroniclesState}) => {
    const [chronicles, setChronicles] = useState([])
    const [filteredChronicles, setFiltered ] = useState ([])

   //use below to show only full moons??
    // const [topPriced, setTopPriced] = useState([])
   // const [productTypes, setProductTypes] = useState([])
   //Use below to search for entries with specific moonphases
  
const localEnchantedUser = localStorage.getItem("enchanted_user")
const enchantedUserObject = JSON.parse(localEnchantedUser)
const navigate = useNavigate()

//use the prop defined in ChronicleContainer to create a UseEffect to search for moon phases

const myChronicles = () => {
   const myDoneChronicles = chronicles.filter(chronicle => enchantedUserObject.id === chronicle.userId) 
  setFiltered(myDoneChronicles)
}

useEffect(
    () => {
        const searchedChronicles = filteredChronicles.filter(chronicle => 
            {return chronicle.moonPhase.toLowerCase().includes(searchChroniclesState.toLowerCase())}
            )
    //searchedChronicles.length > 0 ? setFoundSearched(true) :setFoundSearched(false)
         
       searchChroniclesState === "" ? myChronicles() :setFiltered(searchedChronicles)

    },
    [searchChroniclesState]
)

//fetch all the chronicles
const getChronicleList = () => {
    fetch (`http://localhost:8088/chronicles`)
    .then(response => response.json())
    .then((chronicleArray) => {
        setChronicles(chronicleArray)
        setFiltered(chronicleArray)
    })
}

//Make a use Effect to load the chronicle list when clicked
useEffect (
    () => {
        getChronicleList()
        setFiltered()

    },
   //when this file is loaded go get chronicles
    []
)

useEffect(
    () => {
    
       myChronicles()
        
        },
        //Set array below to watch for a change in chronicles. 
    [chronicles]
)

//Need an ?: statement to determine if the user.id matches the current user logged in- if they match then only show the users chronicles

return <>
  { 
        <button className="create-button" onClick={() => navigate("/chronicle/create")}>Create New Chronicle</button>
    }
{/* <button onClick={() => {setTopPriced(true)}}>Top Priced</button>
<button onClick={() => {setTopPriced(false)}}>All Products</button> */}

    <h2 className="title-h2">Tally of Chronicles</h2>

    <article className="chronicles">
        {
            filteredChronicles.map(
                (chronicle) => {
                    return <section className="chroniclelist" key={`chronicle--${chronicle.id}`}>
                        <header>{chronicle.chronicle}</header>
                        {/* Put a moonphase sorter below?? */}
                        <section className="chronicle_moon">Moon Phase: {chronicle.moonPhase}</section>
                        <img className="chronicle_image" src={chronicle.chronicleImageUrl} />
                        <footer className="chronicle_date">Conjured on {chronicle.dateCompleted}</footer>
                        <button className="edit-button" onClick={() => navigate(`/chronicles/${chronicle.id}/edit`)}>Transfigure</button>
      
                     <button
                     className="btn-btn-deleteChronicle"
                     onClick={() => {
                        fetch(`http://localhost:8088/chronicles/${chronicle.id}`, {
                        method: "DELETE",
                    
                    })
                    .then(response => response.json())
                    .then(() => {
                        getChronicleList()
                        
                    })}}
                     >Vanquish Chronicle</button>   

                    </section>
                }
            )
        }

    </article>
</>

}