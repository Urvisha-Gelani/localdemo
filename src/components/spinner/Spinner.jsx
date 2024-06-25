import React from 'react';
import { ClipLoader } from 'react-spinners';

function Spinner({loading}) {
    return (
        <>
            <div className='flex justify-center items-center h-96'>
                <div className='h-2/4 flex items-center'>
                    <ClipLoader
                        loading={loading}
                        color={"ng-blue-900"}
                        size={30}
                        speedMultiplier={1}
                        aria-label="Loading Spinner"
                        data-testid="loader" />

                </div></div>
        </>
    );
}

export default Spinner;
