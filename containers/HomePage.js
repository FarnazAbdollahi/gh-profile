import { useState, useContext } from 'react'
import styles from '../styles/Home.module.css'
import { Octokit } from "octokit";
import { useRouter } from 'next/router'
import { Button, Input, useToast, Box, Flex, Text } from '@chakra-ui/react'
import { setInfo ,Store } from '../context/store';

const octokit = new Octokit({ auth: `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` });



const HomePage = () => {
  const router = useRouter()
  const toast = useToast()
  const { dispatch } = useContext(Store);
  const [username, setUsername] = useState("")


  const handleClick = async (value) => {
    if (value != "") {
      try {
        const result = await octokit.request(`GET /users/${value}`, {
          username: value
        })
        setInfo(result.data, dispatch)
        router.push(`/profile/${value}`)

      } catch (error) {
        toast({
          title: 'error',
          description: "invalid username",
          status: 'error',
          duration: 1000,
          isClosable: true,
        })
      }
    }
    else {
      toast({
        title: 'error',
        description: "enter username",
        status: 'error',
        duration: 1000,
        isClosable: true,
      })
    }
  }

  return (
    <Flex  align="center" justify="center" minHeight="99vh">
      <Box margin="auto" w={256} h="150px" display="flex" alignItems="center" justifyContent="space-between" flexDirection="column" >
        <Text className={styles.label}>github username</Text>
        <Input textAlign="left" type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <Button colorScheme='blue' onClick={() => handleClick(username)} type="button">confirm</Button>
      </Box>
    </Flex>

  )
}
export default HomePage;