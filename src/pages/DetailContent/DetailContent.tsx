import './style.css'
import { contentData } from '../../content'
import * as React from 'react'

export interface DetailContentProp {
  showDetail: string | null | 'init'
}

export const DetailContent = (props: DetailContentProp): React.ReactElement => {
  const { showDetail } = props

  const [showPopup, setShowPopup] = React.useState<string | null>(null)
  const [showMdPopup, setShowMdPopup] = React.useState<string | null>(null)

  const getTitle = (showDetail: string | null | 'init'): string => {
    switch (showDetail) {
      case 'synopsis':
        return '시놉시스'
      case 'cast':
        return 'CAST'
      case 'numbers':
        return 'NUMBERS'
      case 'patron':
        return 'MD 및 후원'
      default:
        return ''
    }
  }

  const getContent = (showDetail: string | null | 'init'): React.ReactElement[] | React.ReactElement | string => {
    switch (showDetail) {
      case 'cast':
        return (
          <div className="detail-casts">
            {contentData.cast.map(x => {
              return (
                <ImageItem
                  onClick={() => { setShowPopup(x.url) }}
                  url={`profiles/${x.url}.png`}
                  style={x.style}
                  key={x.url}
                />
              )
            })}
          </div>
        )
      case 'numbers':
        return contentData.numbers.map(x => {
          return (<div className="number-item" key={x.head}>
            <div className='number-head'>{x.head}</div>
            <div className='number-title'>{x.title}</div>
            <div className='number-info'>{x.info}</div>
          </div>)
        })
      case 'synopsis':
        return contentData.synopsis.map(x => {
          return (
            <div
              className={`detail-sentence ${x.style}`}
              key={x.style}
            >{x.text}</div>
          )
        })
      case 'patron':
        return (
          <div className='detail-mds'>
            {contentData.patron.mds.map(x => {
              return <MdItem
                images={x.images}
                text={x.text}
                style={x.style}
                onClick={setShowMdPopup}
                key={x.style}
              />
            })}
            <div className='detail-divider' />
            {contentData.patron.descriptions.map(x => {
              return (
                <div className={`md-descr ${x.style}`} key={x.style}>{x.text}</div>
              )
            })}
          </div>
        )
      default:
        return '아직 후원 정보가 준비되지 않았습니다. 조금만 기다려주세요!'
    }
  }

  return (
    <div className="detail-content">
      {showPopup !== null && <ImagePopup url={showPopup} onClick={() => { setShowPopup(null) }} />}
      {showMdPopup !== null && <MdImagePopup url={showMdPopup} onClick={() => { setShowMdPopup(null) }} />}
      <div className="detail-title">
        {getTitle(showDetail)}
      </div>
      <div className="detail-text">
        {getContent(showDetail)}
      </div>
    </div>
  )
}

const ImageItem = (props: { url: string, style: string, onClick: () => void }): React.ReactElement => {
  return <img onClick={props.onClick} className={`detail-image ${props.style}`} src={props.url} alt={`profile${props.url}`}/>
}

const ImagePopup = (props: { url: string, onClick: () => void }): React.ReactElement => {
  return (
    <div className="popup-wrapper">
      <img onClick={props.onClick} src={`profiles/${props.url}.png`} alt={`profile${props.url}`} className="image-popup normal" />
    </div>
  )
}

const MdImagePopup = (props: { url: string, onClick: () => void }): React.ReactElement => {
  return (
    <div className="popup-wrapper">
      <img
        onClick={props.onClick}
        src={`mds/${props.url}.png`}
        alt={`profile${props.url}`}
        className="image-popup normal"
      />
    </div>
  )
}

interface MdItemProps {
  images: string[]
  text: string
  style: string
  onClick: (arg: string) => void
}

const MdItem = (props: MdItemProps): React.ReactElement => {
  const { images, text, style, onClick } = props

  return (
    <div className="md-item">
      <div className="md-wrapper">
        {images.map(x => {
          return (
            <img
              onClick={() => { onClick(x) }}
              className={`md-image ${style}`}
              src={`mds/${x}.png`}
              alt={`mds${x}`}
              key={x}
            />)
        })}
      </div>
        <div className="md-text">{text}</div>
    </div>
  )
}
