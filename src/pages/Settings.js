import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Stack, Table } from "react-bootstrap";
import { toast } from "react-toastify";
// import Button from "../components/Button";

import Input from "../components/Input";
import generateHeader from "../utils/generateHeader";

const Settings = () => {
  useEffect(() => {
    document.title = "Settings";
  }, []);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [listners, setListners] = useState({});

  useEffect(() => {
    const getEmail = async () => {
      const header = await generateHeader();
      setLoading(true);
      try {
        const res = await axios.get(
          process.env.REACT_APP_apiUrl + "/api/settings",
          header
        );

        const listenersRes = await axios.get(
          "https://airlabs.co/api/v9/listeners?api_key=a97a2d06-3f8b-4e5e-8a89-3fabd8347151"
        );

        setListners(listenersRes.data);

        setEmail(res.data.emailToSendTo);
      } catch (err) {
        toast(err.message, {
          type: "error",
        });
      }

      setLoading(false);
    };

    getEmail();
  }, []);

  const handleClick = async () => {
    const header = await generateHeader();
    setLoading(true);
    try {
      const res = await axios.post(
        process.env.REACT_APP_apiUrl + "/api/settings",
        {
          emailToSendTo: email,
        },
        header
      );

      toast("Updated Email", {
        type: "success",
        theme: "light",
      });
    } catch (err) {
      toast(err.message, {
        type: "error",
      });
    }

    setLoading(false);
  };

  const [iata, setIata] = useState("");

  return (
    <Card>
      <Row>
        <Col md={1} sm={1} lg={4}>
          <Row>
            <div style={{ padding: "16px" }}>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  disabled={loading}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="name@example.com"
                />
              </Form.Group>
              <Button disabled={loading} text="Save" onClick={handleClick}>
                Save
              </Button>
            </div>
          </Row>
          <Row>
            <div>
              <Form.Group className="mb-3">
                <Form.Label>Airport Iata</Form.Label>
                <Form.Control
                  required
                  disabled={loading}
                  value={iata}
                  onChange={(e) => setIata(e.target.value)}
                />
              </Form.Group>
              <Button
                disabled={loading}
                text="Add Airport"
                onClick={async () => {
                  setLoading(true);
                  try {
                    await axios.get(
                      `https://airlabs.co/api/v9/listen?api_key=a97a2d06-3f8b-4e5e-8a89-3fabd8347151&dep_iata=${iata}&webhook_url=http://api.mktripsny.com/api/flights`
                    );

                    const listenersRes = await axios.get(
                      "https://airlabs.co/api/v9/listeners?api_key=a97a2d06-3f8b-4e5e-8a89-3fabd8347151"
                    );

                    setListners(listenersRes.data);

                    setIata("");
                    toast("Added airport", {
                      type: "success",
                    });
                  } catch (err) {
                    toast(err.message, {
                      type: "error",
                    });
                  }
                  setLoading(false);
                }}
              >
                Add
              </Button>
            </div>
          </Row>
        </Col>
        <Col>
          <Row>
            <h3>
              Available Requests:
              {listners.request?.key.limits_total || "N/A"}
            </h3>
          </Row>
          <Row>
            <h3>Airports</h3>
            <Table title="Airports">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Airport</th>

                  <th></th>
                </tr>
              </thead>
              <tbody>
                {listners?.response?.map((r, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{r.dep_iata}</td>

                      <td>
                        <Button
                          variant="danger"
                          disabled={loading}
                          onClick={async () => {
                            setLoading(true);
                            try {
                              await axios.get(
                                `https://airlabs.co/api/v9/unlisten?api_key=a97a2d06-3f8b-4e5e-8a89-3fabd8347151&listener_id=${r.listener_id}`
                              );

                              const listenersRes = await axios.get(
                                "https://airlabs.co/api/v9/listeners?api_key=a97a2d06-3f8b-4e5e-8a89-3fabd8347151"
                              );

                              setListners(listenersRes.data);

                              toast("Airport Deleted", {
                                type: "error",
                              });
                            } catch (err) {
                              console.log(err);
                            }

                            setLoading(false);
                          }}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default Settings;
