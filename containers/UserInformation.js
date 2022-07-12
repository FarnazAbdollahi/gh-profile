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

    return <Box textAlign={{ base: 'center', md: 'left' }} borderWidth='1px' borderRadius='lg' p="3" height="100%">
        <Avatar size="2xl" alignSelf="center" src={state.profileInfo.avatar_url} />
        <Text fontWeight='bold' fontSize="2xl" pt="1">
            {state.profileInfo.name}
        </Text>
        <Text fontSize='lg' pt="4">{state.profileInfo.login}</Text>
        {
            state.profileInfo.location ? <Text fontSize="sm" pt={1} color={'gray.500'}>
                {state.profileInfo.location}
            </Text> : null
        }
        <Flex flexFlow={{ base: 'column', md: 'row' }} justifyContent={{ base: 'center', md: 'left' }} pt="3" pb="3">

            <Text fontSize='md' mr='1' >

                <Badge ml='1' colorScheme='green' m={1}>
                    {state.profileInfo.followers}
                </Badge>
                followers
            </Text>

            <Text fontSize='md' ml='1'>

                <Badge ml='1' colorScheme='teal' m={1}>
                    {state.profileInfo.following}
                </Badge>
                following
            </Text>
        </Flex>

        {
            state.profileInfo.bio ? <Text mt={5} mb={5} >
                `{state.profileInfo.bio}`
            </Text> : null
        }

        {
            state.profileInfo.blog ? <Text pt={3}>
                <Link color='teal.500' href={state.profileInfo.blog}>
                    {state.profileInfo.blog}
                </Link>
            </Text> : null
        }
    </Box>
}
export default UserInformation