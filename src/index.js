import { useState, useEffect } from 'react'
/**
 * This effect keeps track of the current state of an HTTP request
 *
 * @param {Function} callback - The fetch callback
 * @param {Object} args - Optional arguments to be passed into the callback if it accepts parameters
 * @return {Object} The current state of the api call, including a loading boolean,
 * an error boolean, and the data returned from the call upon success
 */
export default function useFetch(callback, ...args) {
  const [state, setState] = useState({
    loading: false,
    error: false,
    response: null
  })
  useEffect(() => {
    setState({ loading: true, error: false, response: null })
    let unmounted = false
    ;(async function fetch() {
      try {
        const response = await callback(...args)
        const json = await response.json()
        if (!unmounted) {
          setState({ loading: false, error: false, response: json })
        }
      } catch (e) {
        if (!unmounted) {
          setState({ loading: false, error: true, response: null })
        }
      }
    })()
    return () => {
      unmounted = true
    }
  }, [callback, ...args]) // eslint-disable-line react-hooks/exhaustive-deps
  return state
}
