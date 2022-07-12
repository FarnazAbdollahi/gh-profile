import '../styles/globals.css'

import { ChakraProvider } from '@chakra-ui/react'
import { StoreProvider } from "../context/store"

function MyApp({ Component, pageProps }) {

  return <ChakraProvider>
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  </ChakraProvider>

}

export default MyApp
