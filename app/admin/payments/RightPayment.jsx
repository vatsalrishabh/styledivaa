"use client";
import AdminBreadCrumbs from '@/app/components/Admin/AdminBreadCrumbs';
import React from 'react'
import AllPayments from './AllPayments';

const RightPayment = () => {

    const breadcrumbLinks = [
        { label: "Admin", href: "/admin" },
        // { label: "Manage Orders", href: "/admin/manageorder" },
      ];

      // Sample transactions with status
  const sampleTransactions = [
    {
      invoiceId: "INV12345",
      date: "2024-03-01",
      member: "John Doe",
      product: "Premium Plan",
      amount: 4999,
      status: "Completed",
    },
    {
      invoiceId: "INV12346",
      date: "2024-03-02",
      member: "Alice Smith",
      product: "Basic Plan",
      amount: 1999,
      status: "Pending",
    },
    {
      invoiceId: "INV12347",
      date: "2024-03-03",
      member: "Michael Johnson",
      product: "Enterprise Plan",
      amount: 9999,
      status: "Unsuccessful",
    },
    {
      invoiceId: "INV12348",
      date: "2024-03-04",
      member: "Emily Brown",
      product: "Standard Plan",
      amount: 3999,
      status: "Completed",
    },
    {
      invoiceId: "INV12349",
      date: "2024-03-05",
      member: "David Wilson",
      product: "Custom Plan",
      amount: 7999,
      status: "Pending",
    },
  ];

  return (
    <div className='lg:w-[83%] w-full absolute right-0 h-[100vh] bg-slate-200 p-6'>
        <div className="p-4">
      <AdminBreadCrumbs links={breadcrumbLinks} name="Payments" />
      </div>

      <AllPayments allTransactions={sampleTransactions} />
      
    </div>
  )
}

export default RightPayment
