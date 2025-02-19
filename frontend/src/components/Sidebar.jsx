import { useContext, useState } from "react";
import { Context } from "../context/context";
import assets from "../assets/assets.js";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

  const loadPreviousPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className="h-[85vh] inline-flex flex-col justify-between bg-[#f0f4f9] p-[10px_15px] rounded-tr-[10px] rounded-br-[10px]">
      <div className="top mt-[15px]">
        <img
          src={assets.menu_icon}
          className="menu block ml-[10px] cursor-pointer w-[30px]"
          alt="menu-icon"
          onClick={() => {
            setExtended((prev) => !prev);
          }}
        />
        {extended ? (
          <div className="recent flex flex-col animate-fadeIn">
            <p className="recent-title mt-[30px] mb-[20px]">Recent</p>
            {prevPrompts.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    loadPreviousPrompt(item);
                  }}
                  className="recent-entry flex items-start gap-[10px] p-[10px] pr-[40px] rounded-full text-[#282828] cursor-pointer hover:bg-[#e2e6eb]"
                >
                  <img src={assets.message_icon} alt="" className="w-[30px]" />
                  <p>{item.slice(0, 18)}...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="bottom flex flex-col">
        {/* Add bottom items here if needed */}
      </div>
    </div>
  );
};

export default Sidebar;
