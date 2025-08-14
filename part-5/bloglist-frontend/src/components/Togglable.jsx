


//yo tw sir le pane copy paste hannu vako thiyo ni yaad aayo 

import { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

const Togglable = forwardRef((props, ref) =>{
    
    const [visible, setVisible] = useState(false);


    //for style ok 
    const hideWhenVisible = { display: visible ? "none" : ""};
    const showWhenVisible = { display: visible ? "": "none"};
    
    //for togglevisibilty
    const toggleVisibility = () => {
        setVisible(!visible);
    }
    //use useImperativeHandle
    useImperativeHandle(ref, () => { 
        return {
            toggleVisibility,
        };
    })
    
    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            {/* or  */}
            <div style={showWhenVisible}>
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    );
});


Togglable.propTypes ={
    buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = "Togglable";

export default Togglable;