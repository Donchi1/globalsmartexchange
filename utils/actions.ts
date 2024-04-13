
import { auth, db, storage } from "@/db/firebaseConfig";
import { User} from "firebase/auth";
import { addDoc, collection, doc, query, getDocs, serverTimestamp, setDoc, where, getDoc, DocumentData } from "firebase/firestore";
import createNotification from "./createNotification";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Toast from "./Alert";
import { makeRequestApi } from "./makeRequest";



export const saveToFirestore = async (userData:User,formData?:any, url?: string) => {
   
       await setDoc(doc(db, "users", userData.uid), {
           ...formData,
           city: "",
           aboutMe: "",
           postalCode: "",
           gender: "",
           status: "Active",
           accessCode: "",
           accessCodeProve: "",
           isAdmin: false,
           profit: "",
           address: "",
           uid: userData.uid,
           date: serverTimestamp(),
           mainBalance: "0000",
           initialDeposit: "0000",
           interestBalance: "20",
           verified: false,
           verificationCode: "",
           disableWithdrawal: true,
         });
     
  
          await addDoc(
            collection(
              db,
              `transactions/${userData.uid}/transactionDatas`
            ),
            {
              slNo: Math.ceil(Math.random() + new Date().getSeconds()),
              uid: userData.uid,
              amount: "$20",
              type: "Interest Added",
              remarks: `You have successfully received $20 interest`,
              date: serverTimestamp(),
              lastname: formData.lastname,
              photo: url,
              status: "success",
              accessCodeProve: "",
              filterDate: new Date().toLocaleDateString(),
            }
          );
  
          const noteData = {
            title: "Welcome",
            text: "Welcome to Global Smart Exchange",
          };
          await createNotification(noteData);
        
}

export const makePayment = async (currentUser:DocumentData | null | undefined, values:{[key:string]:any} ) => {
  const date = new Date().getTime().toString();
    const storageRef = ref(storage, `proves/${auth.currentUser?.uid + date}`);
    try{

      await uploadBytes(storageRef, values.prove as Blob);
      const url = await getDownloadURL(storageRef);

      await addDoc(collection(db,`payments/${auth.currentUser?.uid}/paymentDatas`),{
      paymentAmount: values.amount,
      date: serverTimestamp(),
      method: values.method,
      firstname: currentUser?.firstname,
      lastname: currentUser?.lastname,
      uid: auth.currentUser?.uid,
      prove: url,
      email: currentUser?.email,
      idx: Math.random().toString(),
      status: "pending",
      dailyIncrement: 0.5
      })
      Toast.success.fire({
        text: "Your funding prove has been sent successfully. We will get back to you soon",
      }).then(() => {
        makeRequestApi.post("/payments", currentUser)
       }).catch((err:any) => {
        Toast.error.fire({
          text:"An error occured while sending you an email"
         })
       })
    }catch{
      Toast.error.fire({
        text: "Something went wrong. Please try again",
      });
    }
}


export const getUser = async (uid: string) => (await getDoc(doc(db, `user/${uid}`))).data()



