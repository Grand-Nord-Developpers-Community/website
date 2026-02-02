// "use client";
// import React, { useState, useEffect } from "react";
// import { cn } from "@/lib/utils";
// import Image, { ImageProps } from "next/image";
// import { Blurhash } from "react-blurhash";
// import clsx from "clsx";
// interface CustomImageProps extends ImageProps {
//   // Add any custom props you'd like here
//   src: string;
//   loaderClassName?: string;
//   hash?: string;
// }

// const CustomImage: React.FC<CustomImageProps> = ({
//   loaderClassName = "",
//   className,
//   src,
//   hash,
//   ...restProps
// }) => {
//   const [loaded, setLoaded] = useState(false);
//   // useEffect(()=>{

//   // },[loaded])
//   return (
//     <>
//       {loaded ? (
//         <></>
//       ) : (
//         <Blurhash
//           className="!w-full !h-full object-fill"
//           hash={hash ?? "L4EpKK00000000%O_NayH;9d--4n"}
//           width={100}
//           height={100}
//         />
//       )}
//       <Image
//         className={className}
//         {...restProps}
//         src={src}
//         style={{
//           display: !loaded ? "hidden" : undefined,
//         }}
//         onLoad={() => setLoaded(true)}
//       />
//     </>
//   );
// };

// export default CustomImage;
"use client";

import { useState, useEffect } from "react";
import { Blurhash } from "react-blurhash";
import { cn } from "@/lib/utils";

interface BlurImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    hash?: string | null;
}

export default  function  BlurImage({
    hash,
    className,
    src,
    alt,
    ...props
}: BlurImageProps) {
    const [imageLoaded, setImageLoaded] = useState(false);

    // Handle cached images
    useEffect(() => {
        if (!src) return;
        const img = new Image();
        //@ts-ignore
        img.src = src;
        if (img.complete) {
            setImageLoaded(true);
        }
    }, [src]);

    return (
        <div className="w-full h-full relative overflow-hidden">
            {hash && (
                <div
                    className={cn(
                        "absolute inset-0 transition-opacity duration-500 z-0",
                        imageLoaded ? "opacity-0" : "opacity-100",
                    )}
                >
                    <Blurhash
                        hash={hash}
                        width="100%"
                        height="100%"
                        resolutionX={32}
                        resolutionY={32}
                        punch={1}
                    />
                </div>
            )}
            <img
                src={src}
                alt={alt}
                onLoad={() => setImageLoaded(true)}
                className={cn(
                    "relative z-10 w-full h-full object-cover transition-opacity duration-500",
                  hash && !imageLoaded ? "opacity-0" : "opacity-100",
                    className,
                )}
                {...props}
            />
        </div>
    );
}