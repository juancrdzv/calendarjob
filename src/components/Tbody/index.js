import React, { useState, useEffect, useContext } from "react";
import StoreContext from "../../contexts/store";
import "./style.css";

const Tbody = ({ setShow }) => {
  let [store, dispatch] = useContext(StoreContext);
  let [calendarRows, setCalendarRows] = useState([]);
  let dirtyCalendarMap = {};

  const clickDay = (event) => {
    let name = event.target.getAttribute("name");
    dispatch((store) => {
      let copyStore = { ...store };
      copyStore.selectedDay = name;
      return copyStore;
    });
    setShow(true);
  };


  useEffect(() => {
    createRows();
  }, [store]);

  const createRows =()=>{
    let currentTime = new Date();
    let calendarStruct = [[], [], [], [], []];

    let month = currentTime.getMonth();
    let year = currentTime.getFullYear();

    let firstDay = new Date(year, month, 1).getDay();
    let lastDay = new Date(year, month + 1, 0).getDate();

    let daysCont = firstDay - 1;
    for (let i = 0; i < firstDay; i++) {
      calendarStruct[0].unshift(<td key={`c-${daysCont}`}></td>);
    }

    if (calendarStruct[0].length < 7) {
      for (let i = calendarStruct[0].length; i < 7; i++) {
        daysCont++;
        dirtyCalendarMap[`c-${daysCont}`] = {
          className: "white",
        };

        calendarStruct[0].push(
          <td
            className={
              store.calendarMap[`c-${daysCont}`]
                ? store.calendarMap[`c-${daysCont}`].className
                : "white"
            }
            name={`c-${daysCont}`}
            key={`c-${daysCont}`}
            onClick={clickDay}
          >
            <label name={`c-${daysCont}`}>{daysCont}</label>
          </td>
        );
      }
    }

    for (let i = 1; i < calendarStruct.length; i++) {
      for (let j = 0; j < 7; j++) {
        daysCont++;
        if (daysCont <= lastDay) {
          dirtyCalendarMap[`c-${daysCont}`] = {
            className: "white",
          };

          calendarStruct[i].push(
            <td
              className={
                store.calendarMap[`c-${daysCont}`]
                  ? store.calendarMap[`c-${daysCont}`].className
                  : "white"
              }
              name={`c-${daysCont}`}
              key={`c-${daysCont}`}
              onClick={clickDay}
            >
              <label name={`c-${daysCont}`}>{daysCont}</label>
            </td>
          );
        }
      }
    }

    if (calendarStruct[4].length < 7) {
      for (let i = calendarStruct[4].length; i < 7; i++) {
        daysCont++;
        calendarStruct[4].push(<td key={`c-${daysCont}`}></td>);
      }
    }

    setCalendarRows(calendarStruct);
  };

  return (
    <>
      <tr>{calendarRows[0]}</tr>
      <tr>{calendarRows[1]}</tr>
      <tr>{calendarRows[2]}</tr>
      <tr>{calendarRows[3]}</tr>
      <tr>{calendarRows[4]}</tr>
    </>
  );
};

export default Tbody;
