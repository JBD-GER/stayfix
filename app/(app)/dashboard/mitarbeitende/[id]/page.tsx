'use client'

import { useParams } from 'next/navigation'
import EmployeeForm from '../EmployeeForm'

export default function MitarbeitendeEditPage() {
  const params = useParams<{ id: string }>()
  const id = params?.id

  if (!id) return null
  return <EmployeeForm mode="edit" employeeId={id} />
}
