import { EnchantersChronicle } from "./components/EnchantersChronicle"
import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter } from "react-router-dom"

//roots the rendering of the application itself and calls on that module

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <EnchantersChronicle />
    </BrowserRouter>
)
