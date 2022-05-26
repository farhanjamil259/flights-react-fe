import { async } from "@firebase/util";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import generateHeader from "../utils/generateHeader";

const Settings = () => {
  useEffect(() => {
    document.title = "Settings";
  }, []);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getEmail = async () => {
      const header = await generateHeader();
      setLoading(true);
      try {
        const res = await axios.get(
          "http://localhost:8000/api/settings",
          header
        );

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
        "http://localhost:8000/api/settings",
        {
          emailToSendTo: email,
        },
        header
      );

      toast("Updated Email", {
        type: "success",
        theme: "light",
      });
      console.log(res);
    } catch (err) {
      toast(err.message, {
        type: "error",
      });
    }

    setLoading(false);
  };

  return (
    <Card title="Settings">
      <div className="settings-page">
        <div>
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email address to mail data to:"
          />
          <Button loading={loading} text="Save" onClick={handleClick} />
        </div>
      </div>
    </Card>
  );
};

export default Settings;
