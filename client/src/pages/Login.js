import React from 'react';

const Login = () => {
    return (
        <div className='w-screen h-screen bg-primary-bg-color text-primary-text-color flex justify-center flex-row row-span'>
            <div className='w-1/2 h-full flex justify-center items-center'>
                <div className=' border-4 p-4 rounded-lg border-primary-border-color scale-150'>
                    <h1 className='text-5xl text-center pb-4'>Login</h1>

                    <form className='grid'>
                        <div className='text-xl'>Email</div>
                        <input type="email" name="email" id="email" className='rounded-lg bg-primary-accent-color transition-all duration-200 border-4 hover:bg-primary-bg-color border-primary-border-color' />

                        <div className=' pt-4 text-xl'>Password</div>
                        <input type="password" name="password" id="password" className='rounded-lg bg-primary-accent-color transition-all duration-200 border-4 hover:bg-primary-bg-color border-primary-border-color'/>

                        <div className='flex mt-1 relative'>
                            <div className='hover:text-sky-700 text-3xs'>Forgot Password</div>
                            <div htmlFor="rememberMe" className='ml-1 hover:text-sky-700 text-3xs absolute right-0 flex hover:cursor-pointer transition-all duration-150'>
                                <input type="checkbox" name="rememberMe" id="rememberMe" className=' accent-primary-accent-color border-2 border-primary-border-color ml-4 justify-end' />
                                <div className='ml-px text-2xs font-bold'>Remeber me</div>
                            </div>
                        </div>

                        <button type="submit" className='flex text-xl mt-4 border-4 border-primary-border-color rounded-md group text-center hover:scale-90 transition-all duration-200'>
                            <div className='bg-inheri rounded-sm w-0 h-full top-0 justify-center transition-all duration-200 group-hover:w-full'></div>
                            <div className='text-primary-text-color text-2xl'>Login</div>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
