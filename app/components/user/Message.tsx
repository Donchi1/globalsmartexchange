
import { auth } from "@/db/firebaseDb";
import { DocumentData } from "firebase/firestore";
import moment from "moment";
import Image from "next/image";
import React from "react";

function Message({ message}: { message: DocumentData}) {


  return (
    <div className="chat-container mx-auto ">
      <div className={`flex py-2 w-full ${message.senderId !== auth.currentUser?.uid && "justify-content-end"}`}>
        <div
          className={`row message-wrapper justify-content-end    ${
            message.senderId !== auth.currentUser?.uid &&
            "  flex-col-reverse  "
          }`}
        >
          {/* <div className="w-24 hidden lg:block">
            <Image width={18} height={18}
              className="w-12  mx-auto h-12 object-cover rounded-full"
              src={message.senderPhoto}
              alt="photo"
            />
            <p className="text-muted text-center text-xs">{moment(message.date?.toDate()).format('lll')}</p>
          </div> */}
          <div className=" ms"  >
            <p
              className={`text-gray-900 max-w-max   px-2  py-2 ${
                message.senderId === auth.currentUser?.uid
                  ? "owner bg-teal-200"
                  : "message-text"
              }`}
            >
              
              {message.text !== "" && message.text}
            </p>
            {message.img && (
              <Image width={500} height={500} className="mt-2 rounded-lg" src={message.img} alt="photo" />
            )}

            <p className="text-muted  ">{moment(message.date?.toDate()).format('lll')}</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Message;
