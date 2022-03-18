import React, { useEffect } from 'react';
//import { CookingHistory } from '../types/TypeDefs';
import { HistoryItem } from '../types/TypeDefs';
import { HistoryComp } from './HistoryComp';
import { useAppDispatch, useAppSelector } from '../store/store';
import { historySlice } from '../slices/history';


export const Cooker:React.FC = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    const historyFromLocalStorage = JSON.parse(localStorage.getItem('history') as string)
    dispatch(historySlice.actions.setHistory(historyFromLocalStorage));
  },[])
  
  const historyState = useAppSelector(state => state.history)

  return (
    <div className='cooker-wrapper'>
      <div className="recipes-history">
        <h1>Previous recipes cooked:</h1>
        <div>
          {historyState.history.map((item:HistoryItem, idx:number) => 
              <HistoryComp key={idx} item={{...item}} />
          )}
        </div>
      </div>
    </div>
  );
}