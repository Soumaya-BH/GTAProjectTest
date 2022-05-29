import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import client from "../apollo-client"
import { gql, useMutation } from "@apollo/client";



export default function Planning() {
    const localizer = momentLocalizer(moment);
    const [ myEventsList, setMyEventList ]= useState([]);

    //importer la liste des formations
    useEffect(()=>{
        async function getFormations() {
            const  formations  = await client.query({
              query: gql`
              query all_Formations{
                allFormations{
                  title
                  date
                }
              }
              `
            })
            setMyEventList(formations.data.allFormations)
            console.log(myEventsList)
          }
          getFormations() }, [])

  return (
    <div className="App">
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="date"
        endAccessor="date"
        style={{ height: 500 }}
      />
    </div>
  );
}