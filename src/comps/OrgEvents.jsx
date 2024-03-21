import {useEffect, useState} from "react";
import {auth, db} from "../firebase_config";
import { getUserData } from "./globalFunctions";
import {collection, getDocs, getDoc, query, doc,  addDoc, deleteDoc, updateDoc,getFirestore} from "firebase/firestore";

const handleClick = (args, e) => {
    return false
}



const eventCont = document.querySelector("eventCont")

function Events(props){
    const id = props.userdata.eventKey
    const eventName = props.userdata.eventName

    return (
        <div className="event" key={ id }>
            <div className="eventName">{ eventName }</div>
            <div className="eventLinks">
                <button>Delete</button>
                <button>Edit</button>
                <button onClick={(e) => handleClick("Add", e)}>Add</button>

            </div>

        </div>
    )
}

function renderEvents(doc) {
    console.log(doc.data().event_name)
    let eventdiv = document.createElement("div")
    let eventNamediv = document.createElement("div")
    let eventLinksdiv = document.createElement("div")
    let addButton = document.createElement("button")
    let editButton = document.createElement("button")
    let delButton = document.createElement("button")

    eventdiv.setAttribute("className", "event")
    eventNamediv.setAttribute("className", "eventName")
    eventLinksdiv.setAttribute("className", "eventLinks")

    eventNamediv.textContent = doc.data().event_name

    eventdiv.appendChild(eventNamediv)
    eventdiv.appendChild(eventLinksdiv)
    eventLinksdiv.appendChild(addButton)
    eventLinksdiv.appendChild(editButton)
    eventLinksdiv.appendChild(delButton)

    eventCont.appendChild(eventdiv);

    //renders the event listings

    // return (
    //     <div className="event" key={doc}>
    //         <div className="eventName">{doc.data().event_name }</div>
    //         <div className="eventLinks">
    //             <button>Delete</button>
    //             <button>Edit</button>
    //             <button onClick={(e) => handleClick("Add", e)}>Add</button>
    //
    //         </div>
    //
    //     </div>
    // )

}

const OrgEvents = () => {
    const user = getUserData("user")
    let nextId = 0;
    const [myevents, setEvents] = useState([]);

    useEffect(() => {
        getDocs(query(collection(db, 'Events')))
            .then((events) => {
                events.forEach(event => {
                    // let tempevent = renderEvents(event);
                    // setEvents([
                    //     ...myevents,
                    //     { id: nextId++, tempevent }
                    // ])

                    //renderEvents(event)

                    setEvents([
                        ...myevents,
                        {"eventKey":event.id , "eventName": event.data().event_name}
                    ])
                    //myevents.push({"eventKey":event.id , "eventName": event.data().event_name} )

                })


            }).catch(err => console.log("there is an error", err));

    }, []);



    //console.log(myevents)

    // db.collection("Events").get().then((snapshot) => {
    //     console.log(snapshot.docs)
    //     // snapshot.docs.forEach(doc => {
    //     //     events.push(renderEvents(doc));
    //     // })
    //
    // })




    return (
        <div className="orgevents">
            <h1>Events</h1>
            <div className="eventCont" />
            {
                myevents.map(function (myevent) {
                    return (
                        <Events userdata={myevent} />
                    )
                    
                })
            }

        </div>
    );
};

export default OrgEvents;