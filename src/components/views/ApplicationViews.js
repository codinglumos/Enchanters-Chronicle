import { Outlet, Route, Routes } from "react-router-dom"
import { ChronicleList } from "../chronicles/ChronicleList"
import { ChronicleForm } from "../chronicles/ChronicleForm"
import { NewUserForm } from "../profile/NewUserForm"
import { ChronicleContainer } from "../chronicles/ChronicleContainer"
import { ChronicleSearch } from "../chronicles/ChronicleSearch"
import { useState } from "react"
import { ChronicleEdit } from "../chronicles/ChroniclesEdit"
import { SignBackground } from "../profile/Signs"
import { MoonPhaseImage } from "../views/moonphaseInfo"
import "./views.css"
import { TarotImage } from "./tarot"

//This is what the users see when they log in
//Then routes are made here to take users to other places on the app
//This is what you see in the url

export const UserViews = () => {
	return (
        <Routes>
            <Route path="/hearth" element={
                <>
                    <h1 className="title-h1">Enchanter's Chronicle</h1>
                    <h2 className="title-h2">“There is a little witch in all of us.”</h2>
                    {SignBackground()}
                    <Outlet />
                </>
            }/>

 {/* create routes to the chronicle list and the new entry form here               */}
        <Route path="chronicle/create" element={ <ChronicleForm/> } />
        <Route path="chronicles" element={<ChronicleContainer />} />  
       ! <Route path="newUser" element={<NewUserForm /> } />
       <Route path="chronicles/:chronicleId/edit" element={ <ChronicleEdit /> } />
       <Route path="hearth/:signId" element={ <SignBackground /> } />
       <Route path="moonPhaseInfo" element={ <MoonPhaseImage /> } />
       <Route path="tarotInfo" element={ <TarotImage /> } />



		    
        </Routes>
    )
}