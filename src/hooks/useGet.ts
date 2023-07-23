import { useAuth } from "@clerk/clerk-react";

export default function useGet() {
    const { getToken } = useAuth();
    const authenticatedGet = async (url: string) => {
        return fetch(
            `${import.meta.env.VITE_REACT_APP_BACKEND_URL as string}${url}`,
            {
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                headers: { Authorization: `Bearer ${await getToken()}` },
            }
        ).then((res) => res.json());
    };
    return authenticatedGet;
}
