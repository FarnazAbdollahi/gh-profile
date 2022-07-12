import { Octokit, App } from "octokit";
import { useRouter } from 'next/router'

const octokit = new Octokit({ auth: `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` });

export const checkUsername = async (username) => {
    const router = useRouter()

    // const result = await octokit.request(`GET /search/users?q=user%3${username}&type=Users`, {})
    try {
        const result = await octokit.request(`GET /users/${username}`, {
            username: username
        })
        router.push(`/profile/${username}`)
    } catch (error) {
        alert("نام کاربری مورد نظر معتبر نیست!")
        console.error(error) // from creation or business logic
    }

}