import React, { useContext, useEffect } from 'react';
import { Store } from "../context/store";
import {
  Badge,
  Box,
  Text,
  Avatar,
  Flex,
  Link,
} from '@chakra-ui/react';

const UserInformation = () => {
    const { state } = useContext(Store);

    return <React.Fragment>
        <Avatar size="2xl" alignSelf="center" src={state.profileInfo.avatar_url} />
        <Text fontWeight='bold'>
            {state.profileInfo.name}
        </Text>
        <Text fontSize='sm'>{state.profileInfo.login}</Text>
        <Flex flexFlow="row" >
            <Text fontSize='sm' color={'gray.500'} mr='1'>

                <Badge ml='1' colorScheme='green' m={1}>
                    {state.profileInfo.followers}
                </Badge>
                followers
            </Text>
            .
            <Text fontSize='sm' color={'gray.500'} ml='1'>

                <Badge ml='1' colorScheme='red' m={1}>
                    {state.profileInfo.following}
                </Badge>
                following
            </Text>
        </Flex>


        {
            state.profileInfo.bio ? <Text pt={3} width="300px">
                `{state.profileInfo.bio}`
            </Text> : null
        }
        {
            state.profileInfo.location ? <Text pt={3} color={'gray.500'}>
                {state.profileInfo.location}
            </Text> : null
        }
        {
            state.profileInfo.blog ? <Text pt={3}>
                <Link color='teal.500' href={state.profileInfo.blog}>
                    {state.profileInfo.blog}
                </Link>
            </Text> : null
        }
    </React.Fragment>
}
export default UserInformation