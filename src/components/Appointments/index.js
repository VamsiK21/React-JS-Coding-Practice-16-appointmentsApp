// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    appointmentList: [],
    isActive: false,
  }

  onClickedStarredBtn = () => {
    this.setState(prevState => ({
      isActive: !prevState.isActive,
    }))
  }

  onChangeStarImage = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onChangeInputTitle = event => {
    this.setState({
      title: event.target.value,
    })
  }

  onChangeDateInput = event => {
    this.setState({
      date: event.target.value,
    })
  }

  getFilteredList = () => {
    const {appointmentList, isActive} = this.state

    if (isActive) {
      return appointmentList.filter(eachItem => eachItem.isStarred === true)
    }
    return appointmentList
  }

  render() {
    const {title, date, isActive} = this.state

    const starredBtnClassName = isActive ? 'starred-btn active' : 'starred-btn'

    const FilteredList = this.getFilteredList()

    return (
      <div className="bg-container">
        <div className="content-container">
          <div className="top-section">
            <form className="form-container" onSubmit={this.onAddAppointment}>
              <h1 className="heading">Add Appointments</h1>
              <label className="title-text" htmlFor="titleId">
                TITLE
              </label>
              <input
                value={title}
                className="title-input"
                type="text"
                placeholder="Title"
                id="titleId"
                onChange={this.onChangeInputTitle}
              />
              <label className="title-text" htmlFor="dateId">
                DATE
              </label>
              <input
                value={date}
                className="title-input"
                type="date"
                id="dateId"
                onChange={this.onChangeDateInput}
              />
              <button className="add-btn" type="submit">
                Add
              </button>
            </form>
            <img
              className="appoint-image"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr className="hr-line" />
          <div className="starred-container">
            <button type="button" className="appoint-btn">
              Appointments
            </button>
            <button
              onClick={this.onClickedStarredBtn}
              type="button"
              className={starredBtnClassName}
            >
              Starred
            </button>
          </div>
          <ul className="items-container">
            {FilteredList.map(eachItem => (
              <AppointmentItem
                onChangeStarImage={this.onChangeStarImage}
                key={eachItem.id}
                appointmentDetails={eachItem}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
