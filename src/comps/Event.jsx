import DatePicker from "react-datepicker";

export function Event({newName, eventName, newDate, eventDate, newFbDate, fbDate, handEvent, buttonName}) {
    const name = {eventName}
    let focusedElement = document.activeElement.id;


    return (
        <div className="addNewEventsCont">
            Event Name:
            <input type='text' placeholder='Enter event name' name="newEventName" id="newEventId"
                   onInput={e => newName(e.target.value)} value={name.eventName}
                   autoFocus={true}
            />
            <br/>
            Event Date:
            <DatePicker selected={eventDate} onChange={(date) => newDate(date)} minDate={new Date()}/>
            <br/>
            Deadline for Feedback:
            <DatePicker selected={fbDate} onChange={(date) => newFbDate(date)}  minDate={new Date()}/>
            <br/>
            <button type='button' onClick={(e) => handEvent(eventName, eventDate, fbDate, e)}>
                {buttonName}
            </button>
        </div>
    )
}