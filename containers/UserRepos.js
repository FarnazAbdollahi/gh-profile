import React, { useContext, useEffect, useState } from 'react';
import { Octokit } from "octokit";
import { Store, setRepos } from "../context/store";
import { SimpleGrid, Skeleton, Box, Text, Heading, Link, Spinner } from '@chakra-ui/react';
import ReactPaginate from 'react-paginate';
import Head from 'next/head';

const octokit = new Octokit({ auth: `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` });

const UserRepos = () => {
    const { state, dispatch } = useContext(Store);
    const [reloading, setReloading] = useState(false);
    const [pageCount, setPageCount] = useState(Math.ceil(state.profileInfo.public_repos / 6));
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1)
        setReloading(true)
    };

    const getUserRepos = async () => {
        try {
            const result = await octokit.request(`GET /users/${state.profileInfo.login}/repos?sort=updated&per_page=6&page=${currentPage}`, {
                username: state.profileInfo.login,
            })
            setRepos(result.data, dispatch)
            setReloading(false)
        } catch (error) {

        }
    }

    useEffect(() => {
        getUserRepos()
    }, [state.profileInfo.login, currentPage])

    return <React.Fragment>
        <Heading as='h4' size='md' pb="3">
            Repositories:
        </Heading>

        {state.userRepos.length > 0 ? <div>
            <SimpleGrid columns={2} spacing={10}>
                {
                    reloading === true ? <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    /> : state.userRepos.map((item, index) => {
                        return <Box borderWidth='1px' borderRadius='lg' minHeight="80px" p="3" key={index}>
                            <Link color='blue.500' href={item.html_url} target="_blank">
                                <Heading as='h5' size='md' pb="1">{item.name}</Heading>
                            </Link>
                            <Text color="#555">{item.description ? item.description : "No Description"}</Text>
                            <Text color="#979797">updated at: {item.updated_at}</Text>
                        </Box>
                    })
                }
            </SimpleGrid>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                className="pagination"
            />
        </div> : <SimpleGrid columns={2} spacing={10}>
            <Skeleton height='80px' />
            <Skeleton height='80px' />
            <Skeleton height='80px' />
            <Skeleton height='80px' />
            <Skeleton height='80px' />
            <Skeleton height='80px' />
        </SimpleGrid>}
    </React.Fragment>
}
export default UserRepos
