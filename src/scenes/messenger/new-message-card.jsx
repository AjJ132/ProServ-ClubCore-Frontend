import React, { useState, useEffect } from 'react';
import { create_direct_message_thread, get_users_to_message, get_users_to_message_filtered } from '../../services/messenger-api-service';

const NewMessageCard = ({onClose}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

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
        console.log("handleSelectUser");
        setSelectedUsers([...selectedUsers, user]);

        // remove user from search results
        setSearchResults(searchResults.filter(result => result.user_ID !== user.user_ID));

        setShowDropdown(false);
    };

    const handleRemoveUser = (user) => {
        console.log("handleRemoveUser");
        setSelectedUsers(selectedUsers.filter(selectedUser => selectedUser.user_ID !== user.user_ID));

        // add user back to search results
        setSearchResults([...searchResults, user]);
    };

    const hanleCreateConversation = async () => {
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
            } else {
                alert("Something went wrong. Please try again.");
            }
            
        } else {
            //group conversation
            //TODO
            alert("Group conversations are not yet supported.");
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
                <div className='modal-footer'>
                    <button className="close-button">Close</button>
                    <button className="submit-button" onClick={hanleCreateConversation}>Create</button>
                </div>
            </div>
        </div>
    );
};

export default NewMessageCard;
