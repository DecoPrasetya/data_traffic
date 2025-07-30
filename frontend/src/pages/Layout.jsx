import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

export const layout = ({ children }) => {
    return (
        <React.Fragment>
            <Navbar />
            <div className="columns mt-6" >
                <div className="column is-2"><Sidebar /></div>
            <div className="column">
                <main>{children}</main>
            </div>
        </div>
    </React.Fragment >
  )
}

export default layout