import React from 'react';
import { MdHome } from "react-icons/md";
import { Link } from 'react-router-dom';



const Navbar = () => {
    
    
    return (
        <div 
            className='flex'
        >
            <div 
                id='main-navbar' 
                className='justify-start bg-primary-accent-color rounded-md text-primary-text-color grid grid-rows-6 p-4 pt-16 transition-all duration-300 w-auto'
            >
                
                <div 
                    className='flex flex-col items-center mt-10'
                >
                    <Link to='/home'>
                        <MdHome 
                            className='scale-175 ml-1 transition-all duration-300 hover:scale-200'
                        />
                    </Link>

                </div>
            </div>
        </div>
    );
}

export default Navbar;
