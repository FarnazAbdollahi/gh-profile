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
          title: 'خطا',
          description: "نام کاربری مورد نظر معتبر نیست",
          status: 'error',
          duration: 1000,
          isClosable: true,
        })
      }
    }
  }
  useEffect(() => {
    if (username) checkUsername()
  }, [username])


  // state.profileInfo
  return state.profileInfo ?
    <Grid templateColumns={{ base: 'repeat(0, 1fr)', md: 'repeat(5, 1fr)' }} p={10} gap={4}>
      <GridItem  colSpan={1} > <UserInformation/></GridItem>
      <GridItem  colSpan={4} ><UserRepos/></GridItem>
    </Grid>
    : null
}

export default Profile