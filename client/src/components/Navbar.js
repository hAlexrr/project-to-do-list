import React from 'react';
import { MdHome } from "react-icons/md";



const Navbar = () => {
    
    
    return (
        <div 
            className='inline-flex'
        >
            <div 
                id='main-navbar' 
                className='justify-start bg-primary-accent-color rounded-md text-primary-text-color grid grid-rows-6 p-4 pt-16 transition-all duration-300 w-auto'
            >
                
                <div 
                    className='flex flex-col items-center mt-10'
                >
                    <MdHome 
                        className='scale-175 ml-1 transition-all duration-300 hover:scale-200'
                    />

                </div>
            </div>
        </div>
    );
}

export default Navbar;
