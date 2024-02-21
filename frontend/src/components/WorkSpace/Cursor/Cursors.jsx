import React from 'react';
import { useSelector } from 'react-redux';
import cursorImage from '../../../assets/workspace/cursor.png';

const Cursors = () => {    
    const { positions } = useSelector((state) => state.cursor);

    return (
        <>
            {Object.entries(positions).map(([accountId, { x, y, nickname }]) => (
                <div key={accountId} style={{ position: 'absolute', left: x, top: y }} className={"z-[5]"}>
                    <img src={cursorImage} alt="cursor" style={{ width: 20, height: 20 }} />
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                        {nickname}
                    </span>
                </div>
            ))}
        </>
    );
};

export default Cursors;