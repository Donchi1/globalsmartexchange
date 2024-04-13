"use client"
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
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
import Button from "@/app/components/global/web-default/Buttons";
import DefaultIcon from "@/app/components/global/DefaultIcon";
import Flex from "@/app/components/global/web-default/Flex";
import Select from "@/app/components/global/web-default/Select";

function page() {
  const { id, uid } = useParams();

  const formik = useFormik({
    initialValues: {
      email: "",
      paymentAmount: "",
      status: "",
      dailyIncrement: "",
      firstname: "",
      lastname: "",
      method: "",

    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .trim()
        .required("Field required")
        .lowercase(),
      currency: Yup.string().lowercase().trim().required("Field required"),
      lastname: Yup.string().lowercase().trim().required("Field required"),
      firstname: Yup.string().lowercase().trim().required("Field required"),
      method: Yup.string().lowercase().trim().required("Field required"),
      paymentAmount: Yup.string().lowercase().trim().required("Field required"),
      dailyIncrement: Yup.string().lowercase().trim().required("Field required"),
      status: Yup.string()
        .oneOf(["pending", "processing", "success", "failed"])
        .required("Field required"),
    }),

    onSubmit: (values) => handleUpdate(values),
  });

  const handleUpdate = async (val: any) => {
    formik.setSubmitting(true);
    try {
      await updateDoc(doc(db, `payments/${uid}/paymentDatas/${id}`), { ...val });
      formik.setSubmitting(false);
      Toast.success.fire({ text: "Update Successful" });
    } catch (error: any) {
      formik.setSubmitting(false);
      Toast.error.fire({ text: error.message });
    }
  };
  useEffect(() => {
    const setInfo = () => {
      getDoc(doc(db, `payments/${uid}/paymentDatas/${id}`))
        .then((doc) => {
          const paymentInfo = doc.data();
          console.log(paymentInfo)
          formik.setValues({
            firstname: paymentInfo?.firstname,
            lastname: paymentInfo?.lastname,
            email: paymentInfo?.email,
            paymentAmount: paymentInfo?.paymentAmount,
            dailyIncrement: paymentInfo?.dailyIncrement,
            method: paymentInfo?.menthod,
            status: paymentInfo?.status
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
      <AdminNavbar />

      <div className="flex gap-8">
        <AdminSidebar />

        <div className="w-full">
          <div className="min-h-screen mb-10 lg:mb-0">
            <Layout>
              <AdminHero title="Payments" />
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
                            <Flex className="*:w-full ">
                              <div className="input-group">
                                <h4 className="text-main-color mb-2">Method</h4>
                                <Input
                                  type="text"
                                  {...formik.getFieldProps("method")}
                                  error={formik.touched.method &&
                                    formik.errors.method}

                                  readOnly
                                />
                              </div>




                              <div className="input-group">
                                <h4 className="text-main-color mb-2">Amount </h4>
                                <Input
                                  type="text"
                                  {...formik.getFieldProps("paymentAmount")}
                                  error={formik.touched.paymentAmount &&
                                    formik.errors.paymentAmount}

                                />
                              </div>

                            </Flex>
                            <Flex className="*:w-full">

                              <div className="input-group">
                                <h4 className="text-main-color mb-2">DailyIncrement </h4>
                                <Input
                                  type="text"
                                  {...formik.getFieldProps("dailyIncrement")}
                                  error={formik.touched.dailyIncrement &&
                                    formik.errors.dailyIncrement}

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
                            <Flex className="*:w-full">

                              <div className="input-group">
                                <h4 className="text-main-color mb-2">FirstName</h4>
                                <Input
                                  type="text"
                                  readOnly
                                  {...formik.getFieldProps("firstname")}
                                  error={formik.touched.firstname &&
                                    formik.errors.firstname}

                                />
                              </div>



                              <div className="input-group">
                                <h4 className="text-main-color mb-2">Lastname </h4>
                                <Input
                                  type="text"
                                  {...formik.getFieldProps("lastname")}
                                  error={formik.touched.lastname &&
                                    formik.errors.lastname}

                                  readOnly
                                />
                              </div>

                            </Flex>

                            <div className="col-6">
                              <h4 className="text-main-color mb-2">Email </h4>
                              <div className="input-group">


                                <Input
                                  type="text"
                                  {...formik.getFieldProps("email")}
                                  error={formik.touched.email &&
                                    formik.errors.email}

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


