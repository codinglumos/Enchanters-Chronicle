import { Route, Routes } from "react-router-dom"
import { Authorized } from "./views/Authorized"
import { UserViews } from "./views/ApplicationViews"
import { UserNavBar} from "./nav/UsersNav"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import "./EnchantersChronicle.css"
//This is the app page. It initalizes with routes to login or create an account
//Then it routes to the NavBar and UserView modules if you are authorized


export const EnchantersChronicle = () => {
	return <Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register />} />

		<Route path="*" element={
			<Authorized>
				<>
					<UserNavBar />
					<UserViews />
				</>
			</Authorized>

		} />
	</Routes>
}
