import React from 'react'
import { useMyHook } from '@laney/react-use-fetch'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App