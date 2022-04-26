import { useStateContext } from '../context/StateProvider'

const ContextB: React.FC = () => {
  const { toggle } = useStateContext()
  return (
    <>
      <p>Context B</p>
      <p className="text-indigo-600" data-testid="toggle-b">
        {toggle ? 'true' : 'false'}
      </p>
    </>
  )
}
export default ContextB
