"use client";

import { useSession } from "next-auth/react";

function SessionPage() {
    const { data: session } = useSession();

    return (
        <>
            <h1 className="text-sm">CLIENT SESSION: </h1>
            <pre>{JSON.stringify(session)}</pre>
        </>
    )
}

export default SessionPage;