import AdminBreadCrumbs from '@/app/components/Admin/AdminBreadCrumbs';
import React from 'react'

const RightGallery = () => {

    const breadcrumbLinks = [
        { label: "Admin", href: "/admin" },
        // { label: "Manage Orders", href: "/admin/manageorder" },
      ];

  return (
    <div className='lg:w-[83%] w-full absolute right-0 h-[100vh] bg-slate-200 p-6'>
        <div className="p-4">
      <AdminBreadCrumbs links={breadcrumbLinks} name="Gallery" />
      </div>
      
    </div>
  )
}

export default RightGallery
