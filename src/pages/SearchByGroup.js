import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../FirebaseConfig";
import { collection } from 'firebase/firestore';
import './SearchByGroup.css'

function SearchByGroup(){
    const usersCollectionRef = collection(db, "users");
    const [allusers, setAllUsers] = useState([]);
    const [searchUsers, setSearchUsers] = useState([  ]);
    const [input,setInput]=useState([]);
    const groupsCollectionRef=collection(db,"groups");
    const [allgroups, setAllGroups] = useState([]);
      
  useEffect(()=>{
    const getUsers = async ()=>{
        const data = await getDocs(usersCollectionRef);
        setAllUsers(data.docs.map((doc)=>({...doc.data(), id:doc.id}))); 
        console.log(allusers);
    };
    getUsers();
    },[]);
  useEffect(() => {
    const getGroups = async () => {
      const data = await getDocs(groupsCollectionRef);
      setAllGroups(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(allgroups);
    };
    getGroups();
    }, []);
    useEffect(()=>{
      Search()
    },[input])
  function Search() {
    const filteredUsers = allusers.filter((user) =>
      (user.group === input)
    );
    setSearchUsers(filteredUsers);
  }
  return(
    <div>
      <div className="input-box">
        <h1 className="input-box-label">Grup ile Arama</h1>
        <select name="groups" id="groups" onChange={(event) => {setInput(event.target.value)}}>
        <option selected> Grup Seçiniz</option>
        {allgroups.map((group)=>{
          return(
            <option value={group.name} key={group.name} >{group.name}</option>
          )
        })}
     </select>
     <button onClick={Search}> ARA</button>
      </div>

      {
        searchUsers.length === 0 ? 
        <p className="no-users-message">{input} grubuna kayıtlı kullanıcı yoktur </p> 
        :
        <table className="table table-striped">
         <thead>
           <tr>
             <th scope="col">Isim</th>
             <th scope="col">Soyisim</th>
             <th scope="col">Telefon Numarası</th>
             <th scope="col">Adres</th>
             <th scope="col">Şirket</th>
             <th scope="col">Grup</th>
          </tr>
         </thead>
         <tbody>
         {searchUsers.map((user)=>{
            return(
              <tr>
               <td>{user.name}</td>
               <td>{user.surname}</td>
               <td>{user.phone}</td>
               <td>{user.address}</td>
               <td>{user.company}</td>
               <td>{user.group}</td>
              </tr>
            )
         })}
          </tbody>
        </table> 
      }
    </div>
)
}
export default SearchByGroup;