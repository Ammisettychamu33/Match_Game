import {Component} from 'react'
import TabItem from '../TabItem'
import ThumbnailItem from '../ThumbnailItem'
import './index.css'

class MatchGame extends Component {
  constructor(props) {
    super(props)

    const {imagesList} = props

    this.state = {
      activeTabId: 'FRUIT',
      score: 0,
      time: 60,
      isGameOver: false,
      activeImageId: imagesList[0].id,
    }
  }

  componentDidMount() {
    this.startTimer()
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  startTimer = () => {
    this.timerId = setInterval(() => {
      this.setState(prevState => {
        if (prevState.time === 1) {
          clearInterval(this.timerId)
          return {
            time: 0,
            isGameOver: true,
          }
        }

        return {
          time: prevState.time - 1,
        }
      })
    }, 1000)
  }

  onClickTab = tabId => {
    this.setState({
      activeTabId: tabId,
    })
  }

  getRandomImageId = () => {
    const {imagesList} = this.props
    const randomIndex = Math.floor(Math.random() * imagesList.length)
    return imagesList[randomIndex].id
  }

  onClickThumbnail = id => {
    const {activeImageId, score} = this.state

    if (id === activeImageId) {
      this.setState({
        score: score + 1,
        activeImageId: this.getRandomImageId(),
      })
    } else {
      clearInterval(this.timerId)
      this.setState({
        isGameOver: true,
      })
    }
  }

  onPlayAgain = () => {
    clearInterval(this.timerId)

    const {imagesList} = this.props

    this.setState(
      {
        activeTabId: 'FRUIT',
        score: 0,
        time: 60,
        isGameOver: false,
        activeImageId: imagesList[0].id,
      },
      this.startTimer,
    )
  }

  render() {
    const {tabsList, imagesList} = this.props
    const {activeTabId, score, time, isGameOver, activeImageId} = this.state

    const activeImage = imagesList.find(each => each.id === activeImageId)

    const filteredImages = imagesList.filter(
      each => each.category === activeTabId,
    )

    if (isGameOver) {
      return (
        <div className="score-card-container">
          <div className="score-card">
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
              alt="trophy"
              className="trophy"
            />
            <p className="score-text">YOUR SCORE</p>
            <h1 className="final-score">{score}</h1>

            <button
              type="button"
              className="play-again-btn"
              onClick={this.onPlayAgain}
            >
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                alt="reset"
                className="reset-icon"
              />
              PLAY AGAIN
            </button>
          </div>
        </div>
      )
    }

    return (
      <div className="match-game-container">
        <nav className="navbar">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
            alt="website logo"
            className="logo"
          />

          <ul className="nav-items">
            <li className="nav-item">
              <p className="score">
                Score: <span>{score}</span>
              </p>
            </li>

            <li className="nav-item">
              <div className="timer-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                  alt="timer"
                  className="timer-icon"
                />
                <p className="timer">{time} sec</p>
              </div>
            </li>
          </ul>
        </nav>

        <div className="game-container">
          <img src={activeImage.imageUrl} alt="match" className="match-image" />

          <ul className="tabs-container">
            {tabsList.map(each => (
              <TabItem
                key={each.tabId}
                tabDetails={each}
                isActive={each.tabId === activeTabId}
                onClickTab={this.onClickTab}
              />
            ))}
          </ul>

          <ul className="thumbnails-container">
            {filteredImages.map(each => (
              <ThumbnailItem
                key={each.id}
                imageDetails={each}
                onClickThumbnail={this.onClickThumbnail}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default MatchGame
