import React from 'react'
import "./loader.css";

const Loader = () => {
    return ( 
        <body className='loading'>
        <div className='container-loading'>
            <div className='ring'></div>
            <div className='ring'></div>
            <div className='ring'></div>
            <span className='loading-text'>Wait....</span>
        </div>
        </body>
     );
}
 
export default Loader;