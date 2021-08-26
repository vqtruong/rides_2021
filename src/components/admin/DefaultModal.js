import React, { useState, useEffect } from "react";
import { Modal, Button, Collapse } from 'react-bootstrap';
import List from 'react-smooth-draggable-list';
import { addTime } from "../../api/TimeServices";
import "./styles.css";

export default function DefaultModal({showDefaults, setShowDefaults, handleCloseDefaults, timeOptions, setTimeOptions, locations, setLocations}) {
    // FOR TIME
    const [showTimes, setShowTimes] = useState(false);    
    const [tempTimeIndexes, setTempTimeIndexes] = useState([]);

    function handleOnTimeReorder(indexes) {
        setTempTimeIndexes(indexes);
    }

    const [addTimeText, setAddTimeText] = useState("");
    function handleTimeChange(event) {
        setAddTimeText(event.target.value);
    }

    function handleAddTime(event) {
        event.preventDefault(); 
        if (addTimeText !== "") { 
            const newID = addTime({name: addTimeText, order: timeOptions.length});
            setTimeOptions(timeOptions.concat({name: addTimeText, order: timeOptions.length, _id: newID}));
            setTempTimeIndexes(tempTimeIndexes.concat(timeOptions.length)); 
            setAddTimeText("");
        }
    }

    function handleDeleteTime(id) {
        const newTimeOptions = timeOptions.filter((time) => {
            return time._id != id;
        });
        console.log(newTimeOptions);
        setTimeOptions(newTimeOptions)
    }
    

    // FOR LOCATIONS
    const [showPickups, setShowPickups] = useState(false);
    const [tempLocationIndexes, setTempLocationIndexes] = useState([]);

    function handleOnLocationReorder(indexes) {
        setTempLocationIndexes(indexes);
    }

    const [addLocationText, setAddLocationText] = useState("");
    function handleLocationChange(event) {
        setAddLocationText(event.target.value);
    }

    function handleAddLocation(event) {
        event.preventDefault(); 
        if (addLocationText !== "") { 
            setTempLocationIndexes(tempLocationIndexes.concat(locations.length)); 
            setLocations(locations.concat(addLocationText));
            setAddLocationText("");
        }
    }

    // GENERAL
    function handleClose() {
        setShowDefaults(false);
        setAddTimeText("");
        setAddLocationText("");
        setShowTimes(false);
        setShowPickups(false);
    }

    // TO DO: Update backend
    function handleModalSubmit() {
        handleClose();
        setTempTimeIndexes(timeOptions.map((option, index) => { return index; }));
        setTimeOptions(tempTimeIndexes.map((index) => { return timeOptions[index].name; }));
        setLocations(tempLocationIndexes.map((index) => { return locations[index]; }));
        setTempLocationIndexes(locations.map((option, index) => { return index; }));
    }

    useEffect(() => {
        const newTempTimeIndexes = timeOptions.map((option, index) => {
            return index;
        })
        setTempTimeIndexes(newTempTimeIndexes);

        const newTempLocationIndexes = timeOptions.map((option, index) => {
            return index;
        })
        setTempLocationIndexes(newTempLocationIndexes); 

        console.log(timeOptions);
    }, [timeOptions]);

    return <Modal show={showDefaults} onHide={handleCloseDefaults}>
        <Modal.Header closeButton>
            <Modal.Title className="modalTitle"> Defaults </Modal.Title>
        </Modal.Header>

        <Modal.Body >
            <div className="section">
                <div className="sectionTitle noSelect" 
                        onClick={() => setShowTimes(!showTimes)} 
                        aria-controls="example-collapse-text" 
                        aria-expanded={showTimes}>
                    <h5>Pickup Times</h5>
                    { !showTimes 
                    ? 
                        <i className="material-icons default-icon noSelect">expand_more</i> 
                    :
                        <i className="material-icons default-icon noSelect">expand_less</i>
                    }
                    
                </div>

                <Collapse in={showTimes}>
                    <div>
                        <form onSubmit={handleAddTime}>
                            <div >
                                <input type="text" 
                                        placeholder="+ Add Time"
                                        value={addTimeText}
                                        onChange={handleTimeChange}/>
                            </div>
                        </form>
                        <div>
                            <List rowHeight={30} rowWidth={800} onReOrder={handleOnTimeReorder} className="">  
                                  
                                { timeOptions.map(time => 
                                    <List.Item>
                                        <div className="listEntry">
                                            <i className="material-icons hover-only drag-indicator">drag_indicator</i>  
                                            <span className="rightListEntry">
                                                <span className="listEntryText">{time.name}</span> 
                                                <i className="material-icons clearTime" onClick={() => { handleDeleteTime(time._id)} }>clear</i>
                                            </span> 
                                                
                                        </div>
                                    </List.Item>
                                )}
                            </List>
                        </div>
                    </div>
                </Collapse>
            </div>

            <div className="section">
                <div className="sectionTitle noSelect" 
                        onClick={() => setShowPickups(!showPickups)} 
                        aria-controls="example-collapse-text" 
                        aria-expanded={showPickups}>
                    <h5>Pickup Locations</h5>
                    { !showPickups 
                    ? 
                        <i className="material-icons default-icon noSelect">expand_more</i> 
                    :
                        <i className="material-icons default-icon noSelect">expand_less</i>
                    }
                    
                </div>

                <Collapse in={showPickups}>
                    <div>
                        <form onSubmit={handleAddLocation}>
                            <div >
                                <input type="text" 
                                        placeholder="+ Add Location"
                                        value={addLocationText}
                                        onChange={handleLocationChange}/>
                            </div>
                        </form>
                        <List rowHeight={30} rowWidth={800} onReOrder={handleOnLocationReorder} className="timeList">
                                
                                
                        { locations.map(location => 
                            <List.Item> 
                                <div className="listEntry">
                                    <span >{location}</span> 
                                    <i className="material-icons hover-only">drag_indicator</i> 
                                </div>
                                    
                            </List.Item>
                        )}
                        </List>
                    </div>
                </Collapse>
            </div>
                
        </Modal.Body>

        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="success" onClick={handleModalSubmit}>
                Update
            </Button>
        </Modal.Footer>
    </Modal>
}

// function ListOption({time}) {
//     function handleDeleteTime(event) {
//         event.preventDefault();
//     }

//     useEffect(() => {
//     }, [])

//     return <List.Item> 
//         <div className="listEntry">
//             <i className="material-icons clearTime" onClick={handleDeleteTime}>clear</i> 
//             <span className="listEntryText">{time.name}</span> 
//         </div>
//     </List.Item>
// }