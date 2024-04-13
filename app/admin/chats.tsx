import React, { useState, useEffect, useRef } from "react";
import AdminNavbar from "@/components/user/UserNavbar";
import AdminSidebar from "@/components/admin/AdminSidebar";

import FooterAdmin from "@/components/admin/FooterAdmin";
import Image from "next/image";

import Message from "@/components/user/Message";
import AdminChatFooter from "@/components/admin/AdminChatFooter";

import { auth, db } from "@/db/firebaseDb";
import useGetDocWithClause from "@/components/hooks/UseGetDocWithClause";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import * as Icons from "react-icons/hi2"
import { collection, DocumentData, onSnapshot, orderBy, query } from "firebase/firestore";
import UsersChat, { ChatDataType } from "@/components/admin/UsersChat";
import useCollection from "@/components/hooks/UseCollection";

function Chat() {

   const scrollRef = useRef<HTMLDivElement>(null)
   const [chatUserId, setChatUserId] = useState("")
    const [admin] = useGetDocWithClause({colls:"users", q:{path:"isAdmin", condition:"==",value: true}})

    const combinedId:string = admin[0]?.uid + chatUserId

    const [messages, setMessages] = useState<DocumentData[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [openUsers, setOpenUsers] = useState<boolean>(false)
    

    const {currentUser } =  useSelector((state: RootState) => state.auth)
    const [userChats] = useCollection("userChats")

    useEffect(() => {
   
      const unsubscribe = onSnapshot(
        query(collection(db, `chats/${combinedId}/messages`), orderBy("date")),
        (qsnap) => {
          const colData = qsnap.docs.map((each) => ({ ...each.data(), id: each.id }))
          setMessages(
            colData
          );
          setLoading(false);
          scrollRef.current && scrollRef.current.scrollIntoView({behavior: "smooth"})
        },
        (err) => {
          setError(err.message);
          setLoading(false);
        }
      );
      return unsubscribe;
    }, [combinedId]);
   
      
  return (
    <>
     

      <div className="flex ">
        
        <div className='w-full min-h-screen '>
        <div className=" footer-bg  homepage-3 h-screen fixed top-0 right-0 left-0 bottom-0 ">
          <div
            className="flex chart-card flex-col h-screen main-bg rounded-lg  "
            
          >
            <div className=" h-20  main-bg shadow-lg text-white">
              <div className=" mx-auto flex h-full chat-container justify-between items-center">
                <p>Admin</p>

                <div className="flex gap-4 items-center">
                  <Image
                    height={500}
                    width={500}
                    className="rounded-full object-cover w-12 h-12"
                    src={currentUser?.photo || "/assets/img/adviser2.jpeg"}
                    alt="logo"
                  />
                  <span className="capitalize">{currentUser?.firstname}</span>
                  <button className="block lg:hidden" onClick={() => setOpenUsers(prev => !prev)}>
                  <Icons.HiBars3 size={30} color="white" />
                </button>
                </div>
              </div>
            </div>
            <div className="row justify-center w-full ml-1 ml-lg-0 relative lg:static "  style={{height: "90%"}}>
              
             <div  className={`col-3 ${openUsers ? "block w-96": "hidden lg:block"} sidebar-scroll  users-chat-wrapper   left-0 z-10 lg:z-0 absolute lg:static  overflow-y-auto  main-bg shadow-lg text-white`}>
              <div className="flex flex-col gap-2 pt-3 ">
                {userChats.length > 0 && userChats.map((each ) => (
                  <UsersChat key={each.id} chat={each as ChatDataType } setOpenUsers={setOpenUsers} setChatUserId={setChatUserId} />

                ))}
              </div>
             </div>
             <div className="col-12 col-lg-9">

            <div className="chat-message-admin mt-2 overflow-x-hidden sidebar-scroll chat" >
            
             {messages?.length > 0 ? messages.map(each => (
                 <Message message={each} key={each.id} />

             )) : 
             <div className="flex no-message-admin justify-center  items-center text-5xl text-muted">
                <p className="text-center ">Write a message to start a chat</p>
             </div>
             }
             <div ref={scrollRef}/>
            </div>
            <AdminChatFooter scrollRef={scrollRef} userChatId={chatUserId} />
            </div>
             </div>
          </div>
        </div>
        </div>
      </div>
        
    </>
  );
}

export default Chat;

Chat.defaultProps ={
  needsAuth: true,
  isAdmin: true

}