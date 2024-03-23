import {useEffect, useState, useRef} from "react";
import {auth, db} from "../firebase_config";
import { getUserData } from "./globalFunctions";
import {collection, getDocs, query, doc, addDoc, setDoc, deleteDoc, orderBy} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import {Overlay} from "./Overlay";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import async from "async";
import {Event} from "./Event";


const OrgEvents = () => {
    const hasUnmounted = useRef(false)
    const userId = getUserData("user")
    let nextId = 0
    const [eventRefresh, setEventRefresh] = useState(0);
    const [myevents, setEvents] = useState([]);
    const [ismyOverlay, setIsMyOverlay] = useState(false)
    const navigate = useNavigate()
    const [addORupdate, setaddORupdate] = useState()

    const handleClickOverlay = (args, e) => {
        setIsMyOverlay(!ismyOverlay);
        return false
    }
    const handAddEvent = (EventName, EventDate, EventFbDate,e) => {
        addEvents(EventName, EventDate, EventFbDate)
        return false
    }

    const handleDeleteEvent = (id, e) => {
        delEvents(id)
        return false
    }

    const handleUpdateEvent = (id, e) => {
        UpdateEventsDiv(id, e)
        return false
    }

    function Events(props){
        const id = props.userdata.eventKey
        const eventName = props.userdata.eventName

        return (
            <div className="event" key={ id } >
                <div className="eventName">{ eventName }</div>
                <div className="eventLinks">
                    <button className="del-button" key="del_{id}" data-key={id}
                            onClick={(e) => handleDeleteEvent(e.target.getAttribute('data-key'), e)}>Delete
                    </button>
                    <button className="del-button" key="edit_{id}" data-key={id}
                            onClick={(e)=>handleUpdateEvent(e.target.getAttribute('data-key'), e)} >Edit</button>
                    <button data-key={id} onClick={() =>navigate('/nominate', {state: {doc_id: id }})}>Nominate</button>


                </div>

            </div>
        )
    }

    function AddNewEventsDiv(props) {
        const [newEventName, setNewEventName] = useState('')
        const [newEventDate, setNewEventDate] = useState(new Date())
        const [newEventFbDate, setNewEventFbDate] = useState(new Date())

        const newDate = (date) => setNewEventDate(date)
        const newFbDate = (date) => setNewEventFbDate(date)
        const newName = (e) => setNewEventName(e)

        return (
            <Event
                newName={newName}
                eventName={newEventName}
                newDate={newDate}
                eventDate={newEventDate}
                newFbDate={newFbDate}
                fbDate={newEventFbDate}
                handEvent={handAddEvent}

            />

            // <div className="addNewEventsCont">
            //     Event Name:
            //     <input type='text' placeholder='Enter event name' name="newEventName" id="newEventId"
            //            onChange={e => setNewEventName(e.target.value)} value={newEventName}/>
            //     <br/>
            //     Event Date:
            //     <DatePicker selected={newEventDate} onChange={(date) => setNewEventDate(date)}/>
            //     <br/>
            //     Deadline for Feedback:
            //     <DatePicker selected={newEventFbDate} onChange={(date) => setNewEventFbDate(date)}/>
            //     <br/>
            //     <button type='button' onClick={(e) => handAddEvent(newEventName, newEventDate, newEventFbDate, e)}>Add
            //         Event
            //     </button>
            // </div>
        )
    }

    function UpdateEventsDiv(props) {
        const [newEventName, setNewEventName] = useState('')
        const [newEventDate, setNewEventDate] = useState(new Date())
        const [newEventFbDate, setNewEventFbDate] = useState(new Date())

        const newDate = (date) => setNewEventDate(date)
        const newFbDate = (date) => setNewEventFbDate(date)
        const newName = (e) => setNewEventName(e)

        return (
            <Event
                newName={newName}
                eventName={newEventName}
                newDate={newDate}
                eventDate={newEventDate}
                newFbDate={newFbDate}
                fbDate={newEventFbDate}
                handEvent={handAddEvent}

            />

            // <div className="addNewEventsCont">
            //     Event Name:
            //     <input type='text' placeholder='Enter event name' name="newEventName" id="newEventId"
            //            onChange={e => setNewEventName(e.target.value)} value={newEventName}/>
            //     <br/>
            //     Event Date:
            //     <DatePicker selected={newEventDate} onChange={(date) => setNewEventDate(date)}/>
            //     <br/>
            //     Deadline for Feedback:
            //     <DatePicker selected={newEventFbDate} onChange={(date) => setNewEventFbDate(date)}/>
            //     <br/>
            //     <button type='button' onClick={(e) => handAddEvent(newEventName, newEventDate, newEventFbDate, e)}>Add
            //         Event
            //     </button>
            // </div>
        )
    }

    const delEvents = (id) => {
        try {
            // console.log(eventName, eventDate, eventFbDuration,userId.uid)
            deleteDoc(doc(db, "Events", id))
                .then((callback)=>{
                    console.log(callback)
                    setEventRefresh( Math.random() )

                })
                .catch(err => console.log("there is an error", err));


        } catch (e) {
            console.error("Error adding document: ", e);
        }


    }

    const addEvents = (eventName, eventDate, eventFbDuration ) => {
        try {
            nextId += 1;
            // console.log(eventName, eventDate, eventFbDuration,userId.uid)

            addDoc(collection(db, "Events"), {
                event_name: eventName,
                event_date: eventDate,
                event_fb_duration: eventFbDuration,
                org_id: userId.uid,
                event_attendee: 0,
                event_timestamp: firebase.firestore.Timestamp.now()
            })
                .then((callback)=>{
                    console.log(callback)
                    setEventRefresh( Math.random() )

                })
                .catch(err => console.log("there is an error", err));

            setIsMyOverlay(!ismyOverlay);

        } catch (e) {
            console.error("Error adding document: ", e);
        }


    }
    // const getEvents = async () => await getDocs(query(collection(db, 'Events')))
    //     .then((events) => {
    //         events.forEach(event => {
    //             setEvents(prevState => [...prevState, {"eventKey":event.id , "eventName": event.data().event_name}]);
    //
    //         })
    //     }).catch(err => console.log("there is an error", err));

    useEffect(() => {
        (async function() {
            try {
                setEvents([])
                const getEventsSnapshot = await getDocs(
                    query(
                        collection(db, 'Events', ),orderBy("event_timestamp", "desc")
                ));

                getEventsSnapshot.forEach((doc) => {
                    // console.log(doc.id,!myevents.find(e => e.eventKey===doc.id))
                    // if(!myevents.find(e => e.eventKey===doc.id) ) {
                    //     setEvents(prevState => [...prevState, {"eventKey":doc.id , "eventName": doc.data().event_name}]);
                    // }
                    setEvents(prevState => [...prevState, {"eventKey":doc.id , "eventName": doc.data().event_name}]);
                })
            } catch (e) {
                console.error(e);
            }
        })();
        //console.log(myevents)
    }, [eventRefresh]);


    const GenerateEvents = () => {
        // let eventNodes =

        return (
            <div className="orgevents">
                <Overlay isOpen={ismyOverlay} onClose={() => setIsMyOverlay(!ismyOverlay)} children={AddNewEventsDiv()}
                         title="Add Event"/><Overlay isOpen={ismyOverlay} onClose={() => setIsMyOverlay(!ismyOverlay)} children={AddNewEventsDiv()}
                                                     title="Add Event"/>
                <h1>Events</h1>
                <div className="eventCont">
                    {
                        myevents.map(function (myevent) {
                            return (
                                <Events userdata={myevent} key={myevent.eventKey}/>
                            )

                        })
                    }
                </div>
                <br/><br/><br/>
                <button className="edit-button" key="add_{id}" onClick={(e) => handleClickOverlay("Add", e)}>Add
                </button>

            </div>
        )
    }
    // useEffect(() => {
    //     //getEvents()
    //     hasUnmounted.current = true;
    //     console.log(hasUnmounted)
    //
    // }, []);

    return (
        <GenerateEvents />
    );
};

export default OrgEvents;