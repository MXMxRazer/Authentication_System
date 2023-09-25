'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

export const apiGateway = async (username?: string, password?: string): Promise<any> => {
    const res = await fetch(`http://localhost:3000/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            username,
            password
        }),
    })
    return res.json();
}

const LoginForm = (): JSX.Element => {

    const router: any = useRouter();

    const [userInfo, setUserInfo]: [object: { username: string, password: string }, Function] = useState({
        username: '',
        password: ''
    });

    const userInfoHandler = async (e: SyntheticEvent): Promise<void> => {
        e.preventDefault();
        const result = await apiGateway(userInfo.username, userInfo.password);

        if (result.status === "success!") {
            localStorage.setItem(`access_token`, JSON.stringify(result.access_token));
            router.push('/home');
        }
    }

    return (
        <form
            className={
                `flex flex-col gap-10 w-8/12 p-4`
            }
        >
            <div
                className={
                    `flex flex-col gap-2 text-md`
                }
            >
                <label
                    htmlFor="username"
                    id="username"
                >
                    Username:
                </label>
                <input
                    type="text"
                    name="username"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setUserInfo((prev: any) => {
                            return {
                                ...prev,
                                username: e.target.value,
                            }
                        })
                    }}

                    className={
                        `px-2 py-1 text-md text-black font-semi-bold outline-0 rounded-md`
                    }
                    required
                />
            </div>

            <div
                className={
                    `flex flex-col gap-2`
                }
            >
                <label
                    htmlFor="password"
                    id="password"
                >
                    Password:
                </label>
                <input
                    type="password"
                    name="password"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setUserInfo((prev: any) => {
                            return {
                                ...prev,
                                password: e.target.value,
                            }
                        })
                    }}

                    className={
                        `px-2 py-1 text-md text-black font-bold outline-0 rounded-md`
                    }
                    required
                />
            </div>

            <div
                className={
                    `flex flex-col gap-4`
                }
            >
                <button
                    className={
                        `px-2 py-1 text-sm text-black outline-0 rounded-sm bg-gray-200 m-auto w-1/3
                        hover:bg-gray-300 hover:text-gray-700
                        `
                    }

                    onClick={(e: SyntheticEvent) => userInfoHandler(e)}
                >
                    Login
                </button>
                <Link
                    href={'/register'}
                    className={
                        `px-2 py-1 text-xs text-gray-200 underline outline-0 m-auto w-1/3
                        hover:text-gray-300 text-center
                        `
                    }
                >
                    Register
                </Link>
                <button
                    className={
                        `px-2 py-1 text-md p-20 bg-slate-900  border-b-2  cursor-pointer outline-none focus`
                    }
                >
                    Sign In With Google
                </button>
            </div>
        </form>
    );
}

export default LoginForm;