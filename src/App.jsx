// ANCHOR IMPORTS
import { useState, useEffect } from "react";
import axios from "axios";

// ANCHOR App Component
export default function App() {
  //ANCHOR States
  const [friends, setFriends] = useState([]);
  const [picture, setPicture] = useState("");
  const [name, setName] = useState("");

  // ANCHOR UseEffect
  // useEffect(() => {
  //   axios
  //     .get("/api/friends")
  //     .then((res) => {})
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  useEffect(() => {
    getSavedFriends();
  }, []);

  // ANCHOR Functions
  const getSavedFriends = async () => {
    try {
      const result = await axios.get("/api/friends");
      console.log(result.data);
      setFriends([...result.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePicture = (e) => {
    console.log(e.target.value);
    setPicture(e.target.value);
  };

  const handleName = (e) => {
    console.log(e.target.name);
    setName(e.target.value);
  };

  const addFriend = () => {
    const newFriend = {
      name: name,
      picture: picture,
    };
    setFriends([...friends, newFriend]);
    setPicture("");
    setName("");
  };

  console.log(friends);

  let friendsInfo = [];
  if (friends.length > 0) {
    friendsInfo = friends.map((friend, idx) => {
      return (
        <div key={`${friend.name}-${idx}`}>
          <img src={friend.picture} width="200px" height="200px" />
          <span>{friend.name}</span>
        </div>
      );
    });
  }

  // ANCHOR Return JSX
  return (
    <div>
      <label for="nameInput">Name:</label>
      <input id="nameInput" value={name} onChange={(e) => handleName(e)} />
      <label for="picInput">Picture:</label>
      <input id="picInput" value={picture} onChange={(e) => handlePicture(e)} />
      <button id="addFriendButton" onClick={addFriend}>
        {" "}
        Add Friend
      </button>
      {friendsInfo}
    </div>
  );
}
