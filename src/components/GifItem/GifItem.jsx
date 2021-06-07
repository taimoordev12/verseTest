import React from 'react'
import '../GifItem/GifItem.style.css';

const GifItem=({Url,Url_still})=> {
    return (
        <picture>
            <source type='image/webp' srcSet={Url}/>
            <img src={Url_still}/>

        </picture>
             
             
        
    )
}

export default GifItem;