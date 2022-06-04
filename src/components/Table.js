import React from "react";
import { Table as BTable } from "react-bootstrap";

const Table = ({ data }) => {
  return (
    <div className="table-container">
      <BTable responsive hover>
        <thead>
          <tr>
            <th></th>
            <th>#</th>
            <th>Status</th>
            <th>Delay</th>
            <th>Dep IATA</th>
            <th>Arr IATA</th>
            <th>Dep Time (act)</th>
            <th>Arr Time (act)</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((d, i) => {
            return (
              <tr key={i}>
                <td>
                  {d.flight.status === "cancelled" ? (
                    <CancelledIcon />
                  ) : d.flight.delayed > 0 ? (
                    <DelayIcon />
                  ) : (
                    ""
                  )}
                </td>
                <td>{i + 1}</td>
                <td>{d.flight.status}</td>
                <td>{d.flight.delayed} mins</td>
                <td>{d.flight.dep_iata}</td>
                <td>{d.flight.arr_iata}</td>
                <td>{d.flight.dep_time_utc}</td>
                <td>{d.flight.arr_time_utc}</td>
              </tr>
            );
          })}
        </tbody>
      </BTable>
    </div>
  );
};

const DelayIcon = () => {
  return (
    <svg
      aria-hidden="true"
      role="img"
      id="footer-sample-full"
      width="24"
      height="24"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 1024 1024"
    >
      <path
        fill="#FFC107"
        d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm176.5 585.7l-28.6 39a7.99 7.99 0 0 1-11.2 1.7L483.3 569.8a7.92 7.92 0 0 1-3.3-6.5V288c0-4.4 3.6-8 8-8h48.1c4.4 0 8 3.6 8 8v247.5l142.6 103.1c3.6 2.5 4.4 7.5 1.8 11.1z"
      ></path>
    </svg>
  );
};

const CancelledIcon = () => {
  return (
    <svg
      aria-hidden="true"
      role="img"
      id="footer-sample-full"
      width="24"
      height="24"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 20 20"
    >
      <path
        fill="#DC3545"
        d="M10 1.6a8.4 8.4 0 1 0 0 16.8a8.4 8.4 0 0 0 0-16.8zm4.789 11.461L13.06 14.79L10 11.729l-3.061 3.06L5.21 13.06L8.272 10L5.211 6.939L6.94 5.211L10 8.271l3.061-3.061l1.729 1.729L11.728 10l3.061 3.061z"
      ></path>
    </svg>
  );
};

export default Table;
