import '../style-sheets/result.css';
import { useState } from 'react';

const Result = (props) => {
    return(
        <>
        <div className="formula">
            {props.form}
        </div>
        <div id="display" className="input">
            {props.in}
        </div>
        </>
    )
};

export default Result;