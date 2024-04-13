
"use client"
import { DocumentData } from 'firebase/firestore'

import Card from '../global/web-default/Card'
import { Table, TableCols} from '../global/Table'

export default function TableCard({ data, cols }: { data: DocumentData[] | null, cols:TableCols[] }) {
  return (
    <Card className="bg-sec-bg !pb-1 !w-full !translate-y-0 text-white min-h-[80vh] !mb-8" >
     <Table cols={cols} rows={data as DocumentData[]} includeFooter   />
    </Card>
  )
}
