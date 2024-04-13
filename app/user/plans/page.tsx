"use client"
import React, { useEffect } from "react";
import AdminNavbar from "@/app/components/user/UserNavbar";
import Sidebar from "@/app/components/user/Sidebar";
import Layout from "@/app/components/global/Layout";
import UserHero from "@/app/components/user/UserHero";
import FooterUser from "@/app/components/user/FooterUser";
import SinglePlan from "@/app/components/global/web-default/SinglePlan";
import Modal from "@/app/components/global/Modal";
import { useAppStore } from "@/app/store/appStore";
import Input from "@/app/components/global/web-default/Input";
import { useFormik } from "formik";
import * as Yup from "yup"
import Select from "@/app/components/global/web-default/Select";
import Button from "@/app/components/global/web-default/Buttons";
import DefaultIcon from "@/app/components/global/DefaultIcon";
import {  useAuthStore } from "@/app/store/authStore";
import Toast from "@/utils/Alert";
import { DocumentData } from "firebase/firestore";

export default function page() {
  const { modal, handleModal, investAmount } = useAppStore()
  const { currentUser } = useAuthStore() as DocumentData



  const formik = useFormik({

    initialValues: {
      amount: null,
      account: ""

    },
    validationSchema: Yup.object({
      amount: Yup.string().required(),
      account: Yup.string().oneOf(["mainBalance", "interestBalance"]).required()
    }),
    onSubmit: (values) => handleInvest(values)

  })


  useEffect(() => {
    formik.setFieldValue("amount", investAmount)
  }, [investAmount])



  const { getFieldProps, errors, touched, setSubmitting, isSubmitting, setFieldValue, handleSubmit, values } = formik

  const handleInvest = ({ account, amount }: { [key: string]: any }) => {
    setSubmitting(false)
    if (currentUser[account] === "0000") return Toast.error.fire({ text: "No balance for investment" })
    if (Number(currentUser[account]) < 100) return Toast.error.fire({ text: "Low balance for investment" })
    if (Number(amount) < 100) return Toast.error.fire({ text: "Amount must be greater than 99 dollars" })
    setSubmitting(true)
    Toast.success.fire({ text: "Am success full" }).then(() => {
      setSubmitting(true)
    })

  }
  return (
    <>
      <AdminNavbar />
      <div className="flex ">
        <Sidebar />
        <Layout>
          <UserHero title="Plans" />
          <section className="footer-bg homepage-3 mb-8">
            <section className="">
              <div className="col-md-12">
                <div className="grid grid-rows-subgrid gap-8 lg:grid-cols-3 grid-cols-1">
                  <SinglePlan price="$200 - $3000" total="3000" title="Basic" />
                  <SinglePlan price="$500 -$5999" total="5999" title="Bronze" />
                  <SinglePlan price="$1000 -$15000" total="$15000" title="Gold" />
                </div>
                <div className="mt-8">
                  <div className="grid grid-rows-subgrid gap-8 lg:grid-cols-3 grid-cols-1">
                    <SinglePlan price="$3000 - $11000" total="11000" title="Advanced" />
                    <SinglePlan price="$6000 -$18555" total="18555" title="Special" />
                    <SinglePlan price="$10000 -$30000" total="30000" title="Professional" />
                  </div>
                </div>

              </div>
            </section>
          </section>
        </Layout>
      </div>
      <FooterUser />
      <Modal classes={{ headerClassName: { titleClassName: "!text-[20px] !uppercase" } }} onClose={() => handleModal(false)} open={modal} title="investment">
        <form className="space-y-4 py-4" onSubmit={handleSubmit}>
          <Input type="number" placeholder="Enter Amount" {...getFieldProps("amount")} error={touched.amount && errors.amount} />
          <Select value={values.account} onChange={(e) => setFieldValue("account", e.target.value)} error={touched.account && errors.account}>
          <option value="">Choose Account</option>
            <option value="mainBalance">MainBalance</option>
            <option value="interestBalance">Interest Balance</option>
          </Select>
          <Button type="submit" title="Proceed" className="!w-full gradient-btn" icon={<DefaultIcon isSubmitting={isSubmitting} />} />
        </form>

      </Modal>
    </>
  );
}
