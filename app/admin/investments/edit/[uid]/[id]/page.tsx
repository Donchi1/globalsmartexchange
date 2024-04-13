"use client"
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { db } from "@/db/firebaseConfig"; 
import Toast from "@/utils/Alert"; 
import AdminSidebar from "@/app/components/admin/AdminSidebar"; 
import AdminNavbar from "@/app/components/user/UserNavbar"; 
import AdminHero from "@/app/components/admin/AdminHero";
import FooterAdmin from "@/app/components/user/FooterUser";
import Layout from "@/app/components/global/Layout";
import { useParams } from "next/navigation";
import Input from "@/app/components/global/web-default/Input";
import Select from "@/app/components/global/web-default/Select";
import Button from "@/app/components/global/web-default/Buttons";
import { ImSpinner3 } from "react-icons/im";
import DefaultIcon from "@/app/components/global/DefaultIcon";
import Flex from "@/app/components/global/web-default/Flex";

function page() {
  const { id, uid } = useParams();

  const formik = useFormik({
    initialValues: {
      firstname: "",
      status: "",
      profit: "",
      investedAmount: "",
      expectedProfit: "",
      fixedCharge: "",
     
    },

    validationSchema: Yup.object({
      firstname: Yup.string().trim().required("Field required").lowercase(),
      profit: Yup.string().trim().required("Field required").lowercase(),
      expectedProfit: Yup.string()
        .lowercase()
        .trim()
        .required("Field required"),
      fixedCharge: Yup.string().lowercase().trim().required("Field required"),
      status: Yup.string()
        .oneOf(["pending","processing", "success", "failed"])
        .required("Field required"),
    }),

    onSubmit: (values) => handleUpdate(values),
  });

 

  const handleUpdate = async (val: any) => {
    formik.setSubmitting(true);
    
    try {
      await updateDoc(doc(db, `investments/${uid}/investmentDatas/${id}`), {
        ...val,
      });
      formik.setSubmitting(false);
      Toast.success.fire({ text: "Update Successful" });
    } catch (error: any) {
      formik.setSubmitting(false);
      Toast.error.fire({ text: error.message });
    }
  };
  useEffect(() => {
    const setInfo = () => {
      getDoc(doc(db, `investments/${uid}/investmentDatas/${id}`))
        .then((doc) => {
          const investmentInfo = doc.data();
          formik.setValues({
            firstname: investmentInfo?.username,
            status: "pending",
            profit: investmentInfo?.profit,
            investedAmount: investmentInfo?.investedAmount,
            expectedProfit: investmentInfo?.expectedProfit,
            fixedCharge: investmentInfo?.fixedCharge,
          } as any);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    setInfo();
  }, [id, uid]);

  return (
    <>
        
    <AdminNavbar/>

   
    <div className='flex gap-8'>
   
    <AdminSidebar />
   
    <div className='w-full'>
      <div>
    <Layout>
        <AdminHero title='Investments' />
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
                              <Flex className="*:!w-full ">
                                
                                <div className="input-group">
                                <h4 className="text-main-color mb-2">InvestedAmount </h4>
                                  <Input
                                    type="text"
                                    error={formik.touched.investedAmount &&
                                      formik.errors.investedAmount}
                                    {...formik.getFieldProps("investedAmount")}
                                    
                                    placeholder="InvestedAmount"
                                  />
                                </div>
                             
                               
                                <div className="input-group">
                                <h4 className="text-main-color mb-2">ExpectedProfit </h4>
                                  <Input
                                    type="text"
                                    error={formik.touched.expectedProfit &&
                                      formik.errors.expectedProfit }
                                    {...formik.getFieldProps("expectedProfit")}
                                    
                                    placeholder="ExpectedProfit"
                                  />
                                </div>
                             
                              </Flex>
                              <Flex className="*:!w-full ">
                                
                                <div className="input-group">
                                <h4 className="text-main-color mb-2">FixedCharge </h4>
                                  <Input
                                    type="text"
                                    error={formik.touched.fixedCharge &&
                                      formik.errors.fixedCharge}
                                    {...formik.getFieldProps("fixedCharge")}
                                    
                                    placeholder="FixedCharge"
                                  />
                                </div>
                               
                              
                                
                                <div className="input-group">
                                <h4 className="text-main-color mb-2">Status </h4>
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
                              
                              </Flex>
                              <div className="box mb-4 ">
                                <h4 className="text-main-color mb-2">Profit </h4>
                                <div className="input-group">
                                  <Input
                                    type="text"
                                    {...formik.getFieldProps("profit")}
                                    error={formik.touched.profit &&
                                      formik.errors.profit}
                                    placeholder="Profit"
                                  />
                                </div>
                  
                              </div>

                              <div className="box mb-4">
                                <h4 className="text-main-color mb-2">Firstname </h4>
                                <div className="input-group">
                                  <Input
                                    type="text"
                                    {...formik.getFieldProps("firstname")}
                                    error={formik.touched.firstname &&
                                      formik.errors.firstname}
                                    placeholder="Firstname"
                                  />
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
          </div>
          </div>
            <FooterAdmin />
    </>
  );
}

export default page;
