'use client';

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

export type userRegistrationData = {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    plainPassword: string;
}

export const apiGateway = async (userData: userRegistrationData): Promise<any> => {
    console.log(userData.plainPassword);
    const res = await fetch(`http://localhost:3000/user/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(userData),
    })
    return res.json();
}

function RegisterForm(): JSX.Element {

    const router = useRouter();

    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        plainPassword: ''
    });

    const userInfoHandler = async (e: SyntheticEvent): Promise<void> => {
        e.preventDefault();
        const result = await apiGateway(userInfo);

        if (result.status === "success!") {
            router.push('/login');
        }
    }

    return (
        <form
            className={
                `flex flex-col gap-4 w-3/4`
            }
        >
            <div
                className={
                    `flex flex-col gap-2`
                }
            >
                <label
                    htmlFor="firstName"
                    id="firstName"
                >
                    First Name:
                </label>
                <input
                    type="text"
                    name="firstName"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setUserInfo((prev: any) => {
                            return {
                                ...prev,
                                firstName: e.target.value,
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
                    `flex flex-col gap-2`
                }
            >
                <label
                    htmlFor="lastName"
                    id="lastName"
                >
                    Last Name:
                </label>
                <input
                    type="text"
                    name="lastName"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setUserInfo((prev: any) => {
                            return {
                                ...prev,
                                lastName: e.target.value,
                            }
                        })
                    }}
                    required

                    className={
                        `px-2 py-1 text-md text-black font-bold outline-0 rounded-md`
                    }
                />
            </div>

            <div
                className={
                    `flex flex-col gap-2`
                }
            >
                <label
                    htmlFor="email"
                    id="email"
                >
                    Email:
                </label>
                <input
                    type="email"
                    name="email"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setUserInfo((prev: any) => {
                            return {
                                ...prev,
                                email: e.target.value,
                            }
                        })
                    }}
                    required

                    className={
                        `px-2 py-1 text-md text-black font-bold outline-0 rounded-md`
                    }
                />
            </div>

            <div
                className={
                    `flex flex-col gap-2`
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
                    required

                    className={
                        `px-2 py-1 text-md text-black font-bold outline-0 rounded-md`
                    }
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
                                plainPassword: e.target.value,
                            }
                        })
                    }}
                    required

                    className={
                        `px-2 py-1 text-md text-black font-bold outline-0 rounded-md`
                    }
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
                        hover:bg-gray-300 hover:text-gray-700 mt-6
                        `
                    }

                    onClick={(e: SyntheticEvent) => userInfoHandler(e)}
                >
                    Register
                </button>
                <Link
                    href={'/login'}
                    className={
                        `px-2 py-1 text-xs text-gray-200 underline outline-0 m-auto w-1/3
                        hover:text-gray-300 text-center
                        `
                    }
                >
                    Login
                </Link>
                <button
                    onClick={(e: SyntheticEvent) => {
                        signIn('google');
                    }}
                >
                    Google
                </button>
            </div>
        </form>
    );
}

export default RegisterForm;