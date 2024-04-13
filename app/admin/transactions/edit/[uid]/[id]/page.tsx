"use client"
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { db } from "@/db/firebaseConfig";
import Toast from "@/utils/Alert";
import AdminNavbar from "@/app/components/admin/AdminNavbar";
import AdminSidebar from "@/app/components/admin/AdminSidebar";
import Layout from "@/app/components/global/Layout";
import AdminHero from "@/app/components/admin/AdminHero";
import FooterAdmin from "@/app/components/user/FooterUser";
import Button from "@/app/components/global/web-default/Buttons";
import DefaultIcon from "@/app/components/global/DefaultIcon";
import { useParams } from "next/navigation";
import Input from "@/app/components/global/web-default/Input";
import Flex from "@/app/components/global/web-default/Flex";
import Select from "@/app/components/global/web-default/Select";

function Index() {
  const { uid, id } = useParams()


  const formik = useFormik({
    initialValues: {
      amount: "",
      remarks: "",
      firstname: "",
      status: "",
    },

    validationSchema: Yup.object({
      firstname: Yup.string().trim().required("Field required").lowercase(),
      amount: Yup.string().lowercase().trim().required("Field required"),
      remarks: Yup.string().lowercase().trim().required("Field required"),
      status: Yup.string()
        .oneOf(["pending", "success", "failed", "processing"])
        .required("Field required"),
    }),

    onSubmit: (values) => handleUpdate(values),
  });

  const handleUpdate = async (val: any) => {
    formik.setSubmitting(true);
    try {
      await updateDoc(doc(db, `transactions/${uid}/transactionDatas/${id}`), {
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
    const setInfo = async () => {
      try{
      const docs = await getDoc(doc(db, `transactions/${uid}/transactionDatas/${id}`))
       const transInfo = docs.data()
         
          formik.setValues({
            amount: transInfo?.amount,
            remarks: transInfo?.remarks,
            firstname: transInfo?.firstname,
            status: transInfo?.status,
          } as any);
        }catch(error){
          console.log(error);
        }
        
      }
    setInfo();
  }, [id, uid]);
  return (
    <>
      <AdminNavbar />

      <div className="flex gap-8">
        <AdminSidebar />

        <div className="w-full mb-10 lg:mb-0 ">
          <div className="min-h-screen">
          <Layout>
            <AdminHero title="Transactions" />
            <div className=" mt-10 " />
            <section className="bg-sec-bg px-4 py-8 rounded-lg">
              <div className="container">
                <div className="row">
                  <div className="col">
                    <div className="login-box edit">
                      <div className="form-group ">
                        <form className="space-y-4" onSubmit={formik.handleSubmit}>
                          <Flex className="*:!w-full">
                            
                            <div className="input-group">
                            <h4 className="text-main-color mb-2">Firstname </h4>
                              <Input
                                type="text"
                                {...formik.getFieldProps("firstname")}
                                error={formik.touched.firstname &&
                                  formik.errors.firstname}
                               
                              />
                            </div>
                          
                          
                            
                            <div className="input-group">
                            <h4 className="text-main-color mb-2">Amount </h4>
                              <Input
                                type="text"
                                {...formik.getFieldProps("amount")}
                                error={formik.touched.amount &&
                                  formik.errors.amount }
                               
                              />
                            </div>
                            
                          </Flex>
                          <div className="col-6">
                            <h4 className="text-main-color mb-2">Remarks </h4>
                            <div className="input-group">
                              <Input
                                type="text"
                                {...formik.getFieldProps("remarks")}
                                
                                error={formik.touched.remarks &&
                                  formik.errors.remarks}
                              />
                            </div>
                            
                          </div>
                          <div className="col-6">
                            <h4 className="text-main-color mb-2">Status </h4>
                            <div className="input-group">
                              <Select
                                value={formik.values.status}
                                onChange={(e) => formik.setFieldValue("status", e.target.value)}
                                error={formik.touched.status &&
                                  formik.errors.status}
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
        </div>

      </div>
        <FooterAdmin />
    </>
  );
}

export default Index;

Index.defaultProps ={
  needsAuth: true,
  isAdmin: true

}
