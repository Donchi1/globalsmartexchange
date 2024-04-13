import React from 'react'
import H1 from './web-default/H1'


function Preloader() {
    return (
       
            <div className="flex  bg-red-700 justify-center w-full top-0 right-0 left-0 bottom-0 h-screen items-center transform -translate-y-2/4 -translate-x-full">
              <div className="spinner-grow inline-block w-20 h-20 bg-red-400 rounded-full opacity-0">
                <span className="visually-hidden">loading...</span>
                <H1>I am Loading please...</H1>
              </div>
            </div>
    )
}

export default Preloader
