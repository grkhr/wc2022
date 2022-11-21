import logo from "./logo.svg";
import "./App.css";
import { useEffect, useRef } from "react";

import schedule from "./schedule.json";

const Day = (day) => {
  return (
    <div>
      {/* <h2>{day.day}</h2> */}
      <ul>
        {day.matches.map((match) => (
          <li key={match.ts}>
            {formatTime(match.ts)} | {match.match}
          </li>
        ))}
      </ul>
    </div>
  );
};

// format date, e.g. 2021-06-12 00:00:00 -> "12 June, Tuesday"
const formatDate = (date) => {
  const d = new Date(date);
  const options1 = { weekday: "long" };
  const s1 = d.toLocaleDateString("en-GB", options1);
  const options2 = { month: "numeric", day: "numeric" };
  const s2 = d.toLocaleDateString("en-GB", options2);
  return `${s2}, ${s1}`;
};

const formatTime = (date) => {
  const d = new Date(date);
  const options = { hour: "numeric", minute: "numeric" };
  return d.toLocaleTimeString("en-GB", options);
};

const ScrollDemo = () => {
  const myRef = useRef(null);

  const executeScroll = () => myRef.current.scrollIntoView();
  // run this function from an event handler or an effect to execute scroll

  return (
    <>
      <div ref={myRef}>Element to scroll to</div>
      <button onClick={executeScroll}> Click to scroll </button>
    </>
  );
};

// find index of date in schedule which is closest to current date from below
const findClosestDate = (schedule) => {
  const now = new Date();
  const dates = schedule.map((day) => new Date(day.date));
  const closest = dates.reduce((prev, curr) =>
    Math.abs(curr - now) < Math.abs(prev - now) ? curr : prev
  );
  return dates[dates.indexOf(closest) - 1];
};


const HeaderDate = (day) => {
  const closest = findClosestDate(schedule).toLocaleDateString();
  const current = new Date(day.date).toLocaleDateString();
  if (closest === current) {
    return (
      // draw horizontal line
      <div>
        <hr />
        <h2>{formatDate(day.date)}</h2>
        <Day key={day.date} {...day} />
        <hr />
      </div>
    );
  }
  return (
    <div>
      <h1>{formatDate(day.date)}</h1> <Day key={day.date} {...day} />
    </div>
  );
};

const App = () => {
  const myRef = useRef("scroll");
  console.log("DATEE", findClosestDate(schedule));
  const executeScroll = () => myRef.current.scrollIntoView();
  // useEffect(() => {
  //   myRef.current.scrollIntoView();
  // }, []);

  return (
    <div>
      <div>
        {schedule.map((day) => (
          <>
            <HeaderDate {...day} />
          </>
        ))}
      </div>
    </div>
  );
};

export default App;
