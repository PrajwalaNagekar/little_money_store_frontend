import React from 'react'
import { Link } from 'react-router-dom'
import EligibilityCheckForm from './EligibilityCheckForm'

const EligibilityCheckPage = () => {
  return (
    <div>
      <div>
        <ul className="flex space-x-2 rtl:space-x-reverse">
          <li>
            <Link to="/merchant" className="text-primary hover:underline">
              Dashboard
            </Link>
          </li>
          {/* <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <Link to="/merchant/orders" className="text-primary hover:underline">
                        Orders
                    </Link>
                </li> */}
          <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
            <span>Create</span>
          </li>
        </ul>
        {/* <LoanApplyForm /> */}
          <EligibilityCheckForm/>
      </div>
    </div>
  )
}

export default EligibilityCheckPage