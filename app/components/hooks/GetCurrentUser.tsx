"use client"
import  { useEffect, useState } from "react";
import { auth, db } from "@/db/firebaseConfig";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";


export const useGetCurrentUser = () => {
  const [user, setUser] = useState<DocumentData | null | undefined>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
     
      if (authUser) {
        
        getDoc(doc(db, "users", authUser.uid)).then((fireUser ) => {
             setUser(fireUser?.data());
             setLoading(false);
           }).catch(err =>{
             console.log(err)
             setLoading(false);
           })
        
      } else {
        setLoading(false);
        setError("No user found. Please Reauthenticate!!");
      }
    });
  }, []);

  return [user, loading, error] as const;
};
