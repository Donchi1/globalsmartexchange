

"use client"
import { useRouter } from "next/navigation";
import { DocumentData } from "firebase/firestore";
import formatCurrency from "@/utils/converter";

interface trafficCardType {
  profile: DocumentData | null;
  payments: DocumentData[] | null;
  investments: DocumentData[] | null;
  initial: number;
  total: number;
  interest: number;

}

export default function TrafficCard({
  profile,
  payments,
  initial,
  total,
  interest,
  investments
}: trafficCardType) {

  const {push} = useRouter();
  return (
    <section className="bg-sec-bg rounded-lg px-4 pb-2">
      
        <div className="w-full flex items-center pt-2 justify-between">
          <h2 className="text-white text-2xl">Account Info</h2>
          <button
            className="bg-transparent text-main-color"
            style={{ padding: 0 }}
            onClick={() => push("/user/profile")}
          >
            See More
          </button>
        </div>
      
      <div>
        <div className="overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
           
            <tbody>
              <tr>
                <th className="border-b text-white border-gray-200 align-middle font-light text-sm whitespace-nowrap  py-4 text-left">
                  Deposits
                </th>
                <td className="border-b text-white border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                {formatCurrency(Number(profile?.allDeposits) || 0)}
                </td>
                <td className="border-b  border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                  
                </td>
              </tr>
              <tr>
                <th className="border-b text-white border-gray-200 align-middle font-light text-sm whitespace-nowrap  py-4 text-left">
                 Payments
                </th>
                <td className="border-b text-white border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
               {payments?.length}
                </td>
                <td className="border-b  border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                  
                </td>
              </tr>
              <tr>
                <th className="border-b text-white border-gray-200 align-middle font-light text-sm whitespace-nowrap  py-4 text-left">
                  Investments
                </th>
                <td className="border-b text-white border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                  {investments?.length}
                </td>
                <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                  
                </td>
              </tr>
              <tr>
                <th className="border-b text-white border-gray-200 align-middle font-light text-sm whitespace-nowrap py-4 text-left">
                  Interest
                </th>
                <td className="border-b text-white border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                {formatCurrency(Number(profile?.allInterests || 0))}
                </td>
                <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                  
                </td>
              </tr>
              <tr>
                <th className=" text-white  align-middle font-light text-sm whitespace-nowrap py-4 text-left">
                  Total Earned
                </th>
                <td className=" text-white  align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                
                { formatCurrency(Number(profile?.totalBalance) + Number(profile?.allInterests) ||
                    0)}
                </td>
               
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

