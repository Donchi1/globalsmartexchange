import { DocumentData, Timestamp } from 'firebase/firestore'
import React from 'react'

export type ChatDataType = {
  lastMessage: string,
  date: Timestamp,
  senderPhoto: string,
  firstname: string,
  uid: string,
  lastname: string

}
type UserData = {
  setChatUserId: React.Dispatch<React.SetStateAction<string>>
  chat: ChatDataType
  setOpenUsers: React.Dispatch<React.SetStateAction<boolean>>,

}


function UsersChat({ chat, setChatUserId, setOpenUsers }: UserData) {
  return (
    <div onClick={() => {
      setChatUserId(chat?.uid)
      setOpenUsers(prev => prev ? !prev : prev)
    }} className="flex  items-center chat-users gap-2 cursor-pointer  rounded-lg py-1">
      <img className="w-16 h-16 rounded-full object-cover" src={chat.senderPhoto} alt="chats" />
      <div className="flex gap-1 flex-col ">
        <span className="text-gray-400 font-extrabold capitalize">{chat.firstname}</span>
        <span className="text-ellipsis whitespace-nowrap">{chat?.lastMessage?.slice(0, 25)}...</span>
      </div>
    </div>
  )
}

export default UsersChat