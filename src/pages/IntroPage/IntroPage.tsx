import { useEffect, useState } from "react";
import { DetailContent } from "./DetailContent";

export const IntroPage = () => {

  const [pageHeight, setPageHeight] = useState(window.innerHeight - 30)
  const [showDetail, setShowDetail] = useState<string | null | 'init'>('init')

  useEffect(() => {
    const handleResize = () => {
      setPageHeight(window.innerHeight - 30)
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [])

  const handleClick = (detail: string | null = null) => {
    if (showDetail === detail) setShowDetail(null)
    else setShowDetail(detail)
  }

  return (
    <div className="first-page" style={{height: pageHeight}}>
      <div className={`
          big-logo
          ${showDetail === 'init' && 'fade-in'}
          ${showDetail && showDetail !== 'init' && 'shrink'}
        `}
      />
      <img
        className={`
          title 
          ${showDetail === 'init' && 'fade-in'} 
          ${showDetail && showDetail !== 'init' && 'shrink'}
        `}
        src="postitle.svg"
        alt="title"
      />
      <div className="buttons">
        <button 
          onClick={() => handleClick('synopsis')} 
          className={`
            btn-pink 
            fade-in 
            ${showDetail === 'synopsis' && 'btn-active'}
          `}
        >시놉시스</button>
        <button 
          onClick={() => handleClick('cast')} 
          className={`
            btn-pink 
            fade-in 
            ${showDetail === 'cast' && 'btn-active'}
          `}
        >CAST</button>
        <button 
          onClick={() => handleClick('numbers')} 
          className={`
            btn-pink 
            fade-in 
            ${showDetail === 'numbers' && 'btn-active'}
          `}
        >넘버 목록</button>
        <button 
          onClick={() => handleClick('patron')} 
          className={`
            btn-pink 
            fade-in 
            ${showDetail === 'patron' && 'btn-active'}
          `}
        >후원</button>
      </div>
      {showDetail !== null && showDetail !== 'init' && <>
        <div className={`detail ${showDetail && showDetail !== 'init' && 'unshrink'}`}>
          <DetailContent showDetail={showDetail} />
        </div>    
      </>}
      <img
        className={`
          whenwhere 
          ${showDetail === 'init' && 'fade-in'} 
          ${showDetail && showDetail !== 'init' && 'shrink'}
        `}
        src="poswhenwhere.svg"
        alt="title"
      />
    </div>
  );
}
