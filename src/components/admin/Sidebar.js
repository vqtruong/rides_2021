import React, { useEffect, useState } from "react";
import { Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap';
import { deleteUserByID } from "../../api/UserServices";
import "./styles.css";

export default function Sidebar ({ users, setUsers, setDraggedItem, showAddUserModal, showUserProfile, setShowUserProfile, setUserProfile }) {
    useEffect(() => {
        
    }, [users])

    const [sortUser, setSortUser] = useState("Sort By: Date Added");
    function handleChangeSort(input) {
        const sortType = input.target.value;
        if (sortUser === sortType) return;

        setSortUser(sortType);

        if (sortType === "Sort By: Name") {
            const sorted = [...users].sort((first, second) => {
                if (first.name < second.name) {
                    return -1;
                }
                else if (first.name > second.name) {
                    return 1;
                }
                return 0;
            });
            setUsers(sorted);
        }
        else if (sortType === "Sort By: Pickup Location") {
            const sorted = [...users].sort((first, second) => {
                if (first.pickupLocation < second.pickupLocation) {
                    return -1;
                }
                else if (first.pickupLocation > second.pickupLocation) {
                    return 1;
                }
                return 0;
            });
            setUsers(sorted);
        }
        else if (sortType === "Sort By: Date Added") {
            const sorted = [...users].sort((first, second) => {
                if (first.date < second.date) {
                    return -1;
                }
                else if (first.date > second.date) {
                    return 1;
                }
                return 0;
            });
            setUsers(sorted);
        }
    }

    function handleDeleteUser(ID) {
        let newUsers = users.filter((user) => {
            return ID !== user.ID;
        });
        deleteUserByID(ID);
        setUsers(newUsers);
    }

    return (
        <div id="sidebar">
            <div className="sidebarHeader">
                <h2 className="sidebarHeader"> Users </h2>
                <i className="material-icons addUser" onClick={showAddUserModal}>add</i> 
            </div>

            <select value={sortUser} onChange={handleChangeSort}>
                <option>Sort By: Name</option>
                <option>Sort By: Pickup Location</option>
                <option selected>Sort By: Date Added</option>
            </select>
                
            { users.map((user, index) => {
                return <SidebarEntry key={index} 
                                        user={user} 
                                        setDraggedItem={setDraggedItem} 
                                        handleDeleteUser={handleDeleteUser}
                                        showUserProfile={showUserProfile}
                                        setShowUserProfile={setShowUserProfile}
                                        setUserProfile={setUserProfile}
                                        />
            })}
        </div>
    )
};

function SidebarEntry ({ user, setDraggedItem, handleDeleteUser, setShowUserProfile, setUserProfile }) {
    const [dragging, setDragging] = useState(false);
    const [tapped, setTapped] = useState(false);

    function handleDragStart(e) {
        setDraggedItem(user);
        setDragging(true);
    }

    function handleDragEnd(e) {
        setDragging(false);
    }

    function userProfileClicked() {
        setUserProfile(user);
        setShowUserProfile(true);
    }

    function entryClicked() {
        setTapped(!tapped);
    }

    return (
        <div className={`sidebarEntry ${dragging ? "dragged" : ""} ${user.assigned ? "assigned" : ""}`} 
                draggable={!user.assigned} 
                onDragStart={handleDragStart} 
                onDragEnd={handleDragEnd}>
            <span className="leftUserEntry" onClick={entryClicked}>
                <span className={`${tapped ? "userSelectedBox userSelected" : "userSelectedBox"}`}></span>
                <div className="sidebarEntryName">
                    {user.name}
                </div>
            </span>
                
            
            
            <DropdownButton
                    as={ButtonGroup}
                    key={"hi"}
                    id={`dropdown-button-drop`}
                    drop={"right"}
                    variant="light"
                    title={` `}>
                <Dropdown.Item eventKey="1" onClick={userProfileClicked}>
                    <div className="dropdownItem">
                        <i className="material-icons profile-icon">person</i>Profile
                    </div>                        
                </Dropdown.Item>

                <Dropdown.Item eventKey="2" onClick={() => { handleDeleteUser(user.ID); }}>
                    <div className="dropdownItem" >
                        <i className="material-icons remove-icon">delete</i>Delete
                    </div>
                </Dropdown.Item>
                <Dropdown.Divider />
            </DropdownButton>

        </div>
    )
}


