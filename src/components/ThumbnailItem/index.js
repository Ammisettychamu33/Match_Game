import './index.css'

const ThumbnailItem = props => {
  const {imageDetails, onClickThumbnail} = props
  const {id, thumbnailUrl} = imageDetails

  const onClickImage = () => {
    onClickThumbnail(id)
  }

  return (
    <li className="thumbnail-item">
      <button type="button" className="thumbnail-button" onClick={onClickImage}>
        <img src={thumbnailUrl} alt="thumbnail" className="thumbnail-image" />
      </button>
    </li>
  )
}

export default ThumbnailItem
