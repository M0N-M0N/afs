import DatePicker from "react-datepicker";

export function Event({newName, eventName, newDate, eventDate, newFbDate, fbDate, handEvent}) {
    return (
        <div className="addNewEventsCont">
            Event Name:
            <input type='text' placeholder='Enter event name' name="newEventName" id="newEventId"
                   onChange={e => newName(e.target.value)} value={eventName}/>
            <br/>
            Event Date:
            <DatePicker selected={eventDate} onChange={(date) => newDate(date)}/>
            <br/>
            Deadline for Feedback:
            <DatePicker selected={fbDate} onChange={(date) => newFbDate(date)}/>
            <br/>
            <button type='button' onClick={(e) => handEvent(eventName, eventDate, fbDate, e)}>Add
                Event
            </button>
        </div>
    )
}