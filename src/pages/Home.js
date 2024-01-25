import { useEffect, useState } from "react";
import { db } from "../FirebaseConfig"
import { collection, deleteDoc, getDocs, doc} from 'firebase/firestore'
import { Link } from "react-router-dom";

function Home(){
    const [users,setUsers] = useState([]);
    const usersCollectionref = collection(db,"users")

    useEffect(()=>{
        const getUsers = async ()=>{
            const data = await getDocs(usersCollectionref);
            setUsers(data.docs.map((doc)=>({...doc.data(), id: doc.id})))
        };
        getUsers();
    },[])

    const deleteUser = async (id)=>{
      try{
        const userDoc = doc(db,"users",id) 
        await deleteDoc(userDoc);
        alert("Kullanıcı başarılı bir şekilde silinmiştir. Lütfen sayfanızı yenileyiniz.")
      }
      catch(error){
        alert("Kullanıcı silinirken bir hata oluştu. Lütfen sayfayı yenileyip tekrar deneyiniz")
      }
    }
    return(
        <>
        <table className="table table-striped">
         <thead>
           <tr>
             <th scope="col">Isim</th>
             <th scope="col">Soyisim</th>
             <th scope="col">Telefon Numarası</th>
             <th scope="col">Adres</th>
             <th scope="col">Şirket</th>
             <th scope="col">Grup</th>
             <th scope="col">İşlemler</th>
          </tr>
         </thead>
         <tbody>
         {users.map((user)=>{
            return(
              <tr>
               <td>{user.name}</td>
               <td>{user.surname}</td>
               <td>{user.phone}</td>
               <td>{user.address}</td>
               <td>{user.company}</td>
               <td>{user.group}</td>
               <td>
                 <Link className="btn btn-primary" to={`/PersonEdit/${user.id}`} >Düzenle</Link>
                 <button className="btn btn-danger" onClick={()=>deleteUser(user.id)}>Sil</button>
               </td>
              </tr>
            )
         })}
          </tbody>
        </table>
        </>
    )
}
export default Home;