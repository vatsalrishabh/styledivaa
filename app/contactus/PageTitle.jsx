import React from 'react'

const PageTitle = (props) => {
  return (
    <div className='Page-Title'>
         <div className="Page-Name">
            <h1 className="lg:mt-8 z-30 bg-pink-400  text-[40px] text-white flex justify-center align-middle text-center font-semibold ">{props.pagetitle}</h1>
        </div>
    </div>
  )
}

export default PageTitle
