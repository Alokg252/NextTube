import React, { memo } from 'react'

interface Props{
  play:string;
  setplay:React.Dispatch<React.SetStateAction<string>>;
}

const VideoPlayer:React.FC<Props> = ({play, setplay}) => {
  return (
    <>
      <div className={`${play?"w-full":"w-0"} h-[90%] transition-all bg-slate-500 absolute mt-7`} autoFocus 
      onKeyDown={(e)=>{
        if(e.key === "Escape"){
          setplay("");
        }
      }}>
      <iframe width="100%" height="100%" src={play ? `https://www.youtube.com/embed/${play}?autoplay=1` : "https://yt3.ggpht.com/s2XAtYzz3w857Cuvkj-KSLAfBsARw5ObtHJU9OO-D5rJJdQBfdJY5qy5JVC48tw1fnGt_QsK4Msd=s1600-rw-nd-v1"}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>
    </>
  )
}

export default memo(VideoPlayer)