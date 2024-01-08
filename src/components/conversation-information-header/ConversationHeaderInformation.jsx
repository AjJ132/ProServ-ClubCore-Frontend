import React, { useState, useEffect } from "react";
import "./ConversationHeaderInformation.css";
import { get_conversation_members } from "../../services/messenger-api-service";

const ConversationHeaderInformation = ({conversation_ID, conversationType}) => {
  const [c_Title, setConversationTitle] = useState("");
  const [c_ID, setConversation_ID] = useState("");
  const [c_Type, setConversationType] = useState("");
  const [c_Members, setConversationMembers] = useState([]);


  useEffect(() => {
    setConversationType(conversationType);
    setConversation_ID(conversation_ID);

    const getConversationMembers = async () => {
      const membersResponse = await get_conversation_members(conversation_ID, conversationType);

      if (membersResponse !== false){
        setConversationMembers(membersResponse);
        console.log("conversation members: ", membersResponse);
      } else {
        console.log("Error getting conversation members");
      }
    };
    getConversationMembers();
  }, []);



  return;
  <div>
    <h1>ConversationHeaderInformation</h1>
  </div>;
};

export default ConversationHeaderInformation;
