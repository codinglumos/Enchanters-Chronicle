import { Route, Routes } from "react-router-dom"
import { Authorized } from "./views/Authorized"
import { UserViews } from "./views/ApplicationViews"
import { UserNavBar} from "./nav/UsersNav"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import "./EnchantersChronicle.css"


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
