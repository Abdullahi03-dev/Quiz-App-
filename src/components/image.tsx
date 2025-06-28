import React from 'react'

interface ImageProps{
    src:string;
    alt:string;
    width?:string;
    height?:string;
    className?:string;
    onClick?: ()=>void;
}

const ImageComponent:React.FC<ImageProps>=({src,alt,width,height,className,onClick})=>{
return <img src={src} alt={alt} width={width} height={height} className={className} onClick={onClick} loading='eager'/>
    
}
export default ImageComponent