import { addDoc,collection,getDocs } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "../FirebaseConfig";
import { Link } from "react-router-dom";
import "./PersonAdd.css"

function PersonAdd(){
  const usersCollectionRef = collection(db,"users");
  const groupCollectionRef = collection(db,"groups");
  const[groups,setGroups] = useState([])
  const [newUser,SetNewUser] = useState(
        {
          name : "",
          surname: "",
          phone: 0,
          address: "",
          company: "",
          group: ""
        }
       );
    
    const createUser= async()=>{
        try{
              await addDoc(usersCollectionRef, {
          name:newUser.name,
          surname:newUser.surname,
          phone:newUser.phone,
          address:newUser.address,
          company:newUser.company,
          group:newUser.group
        })
        alert("Kullanıcı Başarıyla Eklenmiştir");    
        }
        catch(error){
          alert("Kullanıcı Eklenirken bir data oluştu");
        }
    }
    useEffect(() => {
      const getGroups = async () => {
      const data = await getDocs(groupCollectionRef);
    
      setGroups(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      getGroups();  
      console.log(groups);
      }, []);

    return (
        <div className="add-container">
          <h2>Yeni Kullanici Ekle</h2>
          <div className="input-areas">

              <div className="input-container">
               <input 
               type="text"
               id="name"
               placeholder="Isim..." 
               onChange={(event) => {SetNewUser({...newUser,name:event.target.value})}}
               />
              </div>

              <div className="input-container">
              <input 
               type="text" 
               id="surname"
               placeholder="Soyisim..." 
               onChange={(event) => {SetNewUser({...newUser,surname:event.target.value})}}
               /> 
              </div>

              <div className="input-container">
              <input 
               type="number" 
               id="number"
               placeholder="Telefon..." 
               onChange={(event) => {SetNewUser({...newUser,phone:event.target.value})}}
               />
              </div>

              <div className="input-container">
              <input 
               type="text"
               id="address" 
               placeholder="Adres..." 
               onChange={(event) => {SetNewUser({...newUser,address:event.target.value})}}
               />
              </div>

              <div className="input-container">
              <input 
               type="text" 
               id="company"
               placeholder="Şirket..." 
               onChange={(event) => {SetNewUser({...newUser,company:event.target.value})}}
               />
              </div>   

              <div className="input-container">
              <select name="group" id="groups" onChange={(event) => SetNewUser({...newUser,group:event.target.value})} className="costum-select">
              <option selected> Grup Seçiniz</option>
               {groups.map((group)=>{
                return(
                  <>
                  <option value={group.GroupName} key={group.GroupName} >{group.name}</option>                  
                  </>

                )
               })}
              </select>
              </div>              
          </div>                                                             
              <Link onClick={createUser} className="save-btn" to="/"> Yeni Kullanıcı Oluştur  </Link>
        </div>
      )
}
export default PersonAdd;