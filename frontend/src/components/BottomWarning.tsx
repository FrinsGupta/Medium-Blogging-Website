
type BottomWarningType = {
    warning: string,
    link: string
}

const BottomWarning = ({warning, link}: BottomWarningType) => {
  return (
    <div className=' font-semibold flex mt-2 mb-7' >
      {warning} <p className='underline ml-2 cursor-pointer'> {link}</p> 
    </div>
  )
}

export default BottomWarning
