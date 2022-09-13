//This module holds the sibling elements for searching and listing chronicles. 
//I need to set state, call the functions from above modules and set props to use later.

import { useState } from "react"
import { ChronicleList } from "./ChronicleList"
import { ChronicleSearch } from "./ChronicleSearch"

export const ChronicleContainer = () => {
    const [searchChronicles, setSearchChronicles] = useState("")

    return <>
    <ChronicleSearch setterFunction={setSearchChronicles}/>
    <ChronicleList searchChroniclesState={searchChronicles}/>
    </>
   
}