import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../FirebaseConfig";
import { collection } from 'firebase/firestore';
import './SearchBySurname.css'

function SearchBySurname(){

    const usersCollectionRef = collection(db, "users");
    const [allusers, setAllUsers] = useState([]);
    const [searchUsers, setSearchUsers] = useState([]);
    const [input,setInput]=useState([]);
  
  useEffect(()=>{
    const getUsers = async ()=>{
        const data = await getDocs(usersCollectionRef);
        setAllUsers(data.docs.map((doc)=>({...doc.data(), id:doc.id}))); 
        console.log(allusers);
    };
    getUsers();
  },[]);

  function Search(){
    const filtredUsers= allusers.filter((user)=>user.surname.toLowerCase().includes(input.toLowerCase()));
    setSearchUsers(filtredUsers)
  }

  useEffect(()=>{
    Search()
  },[input])

  return(
    <div>
      <div className="input-box">
      <h1 className= "input-box-label"> Soyisim ile Arama </h1>
      <input
      type="text"
      onChange={(event) => { setInput(event.target.value) }}
      placeholder="Soyisim"
      />
      <button onClick={Search}>Ara </button>
    </div>
    {
        searchUsers.length === 0 ? 
        <p className="no-users-message">{input} soyadında kayıtlı kullanıcı yoktur </p> 
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
export default SearchBySurname;