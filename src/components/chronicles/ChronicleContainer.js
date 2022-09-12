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