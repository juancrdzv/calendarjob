import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Reminder from "./components/Modal";
import Tbody from "./components/Tbody";
import StoreContext from "./contexts/store";
import Navbar from "react-bootstrap/Navbar";
import ListGroup from "react-bootstrap/ListGroup";

const App = () => {
  const [show, setShow] = useState(false);
  const [store, dispatch] = useState({
    calendarMap: {
      "c-1": { city: "", className: "white", date: "", reminder: "" },
      "c-2": { city: "", className: "white", date: "", reminder: "" },
      "c-3": { city: "", className: "white", date: "", reminder: "" },
      "c-4": { city: "", className: "white", date: "", reminder: "" },
      "c-5": { city: "", className: "white", date: "", reminder: "" },
      "c-6": { city: "", className: "white", date: "", reminder: "" },
      "c-7": { city: "", className: "white", date: "", reminder: "" },
      "c-8": { city: "", className: "white", date: "", reminder: "" },
      "c-9": { city: "", className: "white", date: "", reminder: "" },
      "c-10": { city: "", className: "white", date: "", reminder: "" },
      "c-11": { city: "", className: "white", date: "", reminder: "" },
      "c-12": { city: "", className: "white", date: "", reminder: "" },
      "c-13": { city: "", className: "white", date: "", reminder: "" },
      "c-14": { city: "", className: "white", date: "", reminder: "" },
      "c-15": { city: "", className: "white", date: "", reminder: "" },
      "c-16": { city: "", className: "white", date: "", reminder: "" },
      "c-17": { city: "", className: "white", date: "", reminder: "" },
      "c-18": { city: "", className: "white", date: "", reminder: "" },
      "c-19": { city: "", className: "white", date: "", reminder: "" },
      "c-20": { city: "", className: "white", date: "", reminder: "" },
      "c-21": { city: "", className: "white", date: "", reminder: "" },
      "c-22": { city: "", className: "white", date: "", reminder: "" },
      "c-23": { city: "", className: "white", date: "", reminder: "" },
      "c-24": { city: "", className: "white", date: "", reminder: "" },
      "c-25": { city: "", className: "white", date: "", reminder: "" },
      "c-26": { city: "", className: "white", date: "", reminder: "" },
      "c-27": { city: "", className: "white", date: "", reminder: "" },
      "c-28": { city: "", className: "white", date: "", reminder: "" },
      "c-29": { city: "", className: "white", date: "", reminder: "" },
      "c-30": { city: "", className: "white", date: "", reminder: "" },
      "c-31": { city: "", className: "white", date: "", reminder: "" },
    },
    selectedDay: null,
  });
  return (
    <StoreContext.Provider value={[store, dispatch]}>
      <Navbar bg="light">
        <Navbar.Brand href="#home">
          Please select a cell to add a reminder
        </Navbar.Brand>
      </Navbar>
      <br></br>
      <Table responsive>
        <thead>
          <tr>
            <th>Sunday</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
          </tr>
        </thead>
        <tbody>
          <Tbody setShow={setShow}></Tbody>
        </tbody>
      </Table>
      <Reminder show={show} setShow={setShow}></Reminder>
      <h6>Reminder list</h6>
      <ListGroup>
        {Object.values(store.calendarMap)
          .filter((el) => el.date !== "")
          .map((el) => {
            return (
              <ListGroup.Item>{`Date :${el.date} Reminder:${el.reminder}`}</ListGroup.Item>
            );
          })}
      </ListGroup>
    </StoreContext.Provider>
  );
};

export default App;
