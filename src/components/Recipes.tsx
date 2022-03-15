import React, { useEffect } from 'react';

export const Recipes:React.FC = () => {
    
    useEffect(() => {

    //load current recipes and persist from localStorage

    },[]);


    return (
        <div>
            <div className="">
            <h1>Recipes list:</h1>
            <button>Add Recipe</button>
            <button>Remove Recipe</button>
            </div>
        </div>
    );
}