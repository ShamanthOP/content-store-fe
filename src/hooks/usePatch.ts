import { useAuth } from "@clerk/clerk-react";

export default function usePatch() {
    const { getToken } = useAuth();
    const authenticatedPatch = async (url: string, data: any) => {
        return fetch(
            `${import.meta.env.VITE_REACT_APP_BACKEND_URL as string}${url}`,
            {
                headers: {
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    Authorization: `Bearer ${await getToken()}`,
                    "Content-Type": "application/json",
                },
                method: "PATCH",
                body: JSON.stringify(data),
            }
        ).then((res) => res.json());
    };
    return authenticatedPatch;
}
