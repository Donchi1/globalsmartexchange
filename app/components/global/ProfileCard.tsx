
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Toast from '@/utils/Alert'
import { doc, DocumentData, getDoc, updateDoc } from 'firebase/firestore'
import { auth, db, storage } from "@/db/firebaseConfig"
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import * as Yup from "yup"
import { useFormik } from 'formik'
import Card from './web-default/Card'
import Modal from './Modal'
import Button from './web-default/Buttons'
import { ImSpinner3 } from 'react-icons/im'
import Input from './web-default/Input'
import Flex from './web-default/Flex'
import Select from './web-default/Select'
import DefaultIcon from './DefaultIcon'


export default function ProfileCard({ user, action, id }: { id?: string | undefined | string[], user: DocumentData | null | undefined, action?: Boolean }) {



  const [file, setFile] = useState<Blob | File | null>(null);
  const [fileLoading, setFileLoading] = useState(false);
  const [openUser, setOpenUser] = useState(false)

  const updatePhoto = async () => {
    if (file === null) return Toast.error.fire({ text: "Photo cannot be empty" })
    setFileLoading(true)
    const storageRef = ref(storage, `users/${action ? id : auth.currentUser?.uid}`);
    try {

      await uploadBytes(storageRef, file as Blob | Uint8Array | ArrayBuffer);
      const url = await getDownloadURL(storageRef);

      await updateDoc(doc(db, "users", action ? id as string : auth.currentUser?.uid || ""), {
        photo: url,
      });
      Toast.success.fire({ text: "Photo successfully updated" });
      setFileLoading(false)
      setFile(null)
    } catch (err: any) {
      Toast.error.fire({ text: err });
      setFileLoading(false)
      setFile(null)
    }
  }
  const formikAction = useFormik({
    initialValues: {
      initialDeposit: "",
      mainBalance: "",
      interestBalance: "",
      disableWithdrawal: true,
      profit: "",
      accessCode: "",
      // verified: false,
      // verificationCode: ""
    },

    validationSchema: Yup.object({
      initialDeposit: Yup.string().required("Field required"),
      mainBalance: Yup.string().required("Field required"),
      interestBalance: Yup.string().required("Field required"),
      disableWithdrawal: Yup.bool().oneOf([true, false]).required("Field required"),
      accessCode: Yup.string(),
      profit: Yup.string(),
      // verified:Yup.bool().oneOf([true, false]).required("Field required"),
      // verificationCode: Yup.string()

    }),

    onSubmit: (values) => handleSubmitActionUpdate(values),
  });

  const handleSubmitActionUpdate = async (val: any) => {
    formikAction.setSubmitting(true)
    try {
      await updateDoc(doc(db, `users/${id}`), { ...val, disableWithdrawal: val.disableWithdrawal === "true" ? true : false })
      formikAction.setSubmitting(false)
      Toast.success.fire({ text: "Update Successful" })
    } catch (error: any) {
      formikAction.setSubmitting(false)
      Toast.error.fire({ text: error.message })
    }
  }

  useEffect(() => {
    const setInfo = () => {
      getDoc(doc(db, `users/${id as string}`))
        .then((doc) => {
          const userInfo = doc.data();
          formikAction.setValues({
            initialDeposit: userInfo?.initialDeposit || userInfo?.initialDeposite,
            accessCode: userInfo?.accessCode,
            disableWithdrawal: userInfo?.disableWithdrawal,
            profit: userInfo?.profit,
            interestBalance: userInfo?.interestBalance || userInfo?.bonus,
            mainBalance: userInfo?.mainBalance,
            // verified: userInfo?.verified,
            // verificationCode: userInfo?.verificationCode

          })

        })
        .catch((error: any) => {
          console.log(error);
        });
    };
    setInfo();
  }, [id]);

  return (
    <>

      <Modal
        open={openUser}
        className=""
        title='Details'
        onClose={() => setOpenUser(false)}
        classes={{ headerClassName: { titleClassName: "!text-[20px]" } }}


      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content main-bg">
            <form onSubmit={formikAction.handleSubmit}>
              <div className="modal-body">
                <div className="payment-form ">
                  <div className="form-group mb-30 mt-3">
                    <div className="space-y-3">


                      <Flex className='*:!w-full'>
                        <div className="">
                          <h5 className="mb-2 text-main-color ">InitialDeposit</h5>
                          <Input
                            type="text"
                            error={formikAction.touched.initialDeposit &&
                              formikAction.errors.initialDeposit}

                            {...formikAction.getFieldProps("initialDeposit")}
                          />
                        </div>
                        <div className="">
                          <h5 className="mb-2 text-main-color ">Main Balance</h5>
                          <Input
                            error={formikAction.touched.mainBalance &&
                              formikAction.errors.mainBalance}

                            {...formikAction.getFieldProps("mainBalance")}
                          />
                        </div>
                      </Flex>


                      <Flex className='*:w-full'>


                        <div className="">
                          <h5 className="mb-2 text-main-color ">InterestBalance</h5>

                          <Input
                            type="text"
                            error={formikAction.touched.interestBalance &&
                              formikAction.errors.interestBalance}
                            {...formikAction.getFieldProps(
                              "interestBalance"
                            )}
                          />
                        </div>
                        <div className="">
                          <h5 className="mb-2 text-main-color ">
                            Disable withdrawal
                          </h5>
                          <Select
                            error={formikAction.touched.disableWithdrawal &&
                              formikAction.errors.disableWithdrawal}
                            value={formikAction.values.disableWithdrawal ? true as any : false as any}
                            onChange={(e) => formikAction.setFieldValue("disableWithdrawal", e.target.value)}
                          >
                            <option
                              value={true as any}
                              className="bg-dark text-white"
                            >
                              Yes
                            </option>
                            <option
                              value={false as any}
                              className="bg-dark text-white"
                            >
                              No
                            </option>
                          </Select>

                        </div>
                      </Flex>

                      <div className="">
                        <h5 className="text-main-color mb-2">
                          Profit
                        </h5>
                        <div className="input-group">
                          <Input
                            type="text"
                            error={formikAction.touched.profit &&
                              formikAction.errors.profit}
                            {...formikAction.getFieldProps(
                              "profit"
                            )}
                          />
                        </div>
                      </div>
                      <div className="">
                        <h5 className="text-main-color mb-2">AccessCode</h5>
                        <div className="input-group">
                          <Input
                            type="text"
                            error={formikAction.touched.accessCode &&
                              formikAction.errors.accessCode}
                            {...formikAction.getFieldProps("accessCode")}
                          />
                        </div>

                      </div>
                      {/* <div className="row"> */}

                      {/* <div className=" col-6">
                                <h5 className="golden-text">VerificationCode</h5>
                                <div className="input-group">
                                  <Input
                                    type="text"
                                    
                                    {...formikAction.getFieldProps("verificationCode")}
                                  />
                                </div>
                                <div className="text-danger errors mt-1">
                                  {formikAction.touched.verificationCode &&
                                    formikAction.errors.verificationCode &&
                                    formikAction.errors.verificationCode}
                                </div>
                              </div> */}
                      {/* <div className="mt-2 box col-6">
                              <h5 className="mb-2 text-main-color d-block modal_text_level">
                                Verified
                              </h5>
                              <select
                                
                                {...formikAction.getFieldProps("verified")}
                              >
                                <option
                                  value={true as any}
                                  className="bg-dark text-white"
                                >
                                  Yes
                                </option>
                                <option
                                  value={false as any}
                                  className="bg-dark text-white"
                                >
                                 No
                                </option>
                              </select>
                              <div className="text-danger errors mt-1">
                                  {formikAction.touched.verified &&
                                  formikAction.errors.verified &&
                                  formikAction.errors.verified}
                              </div>
                            </div> */}
                      {/* </div> */}
                      <Button className='!w-full hover:!bg-gradient-to-tl !bg-gradient-to-tr !from-main-color !to-sec-bg' disabled={formikAction.isSubmitting} type='submit' title='Update User' icon={<DefaultIcon isSubmitting={formikAction.isSubmitting} />} />

                    </div>



                  </div>
                </div>


              </div>
            </form>
          </div>
        </div>
      </Modal>
      <Card className="!translate-y-0 !w-full">
        <div className="flex flex-wrap justify-center text-white">
          <label htmlFor='profile' className="hover:cursor-pointer ">
            <Image width={500} className="rounded-lg" height={400} src={file ? URL.createObjectURL(file as Blob) : user?.photo} alt="profile" />
            <input
              hidden={true}
              className="w-full rounded-lg font-medium bg-transparent border border-[#304ffe] text-white text-sm focus:outline-none focus:bg-opacity-10  mt-2"
              type="file"
              color="purple"
              name="img"
              id="profile"
              onChange={(e) => setFile(e.target.files && e.target.files[0])}
            />
          </label>

          <div className="w-full flex justify-between  items-center py-4 lg:pt-4 pt-8">
            <div className="basis-[30%] ">
              <span className="text-xl font-medium block uppercase tracking-wide text-white">
                ${user?.mainBalance}
              </span>
              <span className="text-sm text-main-color ">Main Balance</span>
            </div>
            <div className="basis-[30%] ">
              <span className="text-xl font-medium block uppercase tracking-wide text-white">
                ${user?.initialDeposit}
              </span>
              <span className="text-sm text-main-color ">Initial Deposite</span>
            </div>
            <div className="basis-[30%] ">
              <span className="text-xl font-medium block uppercase tracking-wide text-white">
                ${user?.interestBalance}
              </span>
              <span className="text-sm text-main-color ">Interest Balance</span>
            </div>
          </div>
        </div>
        <div className="">
          <div className='flex justify-between  items-center'>

            <h5 className="text-gray-400 font-bold text-lg">
              {' '}
              {user?.firstname} {user?.lastname}
            </h5>

            <div className="capitalize text-white  ">
              {/* <Icon name="work" size="xl" /> */}
              {user?.occupation}
            </div>
          </div>
          <div className=" text-white mt-3 ">
            Joined At{" "}
            {new Date(user?.date?.toDate()).toDateString()}
          </div>
        </div>

        <div className="mb-8 mt-2 border-t text-center px-2 border-gray-700">

        </div>

        <div>
          <div className="w-full flex justify-center mt-3 gap-2">
            <Button className='!w-full hover:!bg-gradient-to-tl !bg-gradient-to-tr !from-main-color !to-sec-bg' type='button' onClick={updatePhoto} title='Update Photo' icon={<DefaultIcon isSubmitting={fileLoading} />} />
            {action &&
              <Button className='gradient-btn !bg-red-500' type='button' title='Action' onClick={() => setOpenUser(true)} >
              </Button>
            }
          </div>
        </div>
      </Card>
    </>
  )
}
