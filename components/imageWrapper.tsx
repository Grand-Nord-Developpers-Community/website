"use client"
import React,{useState,useEffect} from "react"
import {cn} from "@/lib/utils"
import Image, { ImageProps } from 'next/image';
import { Blurhash } from "react-blurhash";
import clsx from "clsx"
interface CustomImageProps extends ImageProps {
  // Add any custom props you'd like here
  src:string;
  loaderClassName?: string;
  hash?:string;
}

const CustomImage: React.FC<CustomImageProps> = ({
  loaderClassName="",
  className,
  src,
  hash,
  ...restProps
}) => {
  const [loaded, setLoaded] = useState(false);
  // useEffect(()=>{
    
  // },[loaded])
  return (
    <>
      {loaded ? <></>: (
        <Blurhash
          className="!w-full !h-full object-fill"
          hash={hash ?? "L4EpKK00000000%O_NayH;9d--4n"}
          width={100}
          height={100}
        />
      )}
      <Image
        className={className}
        {...restProps}
        src={src}
        style={{
          display:!loaded?"hidden":undefined
        }}
        onLoad={() => setLoaded(true)}
  
      />
    </>
  );
};

export default CustomImage;
