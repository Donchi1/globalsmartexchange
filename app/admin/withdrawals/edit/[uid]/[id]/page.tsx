"use client"
import { doc,  getDoc, updateDoc } from "firebase/firestore";
import { useFormik } from "formik";
import React, { useEffect} from "react";
import * as Yup from "yup";
import { db } from "@/db/firebaseConfig";
import Toast from "@/utils/Alert";
import AdminNavbar from "@/app/components/admin/AdminNavbar";
import AdminSidebar from "@/app/components/admin/AdminSidebar";
import Layout from "@/app/components/global/Layout";
import AdminHero from "@/app/components/admin/AdminHero";
import FooterAdmin from "@/app/components/user/FooterUser";
import { useParams } from "next/navigation";
import Input from "@/app/components/global/web-default/Input";
import Select from "@/app/components/global/web-default/Select";
import Button from "@/app/components/global/web-default/Buttons";
import DefaultIcon from "@/app/components/global/DefaultIcon";
import Flex from "@/app/components/global/web-default/Flex";

function page() {
  const { id, uid } = useParams();

  const formik = useFormik({
    initialValues: {
      email: "",
      amount: "",
      charge: "",
      status: "",
      accountNumber: "",
      wallet: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .trim()
        .required("Field required")
        .lowercase(),
      amount: Yup.string().lowercase().trim().required("Field required"),
      charge: Yup.string().lowercase().trim().required("Field required"),
      wallet: Yup.string().lowercase().trim().optional(),
      accountNumber: Yup.string().lowercase().trim().optional(),
      status: Yup.string()
        .oneOf(["pending","processing", "success", "failed"])
        .required("Field required"),
    }),

    onSubmit: (values) => handleUpdate(values),
  });

  const handleUpdate = async (val: any) => {
    formik.setSubmitting(true);
    try {
      await updateDoc(doc(db, `withdrawals/${uid}/withdrawalDatas/${id}`), { ...val });
      formik.setSubmitting(false);
      Toast.success.fire({ text: "Update Successful" });
    } catch (error: any) {
      formik.setSubmitting(false);
      Toast.error.fire({ text: error.message });
    }
  };
  useEffect(() => {
    const setInfo = () => {
      getDoc(doc(db, `withdrawals/${uid}/withdrawalDatas/${id}`))
        .then((doc) => {
          const withdrawalInfo = doc.data();
          formik.setValues({
            amount: withdrawalInfo?.withdrawalAmount,
            charge: withdrawalInfo?.charge,
            status: "pending",
            accountNumber: withdrawalInfo?.accountNumber,
            wallet: withdrawalInfo?.wallet,
            email: withdrawalInfo?.email,
          } as any);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    setInfo();
  }, [id, uid]);

console.log(formik.values)

  return (
    <>
    <AdminNavbar />

    <div className="flex gap-8">
      <AdminSidebar />

      <div className="w-full ">
        <div className="min-h-screen mb-10 lg:mb-0">

        
        <Layout>
          <AdminHero title="Withdrawals" />
          <div className=" mt-10 " />

          <section className="bg-sec-bg py-8 px-6 rounded-lg">
                  <div className="container">
                    <div className="row">
                      <div className="col">
                        <div className="login-box edit">
                          <div className="form-group ">
                            <form
                              className="space-y-4"
                              onSubmit={formik.handleSubmit}
                            >
                              <Flex className="*:!w-full">
                                
                                <div className="input-group">
                                <h4 className="text-main-color mb-2">Email </h4>
                                  <Input
                                    type="email"
                                    {...formik.getFieldProps("email")}
                                    error={formik.touched.email &&
                                      formik.errors.email}
                                  />
                                </div>
                              
                             
                                
                                <div className="input-group">
                                <h4 className="text-main-color mb-2">Amount </h4>
                                  <Input
                                    type="text"
                                    {...formik.getFieldProps("amount")}
                                     error={formik.touched.amount &&
                                      formik.errors.amount}
                                   
                                  />
                                </div>
                               
                              </Flex>
                              <Flex className="*:!w-full">
                               
                                <div className="input-group">
                                <h4 className="text-main-color mb-2">Charge </h4>
                                  <Input
                                    type="text"
                                    {...formik.getFieldProps("charge")}
                                     error={formik.touched.charge &&
                                      formik.errors.charge }
                                    
                                  />
                                </div>
                                
                                
                           
                                
                                <div className="input-group">
                                <h4 className="text-main-color mb-2">Wallet </h4>
                                  <Input
                                    type="text"
                                    {...formik.getFieldProps("wallet")}
                                     error={formik.touched.wallet &&
                                      formik.errors.wallet}
                                    
                                  />
                                </div>
                               
                              </Flex>
                              <div className="col-12 col-lg-6 mb-1">
                                <h4 className="text-main-color mb-2">Account No </h4>
                                <div className="input-group">
                                  <Input
                                    type="text"
                                    {...formik.getFieldProps("accountNumber")}
                                     
                                    error={formik.touched.accountNumber &&
                                      formik.errors.accountNumber}
                                  />
                                </div>
                               
                              </div>
                              <div className="col-12 col-lg-6 mb-1">
                                <h4 className="text-main-color mb-2">Status </h4>
                                <div className="input-group">
                                  <Select
                                     error={formik.touched.status &&
                                      formik.errors.status}
                                      value={formik.values.status}
                                    onChange={(e) => formik.setFieldValue("status", e.target.value)}
                                  >
                                    <option
                                      value={"pending"}
                                      className="bg-dark text-white"
                                    >
                                      Pending
                                    </option>
                                    <option
                                    value={"processing"}
                                    className="bg-dark text-white"
                                  >
                                    Processing
                                  </option>
                                    <option
                                      value={"success"}
                                      className="bg-dark text-white"
                                    >
                                      Success
                                    </option>
                                    <option
                                      value={"failed"}
                                      className="bg-dark text-white"
                                    >
                                      Failed
                                    </option>
                                  </Select>
                                </div>
                               
                              </div>
                              <div className="mx-auto">

                              <Button className='!w-full !flex justify-center items-start gap-3 bg-main-color !text-center !py-3' type="submit" disabled={formik.isSubmitting} title="Update" icon={<DefaultIcon isSubmitting={formik.isSubmitting} />} />
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </Layout>
            </div>
          </div >
          </div >
            <FooterAdmin />
      
    </>
  );
}

export default page;

