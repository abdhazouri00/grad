// import React from "react";
import pdf from "/output5.pdf";

// const View = () => {
//   return (
//     <embed
//       src={pdf}
//       type="application/pdf"
//       width="80%"
//       height="780px"
//       scale="tofit"
//     />
//   );
// };

// export default View;

import React from "react";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";

function View() {
  const [chatId, setChatId] = useState("");
  const [newChat, setNewChat] = useState(false);

  function getChat(chat) {
    setChatId(chat.id);
  }

  function plusChat() {
    setNewChat(true);
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex flex-row md:w-[55%]">
        <Sidebar fetchChat={getChat} activateNewChat={plusChat} />
        <Chat fetchChatId={chatId} startNewChat={newChat} />
      </div>
      <div className="flex justify-center">
        <div className="w-[600px] h-[600px] overflow-hidden my-12 md:my-0">
          <embed
            src={pdf}
            type="application/pdf"
            className="w-[650px] h-[800px] scale-[0.9] origin-top-left"
          />
        </div>
      </div>
    </div>
  );
}

export default View;