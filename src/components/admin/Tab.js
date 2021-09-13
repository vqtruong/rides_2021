import React from "react";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import buttonStyle from "./AwesomeButtonStyles.css";
import CarList from "../car/CarList";
import Sidebar from "./Sidebar";
import User from "./User";
import "./styles.css";

export default function Tab () {


    return 
        <div id="main">
            <Sidebar users={users} 
                        setDraggedItem={setDraggedItem} 
                        setUsers={setUsers} 
                        showAddUserModal={showAddUserModal}
                        setShowUserProfile={setShowUserProfile}
                        setUserProfile={setUserProfile}/>

            <div className="adminEdit">
                <div className="buttonRow">
                    <AwesomeButton type="secondary" className="special-btn" style={buttonStyle} onPress={addCar}>
                        <i className="material-icons">add</i>Add Car
                    </AwesomeButton>

                    <AwesomeButton type="secondary" className="special-btn" style={buttonStyle} onPress={resetCars}>
                        <i className="material-icons">refresh</i>Reset 
                    </AwesomeButton>

                    <AwesomeButton type="secondary" className="special-btn" style={buttonStyle} onPress={handleAutogenerate}>
                        <i className="material-icons">bolt</i>Autogenerate 
                    </AwesomeButton>

                    <AwesomeButton type="secondary" className="special-btn" style={buttonStyle} onPress={showDefaultModal}>
                        <i className="material-icons default-icon">settings</i>Defaults 
                    </AwesomeButton>

                    <AwesomeButton type="primary" className="special-btn" style={buttonStyle} onPress={submit}>
                        Submit Cars
                    </AwesomeButton>

                    <AwesomeButton type="primary" className="special-btn" style={buttonStyle} onPress={handleTest}>
                        Test
                    </AwesomeButton>
                </div>

                <CarList cars={cars} 
                            setCars={setCars} 
                            draggedItem={draggedItem} 
                            assign={assign} 
                            deassign={deassign} 
                            users={users} 
                            showModal={showConfirmDriverModal} 
                            dropDriver={dropDriver}
                            timeOptions={timeOptions}/>
            </div>
        </div>
    ;
}