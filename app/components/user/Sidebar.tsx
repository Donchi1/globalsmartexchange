"use client"
import Link from "next/link";
import * as Icons from "react-icons/md";
import Toast from "@/utils/Alert";
import { usePathname } from "next/navigation";
import { auth, db } from "@/db/firebaseConfig";
import { useFormik } from "formik";
import * as Yup from "yup";
// import TopSidebar from "@/components/TopSidebar"
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import createNotification from "@/utils/createNotification";
import { useState } from "react";
import { makeRequestApi } from "@/utils/makeRequest";
import useGetDocument from "../hooks/UseDocument";
import TopSidebar from "../global/TopSidebar";
import { useAppStore } from "@/app/store/appStore";
import Modal from "../global/Modal";
import Input from "../global/web-default/Input";
import Select from "../global/web-default/Select";
import DefaultIcon from "../global/DefaultIcon";
import Button from "../global/web-default/Buttons";
import Flex from "../global/web-default/Flex";
import { destroyCookie } from "@/utils/createCookie";

type investType = {
  amount: string | number;
  account: string;

};
type transType = {
  amount: string | number;
  account: string;
  firstname: string,
  email: string,
  password: string
  remark: string
};


export default function Sidebar() {
  const [currentUser] = useGetDocument("users", auth.currentUser?.uid as string || "yfuykh", {snap: true})
  const [showSidebar, setShowSidebar] = useState(false)
  const pathname  = usePathname();
  const {accessCodeInfo,handleAccessCode,setOpenSidebar, openSidebar} = useAppStore()
  const [openModal, setOpenModal] = useState({
    transfer: false,
    invest: false
  })


  const formik = useFormik({
    initialValues: {
      amount: "",
      account: "",
    } as investType,

    validationSchema: Yup.object({
      amount: Yup.number().required("Amount required"),
      account: Yup.string().required("Account required"),

    }),

    onSubmit: (values) => handleInvest(values),
  });

  const formikTrans = useFormik({
    initialValues: {
      amount: "",
      account: "",
      email: "",
      remark: "",
      password: ""
    } as transType,

    validationSchema: Yup.object({
      amount: Yup.number().required("Amount required"),
      account: Yup.string().required("Account required"),
      email: Yup.string().email().trim().required("Receiver email required"),
      password: Yup.string().required("Account required"),
      remark: Yup.string().required("Remark required"),
    }),

    onSubmit: (values) => handleTransfer(values),
  });

  const handleTransfer = async (values: transType) => {

    if (values.account === "mainBalance" && currentUser?.mainBalance === "0000")
      return Toast.error.fire({
        text: "Low or No balance for Transfer (Main)",
      });
    if (
      values.account === "interestBalance" &&
      currentUser?.interestBalance === "0000"
    )
      return Toast.error.fire({
        text: "Low or No balance for Transfer (Interest)",
      });
    if (
      values.account === "interestBalance" &&
      Number(currentUser?.interestBalance) < 10
    )
      return Toast.error.fire({
        text: "Sorry you can't transfer less than 10 dollars (Interest)",
      });
    if (
      values.account === "mainBalance" &&
      Number(currentUser?.mainBalance) < 10
    )
      return Toast.error.fire({
        text: "Sorry you can't transfer less than 10 dollars (Main)",
      });

    const deductedMain =
      values.account === "mainBalance"
        ? Number(currentUser?.mainBalance) - Number(values?.amount)
        : currentUser?.mainBalance;
    const deductedInterest =
      values.account === "interestBalance"
        ? Number(currentUser?.interestBalance) - Number(values?.amount)
        : currentUser?.interestBalance;
    formikTrans.setSubmitting(true);
    try {
      const user = await getDocs(query(collection(db, `users`), where("email", "==", values.email)))
      if (user.empty) {
        formikTrans.setSubmitting(false);
        return Toast.error.fire({ text: "User not found! Please check the email." })
      }
      if(currentUser?.password !== values.password){
        formikTrans.setSubmitting(false);
        return Toast.error.fire({ text: "Incorrect password." })
      }
      const mainBalanceInfo: number | string = values.account === "mainBalance" ? Number(user.docs[0].data().mainBalance) + Number(values.amount) : user.docs[0].data().mainBalance
      const interestBalanceInfo: number | string = values.account === "interestBalance" ? Number(user.docs[0].data().interestBalance) + Number(values.amount) : user.docs[0].data().interestBalance

      await updateDoc(doc(db, `users/${user.docs[0].id}`), {
        mainBalance: mainBalanceInfo.toString(),
        interestBalance: interestBalanceInfo.toString()
      });
      await updateDoc(doc(db, `users/${currentUser?.uid}`), {
        mainBalance: deductedMain.toString(),
        interestBalance: deductedInterest.toString(),
      });


      await addDoc(
        collection(db, `transactions/${currentUser?.uid}/transactionDatas`),
        {
          slNo: Math.ceil(Math.random() + new Date().getSeconds()),
          uid: currentUser?.uid,
          amount: values?.amount,
          type: "Transfer",
          remarks: `You have successfully transfered ${values?.amount}`,
          date: serverTimestamp(),
          firstname: currentUser?.firstname,
          photo: currentUser?.photo,
          status: "success",
          accessCodeProve: "",
          filterDate: new Date().toLocaleDateString(),
        }
      );
      const nData = {
        title: "Transfer",
        text: `You have transfered $${values?.amount} to ${values.firstname}`
      }
      const rData = {
        title: "Received",
        text: `You have received $${values?.amount} from ${currentUser?.firstname}`
      }
      await createNotification(nData)
      await createNotification(rData, user.docs[0].id)
      formikTrans.setSubmitting(false);
      formikTrans.resetForm();
      Toast.success.fire({
        text: `You transfer of $${values?.amount} to ${values.email} was successful`,
      }).then(() => {
        makeRequestApi.post("/transfer", { sender: currentUser, receiver: values })
      }).catch((err: any) => {
        Toast.error.fire({
          text: "An error occured while sending you an email"
        })
      })
    } catch (err: any) {
      formikTrans.setSubmitting(false);
      formikTrans.resetForm();
      Toast.error.fire({ text: err });
    }
  }

  const handleInvest = async (values: investType) => {

    if (values.account === "mainBalance" && currentUser?.mainBalance === "0000")

      return Toast.error.fire({
        text: "Low or No balance for Investment (Main)",
      });
    if (
      values.account === "interestBalance" &&
      currentUser?.interestBalance === "0000"
    )
      return Toast.error.fire({
        text: "Low or No balance for Investment (Interest)",
      });
    if (
      values.account === "interestBalance" &&
      Number(currentUser?.interestBalance) < 100
    )
      return Toast.error.fire({
        text: "Sorry you can't invest less than 100 dollars (Interest)",
      });
    if (
      values.account === "mainBalance" &&
      Number(currentUser?.mainBalance) < 100
    )
      return Toast.error.fire({
        text: "Sorry you can't invest less than 100 dollars (Main)",
      });

    const deductedMain =
      values.account === "mainBalance"
        ? Number(currentUser?.mainBalance) - Number(values?.amount)
        : currentUser?.mainBalance;
    const deductedInterest =
      values.account === "interestBalance"
        ? Number(currentUser?.interestBalance) - Number(values?.amount)
        : currentUser?.interestBalance;

    formik.setSubmitting(true);
    try {
      await updateDoc(doc(db, `users/${currentUser?.uid}`), {
        mainBalance: deductedMain.toString(),
        interestBalance: deductedInterest.toString(),
      });

      await addDoc(
        collection(
          db,
          `investments/${auth.currentUser?.uid as string}/investmentDatas`
        ),
        {
          startDate: serverTimestamp(),
          date: serverTimestamp(),
          filterDate: new Date().toLocaleDateString(),
          profit: 0,
          progress: 0,
          investedAmount: values.amount,
          expectedProfit: Number(values?.amount) * 12,
          username: currentUser?.firstname || "guest",
          photo: currentUser?.photo,
          status: "pending",
          fixedCharge: "5",
          uid: auth.currentUser?.uid,
          idx: "wt".concat(Date.now().toString()),
        }
      );
      await addDoc(
        collection(db, `transactions/${currentUser?.uid}/transactionDatas`),
        {
          slNo: Math.ceil(Math.random() + new Date().getSeconds()),
          uid: currentUser?.uid,
          amount: values?.amount,
          type: "Investment",
          remarks: `You have successfully invested $${values?.amount}`,
          date: serverTimestamp(),
          firstname: currentUser?.firstname,
          photo: currentUser?.photo,
          status: "success",
          accessCodeProve: "",
          filterDate: new Date().toLocaleDateString(),
        }
      );
      const nData = {
        title: "Investment Started",
        text: `You have Successfully invested ${values?.amount} dollars`
      }
      await createNotification(nData)
      formik.setSubmitting(false);
      formik.resetForm();
      Toast.success.fire({
        text: `Your investment of $${values?.amount} was successful`,
      }).then(() => {
        makeRequestApi.post("/investment", { user: currentUser, investment: values })
      }).catch((err: any) => {
        Toast.error.fire({
          text: "An error occured while sending you an email"
        })
      })
    } catch (err: any) {
      formik.setSubmitting(false);
      formik.resetForm();
      Toast.error.fire({ text: err });
    }
  };

  const withdrawalCheck = () => {
    if (pathname === "/user/withdrawals") {
      return;
    }
    if (!currentUser?.mainBalance || currentUser?.mainBalance === "0000") {
      return Toast.error.fire({
        text: "No balance for withdrawal",
      });
    }

    if (currentUser?.accessCode === "") {
      return Toast.Alert.fire({
        title: <p>Access Code Required</p>,
        html: (
          <span className="text-warning">
            Access code required to further your withdrawal
          </span>
        ),
        icon: "error",
        showCloseButton: true,

        confirmButtonText: "Check Or Get One",

      }).then((value) => {
        if (value.isConfirmed) {

          return handleAccessCode({
              isSubmitting: false,
              open: true,
            })
        }
      });
    }

    return handleAccessCode({
        isSubmitting: false,
        open: true,
      })
  };

  const handleLogout = async () => {
    await auth.signOut();
    destroyCookie("auth")
    return location.assign("/");
  };


  return (
    <>
       <Modal classes={{ headerClassName: { titleClassName: "!text-[20px] !uppercase" } }} onClose={() => setOpenModal({...openModal, invest:false})} open={openModal.invest} title="investment">
        <form className="space-y-4 py-4" onSubmit={formik.handleSubmit}>
          <Input type="number" placeholder="Enter Amount" {...formik.getFieldProps("amount")} error={formik.touched.amount && formik.errors.amount} />
          <Select className={`${formik.values.account ? "!text-white": "!text-gray-400"}`}  {...formik.getFieldProps("account")} error={formik.touched.account && formik.errors.account}>
          <option value="">Choose Account</option>
            <option value="mainBalance">MainBalance</option>
            <option value="interestBalance">Interest Balance</option>
          </Select>
          <Button type="submit" title="Proceed" className="!w-full gradient-btn" icon={<DefaultIcon isSubmitting={formik.isSubmitting} />} />
        </form>

      </Modal>
      <Modal classes={{ headerClassName: { titleClassName: "!text-[20px] !uppercase" } }} onClose={() => setOpenModal({...openModal, transfer:false})} open={openModal.transfer} title="Transfer" >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content main-bg">
            <div className="modal-body">
              <form className="mt-4 space-y-4" onSubmit={formikTrans.handleSubmit}>
                <Flex>
                
                  <Input  type="number" placeholder="Enter Amount" {...formikTrans.getFieldProps("amount")} error={formikTrans.touched.amount && formikTrans.errors.amount} />
              
                  <Select
                  className={`${formikTrans.values.account ? "!text-white": "!text-gray-400"}`}
                    {...formikTrans.getFieldProps("account")}
                    
                    error={formikTrans.touched.account && formikTrans.errors.account}
                  >
                    <option value="">Choose Account</option>
                    <option className="text-white main-bg" value="mainBalance">
                      Main Balance
                    </option>
                    <option className="text-white c-bg" value="interestBalance">
                      Interest Balance
                    </option>
                  </Select>
                </Flex>
                <div className="input-grou">
                  
                  <Input
                    type="email"
                    id="email"
                    {...formikTrans.getFieldProps("email")}
                    placeholder="Receiver Email"
                    error={formikTrans.touched.email && formikTrans.errors.email}
                  />
                </div>
               
                <div className="input-grou">
                  
                  < Input
                    type="text"
                    id="password"
                    {...formikTrans.getFieldProps("password")}
                    placeholder="Password"
                    error={formikTrans.touched.remark && formikTrans.errors.remark}
                  />
                </div>
                <div className="input-grou">
                  
                  < Input
                    type="text"
                    id="renmark"
                    {...formikTrans.getFieldProps("remark")}
                    placeholder="Remark"
                    error={formikTrans.touched.remark && formikTrans.errors.remark}
                  />
                </div>
                
                <Button type="submit" title="Proceed" className="!w-full gradient-btn" icon={<DefaultIcon isSubmitting={formikTrans.isSubmitting} />} />
              
              </form>
            </div>
          </div>
        </div>
      </Modal>
    
      <div
        className={`md:left-0 basis-[22%] z-20 static ${openSidebar ? "block": "hidden lg:block"} 
            h-screen `}
      >
        <div className="h-screen fixed w-1/2 lg:w-auto">
          <div
            className={`h-screen sidebar-scroll  flex-row flex-nowrap  bg-sec-bg  z-10 text-white   transition-all duration-300`}
          >
            <div className="flex-col items-stretch min-h-full flex-nowrap px-0 mb-12 ">

              <TopSidebar setOpenModal={setOpenModal} currentUser={currentUser} />

              <div className="flex flex-col">
                <hr className="mb-4 min-w-full text-gray-500 "  style={{color: "#6b7280", backgroundColor: "#6b7280"}} />

                <ul className="flex-col min-w-full flex list-none px-6">
                  <li
                    className={`${pathname === "/user/dashboard" &&
                      "bg-gradient-to-tr from-main-color to-sec-bg text-white shadow-md"
                      } rounded-md mb-2 from-main-color to-sec-bg hover:bg-gradient-to-tl transition-colors text-white ease-linear duration-500`}
                  >
                    <Link
                      href="/user/dashboard"
                      className="flex items-center hover:text-white gap-4 text-sm text-white font-light px-4 py-2 rounded-md"
                    >
                      <Icons.MdHome size={20} />
                      Dashboard
                    </Link>
                  </li>
                  <li
                    className={`${pathname === "/user/profile" &&
                       "bg-gradient-to-tr from-main-color to-sec-bg text-white shadow-md"
                      } rounded-md mb-2 from-main-color to-sec-bg hover:bg-gradient-to-tl transition-colors text-white ease-linear duration-500`}
                  >
                    <Link
                      href="/user/profile"
                      className="flex items-center hover:text-white gap-4 text-sm text-white font-light px-4 py-2 rounded-md"
                    >
                      <Icons.MdPerson size={20} />
                      Profile
                    </Link>
                  </li>

                  <li
                    className={`${pathname === "/user/plans" &&
                       "bg-gradient-to-tr from-main-color to-sec-bg text-white shadow-md"
                      } rounded-md mb-2 from-main-color to-sec-bg hover:bg-gradient-to-tl transition-colors text-white ease-linear duration-500`}
                  >
                    <Link
                      href="/user/plans"
                      className="flex items-center hover:text-white gap-4 text-sm text-white font-light px-4 py-2 rounded-md"
                    >
                      <Icons.MdToc size={20} />
                      Plans
                    </Link>
                  </li>
                  <li
                    className={`${pathname === "/user/investments" &&
                       "bg-gradient-to-tr from-main-color to-sec-bg text-white shadow-md"
                      } rounded-md mb-2 from-main-color to-sec-bg hover:bg-gradient-to-tl transition-colors text-white ease-linear duration-500`}
                  >
                    <Link
                      href="/user/investments"
                      className="flex items-center hover:text-white gap-4 text-sm text-white font-light px-4 py-2 rounded-md"
                    >
                      <Icons.MdOutlineSend size={20} />
                      Investments
                    </Link>
                  </li>

                  <li
                    className={`${pathname === "/user/withdrawals" &&
                       "bg-gradient-to-tr from-main-color to-sec-bg text-white shadow-md"
                      } rounded-md mb-2 from-main-color to-sec-bg hover:bg-gradient-to-tl transition-colors text-white ease-linear duration-500`}
                  >
                    <Link
                      href="/user/withdrawals"
                      className="flex items-center focus:text-white hover:text-white gap-4 text-sm text-white font-light px-4 py-2 rounded-md"
                    >
                      <Icons.MdListAlt size={20} />
                      Withdrawal
                    </Link>
                  </li>
                  <li
                    className={`${pathname === "/user/withdrawals/history" &&
                       "bg-gradient-to-tr from-main-color to-sec-bg text-white shadow-md"
                      } rounded-md mb-2 from-main-color to-sec-bg hover:bg-gradient-to-tl transition-colors text-white ease-linear duration-500`}
                  >
                    <Link
                      href="/user/withdrawals/history"
                      className="flex items-center hover:text-white gap-4 text-sm text-white font-light px-4 py-2 rounded-md"
                    >
                      <Icons.MdHistory size={20} />
                      Withdrawals History
                    </Link>
                  </li>
                  <li
                    className={`${pathname === "/user/payments" &&
                       "bg-gradient-to-tr from-main-color to-sec-bg text-white shadow-md"
                      } rounded-md mb-2 from-main-color to-sec-bg hover:bg-gradient-to-tl transition-colors text-white ease-linear duration-500`}
                  >
                    <Link
                      href="/user/payments"
                      className="flex items-center hover:text-white gap-4 text-sm text-white font-light px-4 py-2 rounded-md"
                    >
                      <Icons.MdMoney size={20} />
                      Payment
                    </Link>
                  </li>
                  <li
                    className={`${pathname === "/user/payments/history" &&
                       "bg-gradient-to-tr from-main-color to-sec-bg text-white shadow-md"
                      } rounded-md mb-2 from-main-color to-sec-bg hover:bg-gradient-to-tl transition-colors text-white ease-linear duration-500`}
                  >
                    <Link
                      href="/user/payments/history"
                      className="flex items-center hover:text-white gap-4 text-sm text-white font-light px-4 py-2 rounded-md"
                    >
                      <Icons.MdWorkHistory size={20} />
                      Payments History
                    </Link>
                  </li>

                  <li
                    className={`${pathname === "/user/chat" &&
                       "bg-gradient-to-tr from-main-color to-sec-bg text-white shadow-md"
                      } rounded-md mb-2 from-main-color to-sec-bg hover:bg-gradient-to-tl transition-colors text-white ease-linear duration-500`}
                  >
                    {/* <Link
                      href="/user/chats"
                      className="flex items-center hover:text-white gap-4 text-sm text-white font-light px-4 py-2 rounded-md"
                    >
                      <Icons.MdChat size={20} />
                      Chat
                    </Link> */}
                  </li>
                  <li
                    className="rounded-md mb-2 from-main-color to-sec-bg hover:bg-gradient-to-tl transition-colors text-white ease-linear duration-500"
                  >
                    <Link
                      className="flex items-center hover:text-white gap-4 text-sm text-white font-light px-4 py-2 rounded-md"
                      href="#"
                      onClick={handleLogout}
                    >
                      <Icons.MdLogout size={20} />
                      Logout
                    </Link>
                  </li>

                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
