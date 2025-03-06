import React from 'react';
import AdminBreadCrumbs from '@/app/components/Admin/AdminBreadCrumbs';
import InvoiceDetails from './InvoiceDetails';


const RightManageOrder = () => {
  const breadcrumbLinks = [
    { label: "Admin", href: "/admin" },
  ];
  const invoiceData = [
    {
      invoiceId: "INV-001",
      orderDate: "2024-02-20",
      shippedDate: "2024-02-25",
      memberName: "John Doe",
      productDescription: "Wireless Headphones - Noise Cancelling",
      status: "Shipped",
    },
    {
      invoiceId: "INV-002",
      orderDate: "2024-02-18",
      shippedDate: "2024-02-22",
      memberName: "Alice Johnson",
      productDescription: "Smartphone - 128GB, Midnight Black",
      status: "Delivered",
    },
    {
      invoiceId: "INV-003",
      orderDate: "2024-02-21",
      shippedDate: "2024-02-26",
      memberName: "Michael Smith",
      productDescription: "Gaming Laptop - RTX 4060, 16GB RAM",
      status: "Processing",
    },
    {
      invoiceId: "INV-004",
      orderDate: "2024-02-15",
      shippedDate: "2024-02-20",
      memberName: "Emma Brown",
      productDescription: "Smartwatch - Fitness Tracker, GPS",
      status: "Delivered",
    },
    {
      invoiceId: "INV-005",
      orderDate: "2024-02-22",
      shippedDate: "2024-02-27",
      memberName: "David Wilson",
      productDescription: "Bluetooth Speaker - Waterproof",
      status: "Pending",
    },
  ];

  return (
    <div className='lg:w-[83%] w-full absolute right-0 h-[100vh] bg-slate-200 p-6'>
      <div className="p-4">
        <AdminBreadCrumbs links={breadcrumbLinks} name="Manage Order" />
      </div>
      <InvoiceDetails allInvoices={invoiceData} />
    </div>
  );
};

export default RightManageOrder;
