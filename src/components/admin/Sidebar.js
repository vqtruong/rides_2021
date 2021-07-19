import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap';
import { deleteUserByID } from "../../api/UserServices";
import "./styles.css";

export default function Sidebar ({ users, setUsers, setDraggedItem }) {
    useEffect(() => {
    }, [users])

    function handleDeleteUser(id) {
        let newUsers = users.filter((user) => {
            return id !== user.id;
        });
        deleteUserByID(id);
        setUsers(newUsers);
    }

    return (
        <div id="sidebar">
            <h2 className="sidebarHeader"> Users </h2>
            { users.map((user, index) => {
                return <SidebarEntry key={index} user={user} setDraggedItem={setDraggedItem} handleDeleteUser={handleDeleteUser}/>
            })}
        </div>
    )
};

function SidebarEntry ({ user, setDraggedItem, handleDeleteUser }) {
    const [dragging, setDragging] = useState(false);

    function handleDragStart(e) {
        setDraggedItem(user);
        setDragging(true);
    }

    function handleDragEnd(e) {
        setDragging(false);
    }


    return (
        <div className={`sidebarEntry ${dragging ? "dragged" : ""} ${user.assigned ? "assigned" : ""}`} draggable={!user.assigned} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="sidebarEntryName">
                {user.name}
            </div>
            
            <DropdownButton
                    as={ButtonGroup}
                    key={"hi"}
                    id={`dropdown-button-drop`}
                    drop={"right"}
                    variant="light"
                    title={` `}
                >
                <Dropdown.Item eventKey="1">
                    <Link to={`./profile/${user.id}`} className="dropdownItem">
                        <i className="material-icons profile-icon">person</i>Profile
                    </Link>
                    
                </Dropdown.Item>
                <Dropdown.Item eventKey="2">
                    <div className="dropdownItem" onClick={() => { handleDeleteUser(user.id); }} >
                        <i className="material-icons remove-icon">close</i>Delete
                    </div>
                </Dropdown.Item>
                <Dropdown.Divider />
            </DropdownButton>
        </div>
    )
}