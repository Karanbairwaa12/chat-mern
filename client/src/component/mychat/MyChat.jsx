import React, { useEffect, useState, useRef } from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import "./mychat.css";
import axios from "axios";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BinaryImage from "../BinaryImage";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { BsEmojiSmile } from "react-icons/bs";

const MyChat = ({
  userData,
  selectedChat,
  setChats,
  user,
  socket,
  handleProfile,
}) => {
  // console.log("this is arpic",socket,selectedChat)
  const [loggedUser, setLoggedUser] = useState([]);
  const [inputMsg, setInputMsg] = useState("");
  const [message, setMessage] = useState({ data: [] });
  const [dropDown, setdropDown] = useState(false);

  const [isRemoveMessage, setIsRemovemessage] = useState(false);
  const [index, setIndex] = useState(0);
  const [showEmoji, setShowEmoji] = useState(false);
  // const [socketConnected, setSocketConnected] = useState(false)

  let selectedChatCompare;

  // console.log("mychat",socket)
  const chatBodyRef = useRef();
  // console.log("I dont want this",user)
  const myUser = user;
  // console.log("myUser",myUser)
  //  console.log("fetche message",message)
  // console.log("data:",userData, selectedChat, chats, user,socket,chatId)

  const handleSubmit = (event) => {
    setInputMsg(event.target.value);
    // console.log("handleSubmt",message)
  };

  const handleContextMenu = (e, item, i) => {
    e.preventDefault();
    // console.log("this is handlecontextMenu:",item)
    setIsRemovemessage(true);
    setIndex(i);
  };

  const fetchMessages = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userData.accessToken}`,
        },
      };

      const response = await axios.get(
        `http://localhost:8082/message/${selectedChat._id}`,
        config
      );
      const responseData = response.data;

      // console.log("this is the message I want", responseData);

      setMessage({ data: responseData });
      // console.log("responseData:",responseData)
    } catch (err) {
      console.log(err);
    }
  };

  const fetchChats = async () => {
    // console.log("user",myUser)
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userData.accessToken}`,
        },
      };

      const data = await axios.get(`http://localhost:8082/chat/one`, config);
      setChats(data);
      // console.log("this is the chat I want",data)
    } catch (err) {
      console.log(err);
    }
  };

  const sendMessage = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.accessToken}`,
        },
      };
      setInputMsg("");
      const { data } = await axios.post(
        `http://localhost:8082/message`,
        {
          content: inputMsg,
          chatId: selectedChat._id,
        },
        config
      );

      console.log("this is msg", data);
      await socket.emit("new_message", data);
      setMessage((prevState) => {
        return {
          data: [...prevState.data, data],
        };
      });
    } catch (err) {}
  };
  const addEmoji = (e) => {
    const sym = e.unified.split("_");
    const codeArray = [];
    sym.forEach((el) => codeArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codeArray);
    console.log(emoji);
    setInputMsg(inputMsg + emoji);
  };

  useEffect(() => {
    fetchMessages();
    // console.log("useEffect set message",message)
  }, [selectedChat]);

  useEffect(() => {
    const chatBody = document.getElementById("chat-body");
    if (chatBody) {
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }, [message.data]);
  // useEffect(() => {
  //  handleRemoveMsg()
  // });
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      // console.log("hi",storedUserData)
      // console.log("hello",JSON.parse(storedUserData))
      setLoggedUser(JSON.parse(storedUserData));
    }
    fetchChats();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    // console.log("single chat working 1")
    const handleReceiveMessage = (data) => {
      // console.log("single chat working")
      const isMessageAlreadyExists = message.data.some(
        (item) => item._id === data._id
      );
      // console.log(isMessageAlreadyExists,data)
      if (!isMessageAlreadyExists) {
        setMessage((prevState) => {
          return {
            data: [...prevState.data, data],
          };
        });
      }
    };

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [socket]);

  useEffect(() => {
    chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
  });

  // console.log("logged user",loggedUser)
  return (
    <div className="chat-left">
      <div className="left-container">
        <div className="right-container-navbar">
          <div className="nav-container">
            <div className="profile">
              {myUser.length !== 0 && (
                <div className="nav-profile-pic">
                  <img src={myUser.pic} alt="this is pic" />
                  {/* <BinaryImage contentType={myUser.pic.contentType} data={myUser.pic.data.data} /> */}
                </div>
              )}

              <div className="selected-user-name">
                <h3>{myUser.username}</h3>
              </div>
            </div>
            <div className="group-others">
              <div className="group-icons">
                {/* <GroupsIcon className ="grpicons"/> */}
                {myUser.length !== 0 && (
                  <MoreVertIcon
                    className="grpicons"
                    onClick={() => setdropDown(!dropDown)}
                  />
                )}

                {dropDown && (
                  <div className="dropdown">
                    <div className="dropBtn" onClick={handleProfile}>
                      profile
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="chat-body" ref={chatBodyRef}>
          {/* {console.log(message.data)} */}
          {message.data &&
            message.data.map((item, i) => {
              const isMyMessage = item.sender._id === userData.other._id;
              const messageContainerClass = isMyMessage
                ? "message right-message"
                : "message left-message";

              return (
                <div
                  className={messageContainerClass}
                  key={i}
                  onClick={() => setIsRemovemessage(false)}
                >
                  {/* id={username === item.author ?"you":"other"} */}
                  <div
                    className="message-container"
                    onContextMenu={(e) => handleContextMenu(e, item, i)}
                  >
                    <div className="message-content">
                      <p>{item.content}</p>
                      <div className="message-meta">
                        <div className="time">
                          {item.createdAt.substring(11, 16)}
                        </div>{" "}
                        {/* Assuming you have a createdAt property */}
                      </div>
                      {/* {
                    isRemoveMessage && index === i && item.sender._id === userData.other._id && (
                      <div className='dropdownRemove'>
                        <div className='dropBtn' onClick={()=> handleRemoveMsg(item)}>
                          remove
                        </div>
                      </div>
                    )
                  }   */}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="chat-footer">
          {myUser.length !== 0 && (
            <>
              <div className="chat-footer-container">
                <input
                  type="text"
                  placeholder="Hey..."
                  value={inputMsg}
                  onChange={(event) => {
                    handleSubmit(event);
                  }}
                  onKeyPress={(event) => {
                    if (event.key === "Enter" || event.keyCode === 13) {
                      setShowEmoji(false)
                      sendMessage();
                    }
                  }}
                />
                <span className="emoji" onClick={() => setShowEmoji(!showEmoji)}>
                  <BsEmojiSmile />
                </span>
              </div>

              {showEmoji && (
                <div className="emoji_picker">
                  <Picker
                    data={data}
                    emojiSize={20}
                    emojiButtonSize={28}
                    onEmojiSelect={addEmoji}
                    maxFrequentRows={0}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyChat;
