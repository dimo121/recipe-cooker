import React from 'react';

export const Footer:React.FC = () => {
    return (
        <div className='footer'>
            <a href='/' className='button'>History</a>
            <a href='/pantry' className='button'>Pantry</a>
            <a href='/recipes' className='button'>Recipes</a>
        </div>
    )
}