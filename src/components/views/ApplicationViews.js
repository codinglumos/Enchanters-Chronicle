import { Outlet, Route, Routes } from "react-router-dom"
import { ChronicleList } from "../chronicles/ChronicleList"
import { ChronicleForm } from "../chronicles/ChronicleForm"



export const UserViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Echanter's Chronicle</h1>
                    <h2>“There is a little witch in all of us.”</h2>

                    <Outlet />
                </>
            }>

               
        <Route path="chronicle/create" element={ <ChronicleForm/> } />
        <Route path="chronicles" element={<ChronicleList /> } />

		    </Route>
        </Routes>
    )
}