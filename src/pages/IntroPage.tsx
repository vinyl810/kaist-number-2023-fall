import { useEffect, useState } from 'react'
import { DetailContent } from './DetailContent'
import * as React from 'react'
import { styled } from 'styled-components'
import './style.css'

export const IntroPage = (): React.ReactElement => {
  const [pageHeight, setPageHeight] = useState(window.innerHeight - 30)
  const [showDetail, setShowDetail] = useState<string | null | 'init'>('init')

  useEffect(() => {
    const handleResize = (): void => { setPageHeight(window.innerHeight - 30) }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => { window.removeEventListener('resize', handleResize) }
  }, [])

  const handleClick = (detail: string | null = null): void => {
    if (showDetail === detail) setShowDetail(null)
    else setShowDetail(detail)
  }

  const fadeOrShrink = (): string => {
    return `${showDetail === 'init' && 'fade-in'} ${showDetail !== null && showDetail !== 'init' && 'shrink'}`
  }

  const Buttons = (): React.ReactElement => {
    const buttons = [
      { id: 'synopsis', text: '시놉시스' },
      { id: 'cast', text: 'CAST' },
      { id: 'numbers', text: '넘버 목록' },
      { id: 'patron', text: '후원' }
    ]

    return (
      <div className="buttons">{
        (buttons.map(x => {
          return (
            <button
              onClick={() => { handleClick(x.id) }}
              className={`
                btn-pink 
                ${showDetail === 'init' && 'fade-in'} 
                ${showDetail === x.id && 'btn-active'}
              `}
              key={x.id}
            >{x.text}</button>
          )
        }))
    }</div>)
  }

  return (
    <IntroPageWrapper style={{ height: pageHeight }}>
      <div className={`big-logo ${fadeOrShrink()}`}/>
      <img
        onClick={() => { showDetail !== 'init' && setShowDetail(null) }}
        className={`title ${fadeOrShrink()}`}
        src="postitle.svg"
        alt="title"
      />
      <Buttons />
      {showDetail !== null && showDetail !== 'init' &&
        <div className={`detail ${showDetail !== null && showDetail !== 'init' && 'unshrink'}`}>
          <DetailContent showDetail={showDetail} />
        </div>
      }
      <img
        className={`whenwhere  ${fadeOrShrink()}`}
        src="poswhenwhere.svg"
        alt="title"
      />
    </IntroPageWrapper>
  )
}

const IntroPageWrapper = styled.div`
  width: calc(100vw - 30px);
  padding: 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  animation: 2s ease fade-in-fifty;
  filter: brightness(100%);
`
