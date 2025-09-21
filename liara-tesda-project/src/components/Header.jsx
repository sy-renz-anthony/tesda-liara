import { useState, useEffect } from "react"

const Header = ({pageName}) => {
  const [name, setName] = useState(null);

  useEffect(()=>{
    if(localStorage.getItem('name'))
      setName(localStorage.getItem('name'));
  }, []);

  return (
    <div className="w-full h-20 flex flex-row bg-white items-center shadow">
      <h1 className='text-2xl font-bold mx-10 w-full'>{pageName}</h1>
      <div className="w-full h-full flex justify-end items-end px-5 py-3 text-sm">
        {name && (<span>Hi - {name}</span>)}
      </div>
    </div>
  )
}

export default Header