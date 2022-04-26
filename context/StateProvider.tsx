import { useContext, useState, createContext,ReactNode } from 'react'

const StateContext = createContext(
  {} as {
    toggle: boolean
    setToggle: React.Dispatch<React.SetStateAction<boolean>>
  }
)
import Image from 'next/image'

interface Props {

  children: ReactNode
}
export const StateProvider: React.FC<Props> = ({ children}) => {
  const [toggle, setToggle] = useState(false)

  return (
    <StateContext.Provider value={{ toggle, setToggle }}>
      {children}
    </StateContext.Provider>
  )
}
export const useStateContext = () => useContext(StateContext)
