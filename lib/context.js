import React, { useContext } from 'react'

/**
 * Context that contains some top level variables that are used in the app
 */
export const ScriboContext = React.createContext({
  buttonActiveColor: null,
  buttonDefaultColor: null,
  buttonIconSize: 0
})

export const useScribo = () => {
  return useContext(ScriboContext)
}
