import { useRouter } from 'next/router'
import React, { useContext, useEffect } from 'react';
import { Store, setInfo } from "../../context/store";
import { Octokit } from "octokit";

import { Grid, GridItem, useToast} from '@chakra-ui/react';

import UserInformation from '../../containers/UserInformation';
import UserRepos from '../../containers/UserRepos';

const octokit = new Octokit({ auth: `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` });

const Profile = () => {
  const router = useRouter()
  const { username } = router.query
  const { state, dispatch } = useContext(Store);
  const toast = useToast()

  const checkUsername = async () => {
    if (username != "" && !state.profileInfo) {
      try {
        const result = await octokit.request(`GET /users/${username}`, {
          username: username
        })
        setInfo(result.data, dispatch)
      } catch (error) {
        toast({
          title: 'error',
          description: "invalid username!",
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        // setTimeout(()=>{
        //   router.push(`/`)
        // },4000)

      }
    }
  }
  useEffect(() => {
    if (username) {
       checkUsername()
    }
  }, [username, checkUsername])


  // state.profileInfo
  return state.profileInfo ?
    <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(5, 1fr)' }} p={3} gap={2}>
      <GridItem colSpan={{ base: '1', md: '2' }} ><UserInformation/></GridItem>
      <GridItem colSpan={{ base: '4', md: '3' }} ><UserRepos/></GridItem>
    </Grid>
    : null
}

export default Profile