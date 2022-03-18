import React from 'react';
import { NavLink } from 'react-router-dom';

export const Footer:React.FC = () => {
    return (
        <div className='footer'>
            <NavLink to='/' className='button'>History</NavLink>
            <NavLink to='/pantry' className='button'>Pantry</NavLink>
            <NavLink to='/recipes' className='button'>Recipes</NavLink>
        </div>
    )
}