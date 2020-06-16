import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useContext, useState, useEffect } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import StoreContext from "../../contexts/store";
import ListGroup from "react-bootstrap/ListGroup";

//api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt={cnt}&appid={your api key}
function Reminder({ show, setShow }) {
  const [store, dispatch] = useContext(StoreContext);
  const [currentColor, setColor] = useState("white");

  const [currentCity, setCity] = useState("");
  const [reminder, setReminder] = useState("");

  const [weather,setWeather] = useState([]);

  const handleClose = () => setShow(false);

  useEffect(() => {
    if (store.calendarMap[store.selectedDay]) {
      setCity(store.calendarMap[store.selectedDay].city);
      setReminder(store.calendarMap[store.selectedDay].reminder);
    }
  }, [show]);

  const change = (event) => {
    let name = event.target.getAttribute("name");
    let value = event.target.value;

    switch (name) {
      case "city":
        setCity(value);
        break;
      case "reminder":
        setReminder(value);
        break;
    }
  };

  const click = async (event) => {
    let name = event.target.getAttribute("name");

    switch (name) {
      case "weather":
        try{
          let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${currentCity}&APPID=c72791655071ebe60183c09581363892`,{
            crossDomain:true,
          });
          let json = await response.json();
          setWeather(json.weather);
        }catch(e){
          console.log(e);
        }
      break;
      case "red":
      case "green":
      case "gray":
      case "yellow":
      case "blue":
        setColor(name);
        break;
      case "save":
        dispatch((store) => {
          let copyStore = { ...store };
          const dateObj = new Date();
          const monthName = dateObj.toLocaleString("default", {
            month: "long",
          });
          copyStore.calendarMap[store.selectedDay].reminder = reminder;
          copyStore.calendarMap[store.selectedDay].className = currentColor;
          copyStore.calendarMap[store.selectedDay].city = currentCity;
          copyStore.calendarMap[store.selectedDay].date =
            "Date: " +
            store.selectedDay.split("-")[1] +
            " " +
            monthName +
            " City: " +
            currentCity;
          return copyStore;
        });
        setShow(false);
        setWeather([]);
        break;
      case "close":
        setShow(false);
        setWeather([]);
        break;
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reminder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="form.date">
              {!!store.selectedDay && (
                <Form.Label>
                  {"Date: " +
                    store.selectedDay.split("-")[1] +
                    " " +
                    new Date().toLocaleString("default", {
                      month: "long",
                    })}
                </Form.Label>
              )}
            </Form.Group>
            <Form.Group controlId="form.city">
              <Form.Label>City</Form.Label>
              <Form.Control
                onChange={change}
                name="city"
                value={currentCity}
                maxLength={30}
                type="text"
                placeholder="City"
              />
            </Form.Group>
            <Form.Group controlId="form.color">
              <Form.Label>Color</Form.Label>
              <br></br>
              <ButtonGroup aria-label="Basic example">
                <Button onClick={click} name="blue" variant="primary">
                  Blue
                </Button>
                <Button onClick={click} name="gray" variant="secondary">
                  Gray
                </Button>
                <Button onClick={click} name="green" variant="success">
                  Green
                </Button>
                <Button onClick={click} name="yellow" variant="warning">
                  Yellow
                </Button>
                <Button onClick={click} name="red" variant="danger">
                  Red
                </Button>
              </ButtonGroup>
            </Form.Group>
            <Form.Group controlId="form.reminder">
              <Form.Label>Reminder:</Form.Label>
              <Form.Control value={reminder} onChange={change} name="reminder" as="textarea" rows="3" />
            </Form.Group>
          </Form>
          {!!weather >0 && <ListGroup>
        {weather.map((el) => {
            return (
            <ListGroup.Item><label>Todays weather: {el.description}</label></ListGroup.Item>
            );
          })}
      </ListGroup>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" name="close" onClick={click}>
            Close
          </Button>
          <Button variant="primary" name="save" onClick={click}>
            Save reminder
          </Button>
          <Button variant="success" name="weather" onClick={click}>Show weather</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Reminder;
