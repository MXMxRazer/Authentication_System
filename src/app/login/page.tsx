import { logo } from '@/logos/logo.types';
import LoginForm from './formController';
import Image from 'next/image';

const loginSideImage = (): JSX.Element => {
    return (
        <div
            className={
                `w-full flex flex-col gap-8 justify-center text-center text-md italic`
            }
        >
            <h2>Powered By: </h2>
            <div
                className={
                    'w-full grid grid-cols-2 auto-rows-auto items-center gap-y-10'
                }
            >
                {
                    logo.map((logo: any) => {
                        return (
                            <Image
                                className={
                                    'm-auto'
                                }
                                key={logo.id}
                                src={logo.img}
                                alt={logo.title}
                                priority
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

function Login(): JSX.Element {
    return (
        <div
            className={
                `w-full m-2 flex justify-center flex-col`
            }>
            <span
                className={
                    `text-2xl font-bold mb-4 justify-center flex`
                }
            >
                Login
            </span>
            <div
                className={
                    `mt-2 border-2 rounded-lg w-7/12 m-auto p-6 pb-8 flex gap-6 shadow-lg shadow-white`
                }
            >
                {loginSideImage()}
                <LoginForm />
            </div>
        </div>
    )
}

export default Login;