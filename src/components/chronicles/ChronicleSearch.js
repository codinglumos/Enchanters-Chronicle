//This module will allow users to search through their chronciles to find
//ones on certain moon phases. 
//I will need to have a prop for moon phases here?

export const ChronicleSearch = ({ setterFunction }) => {
    return (
        <div>
         <input 
         onChange={
             (changeEvent) => {
                 setterFunction(changeEvent.target.value)
             }
         }
         type="text" placeholder="Search Chronicles?" />
         </div> 
     )
 }