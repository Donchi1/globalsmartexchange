
import { deleteDoc, doc } from "firebase/firestore"
import { deleteObject, ref } from "firebase/storage"
import { db, storage } from "../db/firebaseDb"
import Toast from "./Alert"

const handleDelete = async (docRef: string,{profile, url}:{profile?: boolean, url?: string} ) => {
    try {
        await deleteDoc(doc(db, docRef))
        if(profile){
            await deleteObject(ref(storage, url))
        }
        Toast.success.fire({
          text: "Document successfully Deleted"
        })   
      } catch (error: any) {
        Toast.error.fire({
          text: error.message
        })
        
        
      }
  }

  export default handleDelete