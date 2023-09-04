import './style.css'
import {contentData} from '../../content'

export interface DetailContentProp {
  showDetail: string | null | 'init'
}

export const DetailContent = (props: DetailContentProp) => {
  const {showDetail} = props

  const getTitle = (showDetail: string | null | 'init') => {
    switch (showDetail) {
      case 'synopsis': 
        return '시놉시스';
      case 'cast':
        return 'CAST';
      case 'numbers':
        return '넘버 목록';
      case 'patron':
        return '후원';
      default:
        return '';
    }
  }

  return (
    <div className="detail-content">
      <div className="detail-title">
        {getTitle(showDetail)}
      </div>
      <div className="detail-text">
        {contentData.synopsis.map(x => <div className="detail-sentence">{x.text}</div>)}
      </div>
    </div>
  );
}