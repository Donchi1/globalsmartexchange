import React from 'react'
import { ImSpinner3 } from 'react-icons/im'

const  DefaultIcon = ({isSubmitting}:{isSubmitting?: boolean}) => isSubmitting ? <ImSpinner3 className='text-white animate-spin' /> : <span className="text-white">₿</span>

export default DefaultIcon