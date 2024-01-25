import {useEffect, useState} from "react"
import {db} from '../FirebaseConfig'
import {doc , getDocs,collection,addDoc,deleteDoc} from 'firebase/firestore';
import './Groups.css'


function Groups(){
    const groupCollectionRef = collection(db,"groups");
    const [allGroups,setAllGroups] = useState([]);
    const [newGroupName,setNewGroupName] = useState("");

    const createGroup=async()=>{
        try{
            await addDoc(groupCollectionRef,{
                name:newGroupName
            })
            alert("Grup başarılı şekilde eklenmiştir. Lütfen sayfayı yenileyiniz")
        }
        catch(error){
            alert("Grup eklenirken bir hata oluştu lütfen daha sonra tekrar deneyiniz.")
        }
    }

    const deleteGroup=async(id)=>{
        try{
            const userDoc = doc(db,"groups",id);
            await deleteDoc(userDoc);
            alert("Grup başarıyla silinmiştir. Lütfen sayfayı yenileyiniz")
        }
        catch(error){
            alert("Kullanıcı silinirken bir hata oluştu.Tekrar deneyiniz")
        }
    }

    useEffect(()=>{
        const getGroups = async()=>{
            const data = await getDocs(groupCollectionRef)
            setAllGroups (data.docs.map((doc)=>({...doc.data(), id:doc.id})))
        }
        getGroups();
    },[])



    return(
        <div className="group-container" >
            <div className="group-list">
                <h1>Gruplar </h1>
            <ol class="list-group list-group-numbered">
                {allGroups.map((group)=>{
                    return(
                        <div>
                        <li class="list-group-item">{group.name} <button className="deletebtn" onClick={()=>deleteGroup(group.id)}>Sil</button></li>                           
                        </div>
                    )
                })}
            </ol>
            </div>

            <div className="group-add">
                <h1>Grup Ekle</h1>
                <input 
                type="text"
                placeholder="Grup Adı"
                onChange={(event)=>{setNewGroupName(event.target.value)}}
                />
                <button onClick={createGroup} className="savebtn">Grubu Ekle</button>
            
            </div>
            
        </div>
    )
}
export default Groups;