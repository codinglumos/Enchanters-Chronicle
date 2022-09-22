//This module will allow users to search through their chronciles to find
//ones on certain moon phases. 
//I will need to have a prop for moon phases here?
import { useNavigate } from "react-router-dom"

export const ChronicleSearch = ({ setterFunction }) => {   
    const navigate = useNavigate()

    return (
        <div className="search">
         <input className="searchterms" type="text" placeholder="Seek Moon Phase Entries"
         onChange={
             (changeEvent) => {
                 setterFunction(changeEvent.target.value)
             }
            
         }
          />
         </div> 
     )
 }