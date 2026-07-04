import './index.css'

const TabItem = props => {
  const {tabDetails, isActive, onClickTab} = props
  const {tabId, displayText} = tabDetails

  const onClick = () => {
    onClickTab(tabId)
  }

  const activeClassName = isActive ? 'active-tab' : ''

  return (
    <li className="tab-item">
      <button
        type="button"
        className={`tab-button ${activeClassName}`}
        onClick={onClick}
      >
        {displayText}
      </button>
    </li>
  )
}

export default TabItem
