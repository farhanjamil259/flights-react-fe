import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import Card from "../components/Card";
import Checkbox from "../components/Checkbox";
import Table from "../components/Table";
import generateHeader from "../utils/generateHeader";

const Flights = () => {
  useEffect(() => {
    document.title = "Flights";
  }, []);

  const [flights, setFlights] = useState([]);

  const [showCancelled, setShowCancelled] = useState(true);
  const [showDelayed, setShowDelayed] = useState(true);

  const newData = useMemo(() => {
    return flights.filter((d, i) => {
      return (
        (showDelayed && d.changed.includes("delayed")) ||
        (showCancelled && d.changed.includes("cancelled")) ||
        (showCancelled && d.flight.status === "cancelled")
      );
    }).reverse();
  }, [showCancelled, showDelayed, flights]);

  useEffect(() => {
    const getFlightsData = async () => {
      const header = await generateHeader();
      try {
        const res = await axios.get(
          process.env.REACT_APP_apiUrl + "/api/flights",
          header
        );

        setFlights(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    getFlightsData();
  }, []);

  return (
    <Card title={`Flights Data (${flights.length})`}>
      <div className="controls">
        <Checkbox
          label="Cancelled Flights"
          onChange={(v) => {
            setShowCancelled(v);
          }}
        />
        <Checkbox
          label="Delayed Flights"
          onChange={(v) => {
            setShowDelayed(v);
          }}
        />
      </div>
      <Table data={newData} />
    </Card>
  );
};

export default Flights;
