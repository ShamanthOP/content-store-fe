import { useAuth } from "@clerk/clerk-react";

export default function usePost() {
    const { getToken } = useAuth();
    const authenticatedPost = async (url: string, data: any) => {
        return fetch(
            `${import.meta.env.VITE_REACT_APP_BACKEND_URL as string}${url}`,
            {
                headers: {
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    Authorization: `Bearer ${await getToken()}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(data),
            }
        ).then((res) => res.json());
    };
    return authenticatedPost;
}
