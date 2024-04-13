import { TableCols } from "@/app/components/global/Table";
import moment from "moment";
import handleStatus from "./handleStatus";
import Image from "next/image";

export const columns: TableCols[] = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
    renderCell: (params) => (
      <span>{params.row.id?.slice(0, 10)}</span>
    )
  },
  {
    field: "method",
    headerName: "Method",
    width: 100,

  },
  {
    field: "withdrawalAmount",
    headerName: "Amount",
    width: 100,
  },
  {
    field: "accountNumber",
    headerName: "Account No",
    width: 100,
    renderCell: (params) => (
      <span>{params.row.accountNumber}</span>
    ),
  },
  {
    field: "date",
    headerName: "Date",
    renderCell: (params) => (
      <span>{moment(params.row.date.toDate()).format('lll')}</span>
    ),
    width: 130,
  },
  {
    field: "status",
    headerName: "Status",
    width: 100,
    renderCell: (params) => <span>{handleStatus(params.row?.status)}</span>
  }
];



export const transColumns: TableCols[] = [
  {
    field: "id",
    headerName: "ID",
  },
  {
    field: "firstname",
    headerName: "User",
    width: 100,

  },
  {
    field: "type",
    headerName: "type",
    width: 100,
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 100,

  },

  {
    field: "remarks",
    headerName: "Remarks",
    width: 100,
  },
  {
    field: "prove",
    headerName: "Prove",
    renderCell: (params) => (
      <Image
        src={params.row.prove}
        height={14}
        width={40}
        className="h-14 w-14 rounded-full"
        alt="prove"
      />
    ),
    width: 130,
  },

  {
    field: "date",
    headerName: "Date",
    renderCell: (params) => (
      <span>{moment(params.row.date.toDate()).format('lll')}</span>
    ),
    width: 130,
  },
  {
    field: "status",
    headerName: "Status",
    width: 100,
    renderCell: (params) => <span>{handleStatus(params.row?.status)}</span>
  }
];
