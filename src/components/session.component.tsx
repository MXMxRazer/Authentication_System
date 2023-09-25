"use client";

import { useSession } from "next-auth/react";

function SessionPage() {
    const { data: session } = useSession();

    return (
        <>
            <h1>something</h1>
        </>
    )
}

export default SessionPage;