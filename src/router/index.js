import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import Groups from "../pages/Groups"
import PersonAdd from "../pages/PersonAdd"
import PersonEdit from "../pages/PersonEdit"
import SearchByName from "../pages/SearchByName"
import SearchBySurname from "../pages/SearchBySurname"
import SearchByGroup from "../pages/SearchByGroup"


function Router(){
    return(
        <div>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/groups' element={<Groups/>}/>
                <Route path='/personAdd' element={<PersonAdd/>}/>
                <Route path='/personEdit/:id' element={<PersonEdit/>}/>
                <Route path='/searchByName' element={<SearchByName/>}/>
                <Route path='/searchBySurName' element={<SearchBySurname/>}/>
                <Route path='/searchByGroup' element={<SearchByGroup/>}/>
            </Routes>
        </div>
    )

}
export default Router;