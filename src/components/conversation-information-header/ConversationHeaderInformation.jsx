import React, { useState, useEffect } from "react";
import "./ConversationHeaderInformation.css";
import { get_conversation_members } from "../../services/messenger-api-service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import ConversationInformationCard from "../conversation-information-card/ConversationInformationCard";


const ConversationHeaderInformation = ({conversationTitle, conversation_ID, conversationType}) => {
  const [c_Title, setConversationTitle] = useState("");
  const [c_ID, setConversation_ID] = useState("");
  const [c_Type, setConversationType] = useState("");
  const [c_Members, setConversationMembers] = useState([]);

  const [showInfoCard, setShowInfoCard] = useState(false);

  const handleInformationButtonClick = () => {
    setShowInfoCard(!showInfoCard);
  }


  useEffect(() => {
    setConversationType(conversationType);
    setConversation_ID(conversation_ID);
    setConversationTitle(conversationTitle);

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





  return(
  <>
    <div className="conversation-header-container">
      <h2>{c_Title}</h2>
      <div className="conversation-info-button">
        <FontAwesomeIcon icon={faCircleInfo} size="xl" onClick={handleInformationButtonClick}/>
      </div>
    </div>
    {showInfoCard && <ConversationInformationCard /> }
  </>
)};

export default ConversationHeaderInformation;
