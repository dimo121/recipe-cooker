import React, { useEffect } from 'react';
//import { CookingHistory } from '../types/TypeDefs';
import { HistoryItem } from '../types/TypeDefs';
import { HistoryComp } from './HistoryComp';
import { useAppDispatch, useAppSelector } from '../store/store';

export const Cooker: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {}, [dispatch]);

    const historyState = useAppSelector((state) => state.history);

    return (
        <div className="cooker-wrapper">
            <div className="recipes-history">
                <div
                    className="center flex-center"
                    style={{ marginTop: '2em' }}
                >
                    <h1 className="title-underline">Cooking History</h1>
                </div>
                <div className="card-wrapper">
                    {historyState.history &&
                        historyState.history.map(
                            (item: HistoryItem, idx: number) => (
                                <HistoryComp key={idx} item={{ ...item }} />
                            )
                        )}
                </div>
            </div>
        </div>
    );
};
