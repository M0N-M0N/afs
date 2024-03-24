import DatePicker from "react-datepicker";

export function Event({newName, eventName, newDate, eventDate, newFbDate, fbDate, handEvent, buttonName}) {
    const name = {eventName}
    let focusedElement = document.activeElement.id;


    return (
        <div className="addNewEventsCont">
            <div className="event-cont">
                <div className="event-label-row">
                    <div className="event-label-name">Event Name:</div>
                    <div className="event-label-input">
                        <input type='text' placeholder='Enter event name' name="newEventName" id="newEventId"
                               onInput={e => newName(e.target.value)} value={name.eventName}
                               autoFocus={true}
                        />
                    </div>
                </div>
                <div className="event-label-row">
                    <div className="event-label-name">Event Date:</div>
                    <div className="event-label-input">
                        <DatePicker selected={eventDate} onChange={(date) => newDate(date)} minDate={new Date()}/>
                    </div>
                </div>
                <div className="event-label-row">
                    <div className="event-label-name">Deadline for Feedback:</div>
                    <div className="event-label-input">
                        <DatePicker selected={fbDate} onChange={(date) => newFbDate(date)} minDate={new Date()}/>
                    </div>
                </div>
            </div>
            <div className="event-cont-button">
                <button type='button' onClick={(e) => handEvent(eventName, eventDate, fbDate, e)}>
                    {buttonName}
                </button>
            </div>

        </div>
    )
}