import React from 'react'
import './Input.css'
import { connect } from 'react-redux'
import { addReminder, deleteReminder, clearReminders } from '../actions'
import moment from 'moment'

class Input extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            dueDate: ''
        }
    }

    renderReminders() {
        const { reminders } = this.props
        return (
            <ul className="list-group col-sm-4" id="list">
                {
                    reminders.map(reminder => {
                        return (
                            <li id="listitem" key={reminder.id} className="list-group-item">
                                <div className="list-item">
                                    <div>{ reminder.text }</div>
                                    <div><i>{ moment(new Date(reminder.dueDate)).fromNow() }</i></div>
                                </div>
                                <div 
                                    className="list-item delete-button" 
                                    onClick={() => this.deleteReminder(reminder.id)}>
                                    &#10006;
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

    render() {
        return (
            <div className="form-inline">
                <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control"
                        placeholder="Enter text for the reminder" 
                        onChange={event => this.setState({text: event.target.value})} />
                    <input 
                        type="datetime-local"
                        className="form-control"
                        onChange={event => this.setState({dueDate: event.target.value})} />
                </div>
                <button 
                    className="btn btn-success" 
                    onClick={() => this.addReminder()}>Submit
                </button>
                <button
                    className="btn btn-danger"
                    onClick={() => this.props.clearReminders()}>
                    Clear All Reminders
                </button>
                { this.renderReminders() }
            </div>
        )
    }

    addReminder() {
        this.props.addReminder(this.state.text, this.state.dueDate)
    }

    deleteReminder(id) {
        this.props.deleteReminder(id)
    }
}

export default connect((state) => { return {reminders: state }}, { addReminder, deleteReminder, clearReminders })(Input)
