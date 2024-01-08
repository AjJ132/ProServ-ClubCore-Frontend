import React, { useState, useEffect } from 'react';
import { create_direct_message_thread, create_group_conversation, get_users_to_message, get_users_to_message_filtered } from '../../services/messenger-api-service';

const NewMessageCard = ({onClose}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [hasMultipleUsersSelected, setHasMultipleUsersSelected] = useState(false);
    const [newGroupName, setNewGroupName] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);

    useEffect(() => {
        console.log("init fetch users");

        const fetchUsers = async () => {
            const fetchedUsers = await get_users_to_message();

            // remove users that are already selected //TODO

            // set search results to all users
            setSearchResults(fetchedUsers);

            return;
        };

        fetchUsers();

    }, []);
            

    

    const handleSelectUser = (user) => {
        const updatedSelectedUsers = [...selectedUsers, user];
    
        setSelectedUsers(updatedSelectedUsers);
    
        // remove user from search results
        setSearchResults(searchResults.filter(result => result.user_ID !== user.user_ID));
    
        // determine if multiple users are selected
        const multipleUsersSelected = updatedSelectedUsers.length > 1;
        setHasMultipleUsersSelected(multipleUsersSelected);
    
        console.log(updatedSelectedUsers);
    
        if (multipleUsersSelected) {
            console.log("multiple users selected");
        } 
    
        setShowDropdown(false);
    };
    

    const handleRemoveUser = (user) => {
        console.log("handleRemoveUser");
        setSelectedUsers(selectedUsers.filter(selectedUser => selectedUser.user_ID !== user.user_ID));

        // add user back to search results
        setSearchResults([...searchResults, user]);
    };

    const handleCreateConversation = async () => {
        console.log("hanleCreateConversation");

        //first check if there are users selected
        if (selectedUsers.length === 0) {
            alert("Please select at least one user to create a conversation with.");
            return;
        }
        //determine if this is a group conversation or direct message
        if (selectedUsers.length === 1) {
            //direct message
            var response = await create_direct_message_thread(selectedUsers[0].user_ID);

            if (response === true){
                onClose();
            } else if (response === 409) {
                alert("A conversation with this user already exists.");
            } else {
                alert("Something went wrong. Please try again.");
            }
            
        } else {
            //group conversation
            //check group name
            if (newGroupName === '') {
                alert("Please enter a group name.");
                return;
            }

            //ensure multiple users are selected //Should never be false
            if (selectedUsers.length < 2) {
                alert("Please select at least two users to create a group conversation.");
                return;
            }

            //create group conversation
            const payload = {
                Creator_ID: sessionStorage.getItem('user_ID'),
                GroupName: newGroupName,
                IsPrivate: isPrivate,
                User_IDs: selectedUsers.map(user => user.user_ID)
            }

            const response = await create_group_conversation(payload);

            if (response === false){
                alert("Something went wrong. Please try again.");
                return;
            }
            else{
                const newGroup = response;

                console.log(newGroup);
                onClose();
            }
        }

    }


    return (
        <div className="modal-frame">
            <div className="modal-content new-conversation-modal-container">
                <div className="w-full">
                    <div className="new-message-card-header pl-6 pr-6">
                        <h2>New Conversation</h2>
                    </div>
                    <div className="modal-body pl-6 pr-6 mt-2">
                        <div className="flex flex-col gap-0 w-full mt-4 relative">
                            <p>Select people to add to your new conversation</p>
                            <input 
                                type="text" 
                                placeholder="Search" 
                                className="w-full" 
                                value={searchTerm}
                                onFocus={() => setShowDropdown(true)}
                                onBlur={() => {
                                    // Delay the execution of hiding the dropdown
                                    setTimeout(() => setShowDropdown(false), 100);
                                }}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setShowDropdown(true);
                                }}
                            />
                            {
                                showDropdown && (
                                    <div className="dropdown-menu absolute w-full z-10">
                                        {searchResults.length > 0 ? (
                                            searchResults.map(user => (
                                                <div className="dropdown-menu-row" key={user.user_ID} onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleSelectUser(user);
                                                }}>
                                                    <img src="https://via.placeholder.com/25" alt={user.name} />
                                                    <p>{user.name}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="no-users-message">
                                                <p>There are no users to select from.</p>
                                            </div>
                                        )}
                                    </div>
                                )
                            }
                        </div>
                        <div className="selected-users-list">
                            {selectedUsers.length > 0 ? (
                                selectedUsers.map(user => (
                                    <div className="selected-user-row user-remove-button" key={user.user_ID}>
                                        <img src="https://via.placeholder.com/25" alt={user.Name} />
                                        <p>{user.name}</p>
                                        <button className="ml-auto" aria-label="Remove" onClick={() => handleRemoveUser(user)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                                <line x1="6" y1="6" x2="18" y2="18"></line>
                                            </svg>
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="no-users-message">
                                    <p>No users selected.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                { hasMultipleUsersSelected ? ((
                    <div className="flex flex-row w-full justify-start p-6 gap-6">
                        <div className="flex flex-col gap-0 content-start">
                            <p>Group Name</p>
                            <input type="text" placeholder="Group Name" value={newGroupName} onChange={(e) => setNewGroupName(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-0 content-start ml-6">
                            <p>Private</p>
                            <label className="switch">
                                <input type="checkbox" onChange={(e) => setIsPrivate(e.target.checked)} />
                                <span className="slider round"></span>
                            </label>
                        </div>
                    </div>
                )) : ((
                    <>

                    </>
                ))}
                <div className='modal-footer'>
                    <button className="close-button" onClick={onClose}>Close</button>
                    { hasMultipleUsersSelected ? ((
                        <button className="submit-button" onClick={handleCreateConversation}>Create Group</button>
                    )) : ((
                        <button className="submit-button" onClick={handleCreateConversation}>Create</button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewMessageCard;
