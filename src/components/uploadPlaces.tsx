import * as React from "react";
import { useState, useCallback } from "react";
import {render} from "react-dom";
import { Map} from "react-map-gl";
import { Mapbox} from "./Mapbox";
import App from "./draw-polygon/app";

export const UploadPlaces = () => {

  const [name, setName] = useState("");
  const [ID, setID] = useState("");
  const [area, setArea] = useState("");

  const clickHandler = () => {
    alert(`Place entered ${name}, ${ID}, ${area}`);
    setName("");
    setID("");
    setArea("");
  }

  return (
    <>
      <form>
        <label>
          Place Name: 
          <input
            value={name}
            onChange={
              (event) => {
                setName(event.target.value)
              }
            }
          ></input>
        </label>
        <label>
          Place ID: 
          <input
            value={ID}
              onChange={
                (event) => {
                  setID(event.target.value)
                }
              }
          ></input>
        </label>
        <label>
          Place Area: 
          <input
            value={area}
            onChange={
              (event) => {
                setArea(event.target.value)
              }
            }
          ></input>
        </label>
        <button onClick={clickHandler}>Upload Place</button>
      </form>
      
    </>
  );

  //App.renderToDom(document.getElementById("map"));
};

