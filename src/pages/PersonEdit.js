import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {doc , getDoc,setDoc,collection,getDocs} from 'firebase/firestore';
import { db } from "../FirebaseConfig";


function PersonEdit(){
    const {id} = useParams();
    const[groups,setGroups] = useState([]);
    const groupCollectionRef = collection(db,"groups");

    const [user,setUser] = useState(
        {
            name : "",
            surname:"",
            phone:0,
            address:"",
            company:"",
            group:""
        }
    )

    const updateUser = async ()=>{
        try{
          await setDoc(doc(db,"users",id),{
            name:user.name,
            surname:user.surname,
            phone:user.phone,
            address:user.address,
            company:user.company,
            group:user.group
          })
          alert("Kullanıcı başarılı bir şekilde güncellenmiştir. Lütfen Anasayfaya dönünüz");
        }
        catch(error){
         alert("Bir hata oldu")
        }
       }

    useEffect(()=>{
        const getUser = async ()=>{
            const userDoc = doc(db,"users",id);
            const userDocSnapshot = await getDoc(userDoc)
            setUser(userDocSnapshot.data());
        }
        getUser();
    },[id])

    useEffect(() => {
      const getGroups = async () => {
      const data = await getDocs(groupCollectionRef);
    
      setGroups(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      getGroups();  
      console.log(groups);
      }, []);

    return(
        <>
        <div className="add-container">
         <h2> Kullanici Guncelle</h2>
         <div className="input-areas">
             <input 
              type="text"
              placeholder="Isim..." 
              value={user.name}
              onChange={(event) => {setUser({...user,name:event.target.value})}}
              />
            
             <input 
              type="text" 
              placeholder="Soyisim..." 
              value={user.surname}
              onChange={(event) => {setUser({...user,surname:event.target.value})}}
              />
                                                                     
             <input 
              type="number" 
              placeholder="Telefon..." 
              value={user.phone}
              onChange={(event) => {setUser({...user,phone:event.target.value})}}
              />
                                                                     
             <input 
              type="text" 
              placeholder="Adres..." 
              value={user.address}
              onChange={(event) => {setUser({...user,address:event.target.value})}}
              />
                                                                     
             <input 
              type="text" 
              placeholder="Şirket..." 
              value={user.company}
              onChange={(event) => {setUser({...user,company:event.target.value})}}
              />

             <select name="group" id="group" value={user.group} onChange={(event)=>setUser({...user,group:event.target.value})}>
              {groups.map((group)=>{
                return(
                  <option value={group.name} key={group.id}>{group.name}</option>
                )
              })}
             </select>

         </div>                                                             
             <button onClick={updateUser} className="save-btn">Kaydet </button>
       </div>
        </>
        
    )
}
export default PersonEdit;