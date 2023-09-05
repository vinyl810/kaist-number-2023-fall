import './detail.css'
import {contentData} from '../../content'
import * as React from 'react'

export interface DetailContentProp {
  showDetail: string | null | 'init'
}

export const DetailContent = (props: DetailContentProp) => {
  const {showDetail} = props

  const [showPopup, setShowPopup] = React.useState<string | null>(null)
  const [showMdPopup, setShowMdPopup] = React.useState<string | null>(null)

  const getTitle = (showDetail: string | null | 'init') => {
    switch (showDetail) {
      case 'synopsis': 
        return '시놉시스';
      case 'cast':
        return 'CAST';
      case 'numbers':
        return 'NUMBERS';
      case 'patron':
        return 'MD 및 후원';
      default:
        return '';
    }
  }

  const getContent = (showDetail: string | null | 'init') => {
    switch (showDetail) {
      case 'cast':
        return (
          <div className="detail-casts">
            {contentData.cast.map(x => {
              return (
                <ImageItem 
                  onClick={() => setShowPopup(x.url)}
                  url={`profiles/${x.url}.png`} 
                  style={x.style}
                />
              )
            })}
          </div>
        )
      case 'numbers':
        return contentData.numbers.map(x => {
          return (<div className="number-item">
            <div className='number-head'>{x.head}</div>
            <div className='number-title'>{x.title}</div>
            <div className='number-info'>{x.info}</div>
          </div>)
        })
      case 'synopsis':
        return contentData.synopsis.map(x => <div className={`detail-sentence ${x.style}`}>{x.text}</div>)
      case 'patron':
        return (
          <div className='detail-mds'>
            {contentData.patron.mds.map(x => <MdItem images={x.images} text={x.text} style={x.style} onClick={setShowMdPopup} />)}
            <div className='detail-divider' />
            {contentData.patron.descriptions.map(x => {
              return (
                <div className={`md-descr ${x.style}`}>{x.text}</div>
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
      {showPopup && <ImagePopup url={showPopup} onClick={() => {setShowPopup(null)}} />}
      {showMdPopup && <MdImagePopup url={showMdPopup} onClick={() => {setShowMdPopup(null)}} />}
      <div className="detail-title">
        {getTitle(showDetail)}
      </div>
      <div className="detail-text">
        {getContent(showDetail)}
      </div>
    </div>
  );
}

const ImageItem = (props: {url: string, style: string, onClick: () => void}) => {
  return <img onClick={props.onClick} className={`detail-image ${props.style}`} src={props.url} alt={`profile${props.url}`}/>
}

const ImagePopup = (props: {url: string, onClick: () => void}) => {
  return (
    <div className="popup-wrapper">
      <img onClick={props.onClick} src={`profiles/${props.url}.png`} alt={`profile${props.url}`} className="image-popup normal" />
    </div>
  )
}

const MdImagePopup = (props: {url: string, onClick: () => void}) => {
  return (
    <div className="popup-wrapper">
      <img onClick={props.onClick} src={`mds/${props.url}.png`} alt={`profile${props.url}`} className="image-popup normal" />
    </div>
  )
}

const MdItem = (props: {images: Array<string>, text: string, style: string, onClick: (arg: string) => void}) => {
  return (
    <div className="md-item">
      <div className="md-wrapper">
        {props.images.map(x => {
          return <img onClick={() => props.onClick(x)} className={`md-image ${props.style}`} src={`mds/${x}.png`} alt={`mds${x}`}/>
        })}
      </div>
        <div className="md-text">{props.text}</div>
    </div>
  )
}