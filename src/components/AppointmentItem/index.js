// Write your code here
import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, onChangeStarImage} = props
  const {title, date, isStarred, id} = appointmentDetails
  const formatedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
  console.log(formatedDate)

  const isStarredImg = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickedStar = () => {
    onChangeStarImage(id)
  }

  return (
    <li className="list-item-container">
      <div className="star-container">
        <p type="button" className="name-style-btn">
          {title}
        </p>
        <button
          type="button"
          data-testid="star"
          className="star-btn"
          onClick={onClickedStar}
        >
          <img className="star-image" src={isStarredImg} alt="star" />
        </button>
      </div>
      <p className="date-text">{`Date: ${formatedDate}`}</p>
    </li>
  )
}

export default AppointmentItem
