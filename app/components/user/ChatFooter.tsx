import React, {useState} from 'react'
import Image from "next/image";
import * as Icons from "react-icons/md";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '@/db/firebaseDb';
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import useGetDocWithClause from '../hooks/UseGetDocWithClause';
import { useSelector } from 'react-redux';
import {RootState} from "@/redux/store"


function ChatFooter({scrollRef}: {scrollRef: React.RefObject<HTMLDivElement>}) {
  
  const {currentUser} = useSelector((state: RootState) =>  state.auth)
  const [admin] = useGetDocWithClause({colls:"users",q:{path:"isAdmin", condition:"==", value:true}})
  

    const combinedId:string = `${admin[0]?.uid}${auth.currentUser?.uid}`

  const [message, setMessage] = useState("")
  const [file, setFile] = useState<Blob | null>(null)

  const handleSend = async() => {
     if(!message) return 
     try{
       await addDoc(collection(db, `chats/${combinedId}/messages`), {
        senderId: auth.currentUser?.uid,
        isAdmin: false,
        text: message,
        date:serverTimestamp(),
        senderPhoto:currentUser?.photo,
        img: ""
       })
       scrollRef.current?.scrollIntoView({behavior: "smooth"})
       await setDoc(doc(db, `userChats/${auth.currentUser?.uid}`), {
         lastMessage: message,
         date:serverTimestamp(),
         senderPhoto:currentUser?.photo,
         firstname: currentUser?.firstname,
         lastname: currentUser?.lastname,
         uid: currentUser?.uid
       })
       setMessage("")
     }catch(err: any){
       console.log(err)
     }
  }

  const sendPhoto = async() => {
    if(!file) return
    const uuid = Math.random() + Date.now()
    try{

    const fileRef = ref(storage, `messages/${uuid.toString()}`)
     await uploadBytes(fileRef, file as Blob)
     const url = await getDownloadURL(fileRef)
     closeModal()
     await addDoc(collection(db, `chats/${combinedId}/messages`), {
      senderId: auth.currentUser?.uid,
      isAdmin: false,
      text: "",
      date:serverTimestamp(),
      senderPhoto:currentUser?.photo,
      img: url
     })
     scrollRef.current?.scrollIntoView({behavior: "smooth"})
     
    }catch(err: any){
      console.log(err)
    }
  }

  const openModal = () => {
    const el = document.getElementById("photoModal") as HTMLElement
    if(el){
      el.style.display = "block";
      el.classList.add("show");
  };
}
  //close modal
  const closeModal = () => { 
    setFile(null)
    const el = document.getElementById("photoModal") as HTMLElement
    if(el){
   el.style.display = "none";
   el.classList.remove("show");
   el.classList.add("hide");
  };

}



  return (
    <>
    <div className='modal fade' data-bs-keyboard="false" data-bs-backdrop="static" id="photoModal" >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content main-bg rounded-lg shadow-lg">
          <div className="modal-header">
            <button onClick={closeModal} className="btn-close">
            
            </button>
          </div>
          <div className="modal-body ">
           {file && <Image src={file && URL.createObjectURL(file) as string || ""} height={500} width={500} alt="photo" />}
          </div>
          <div className="modal-footer">
            <button onClick={sendPhoto} >
            <Icons.MdSend size={35} />
            </button>
          </div>
        </div>
      </div>

    </div>
    <div className="chat-footer w-full h-20 flex justify-center items-center">
    <div className="shadow-lg  rounded-xl flex justify-between mx-auto items-center chat-footer-container">
     
      <div className="w-full items-center">

      <textarea
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        rows={1}
        placeholder="Type your message here"
        className="overflow-hidden block py-3 text-message resize-none  text-black w-full border-none  outline-none bg-transparent"
      ></textarea>
      </div>
      <label className="mx-2" >
        <Icons.MdUpload size={35} className="text-gray-200" />
        <input hidden type="file" onChange={(e) => {
          setFile(e.target.files && e.target.files[0])
          openModal()
        }} />
      </label>

      <button className="mx-2 ml-2 " onClick={handleSend}>
        <Icons.MdSend  size={35} className="text-red-500" />
      </button>
    </div>
  </div>
  </>
  )
}

export default ChatFooter