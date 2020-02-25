import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = ({ history }) => {
  const [colorList, setColorList] = useState([]);
  const [error, setError] = useState('');

  // fetch colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(() => {
    setError('');

    const getColorList = async () => {
      await axiosWithAuth()
        .get("/colors")
        .then(res => {
          setColorList(res.data);
        })
        .catch(err => {
          setError('Error: Unable load colors.');
        });
    };

    getColorList();
  }, []);

  const logout = e => {
    e.preventDefault();
    localStorage.removeItem("token");
    history.push('/');
  };

  return (
    <>
      <button onClick={logout}>Logout</button>
      <p className="error">{error}</p>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
