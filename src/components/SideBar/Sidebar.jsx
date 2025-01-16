import { de } from "@faker-js/faker";
import "../../styles/Sidebar.css";
import SearchBar from "./SearchBar";
import ChatList from "./../ChatList";

const Sidebar = ({ onSelectChat }) => {
  return (
    <div className="sidebar">
      <div className="sidebar__chats">{/* <ChatList /> */}</div>
    </div>
  );
};

export default Sidebar;
