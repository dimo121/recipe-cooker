import React, { useState, useEffect } from 'react';
import { CookingHistory } from '../types/TypeDefs';
import { HistoryItem } from '../types/TypeDefs';
import { HistoryComp } from './HistoryComp';


export const Cooker:React.FC = () => {

  const [historyCollection,updateHistory] = useState<CookingHistory>([]);

  useEffect(() => {
      //load mock recipes before introducing redux
      updateHistory([
          {
              id: 1,
              recipeName: 'pasta',
              timeCooked: new Date('2022-03-15').toDateString(),
              ingredientsUsed: [
                  {
                      id:1,
                      name: 'pasta',
                      quantity: 1
                  },
                  {
                      id:2,
                      name: 'olive oil',
                      quantity: 1
                  },
                  {
                      id:3,
                      name: 'sauce',
                      quantity: 1
                  }
              ]
          },
          {
              id: 2,
              recipeName: 'salad',
              timeCooked: new Date('2022-03-16').toDateString(),
              ingredientsUsed: [
                  {
                    id:1,
                      name: 'lettuce',
                      quantity: 1
                  },
                  {
                    id:2,
                      name: 'tomato',
                      quantity: 1
                  },
                  {
                    id:3,
                      name: 'onion',
                      quantity: 1
                  }
              ]
          }
      ]);

  },[]);


  return (
    <div className='cooker-wrapper'>
      <div className="recipes-history">
        <h1>Previous recipes cooked:</h1>
        <div>
          {historyCollection.map((item:HistoryItem, idx:number) => 
              <HistoryComp key={idx} item={{...item}} />
          )}
        </div>
      </div>
    </div>
  );
}