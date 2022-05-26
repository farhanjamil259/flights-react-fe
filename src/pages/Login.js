import React, { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import { toast } from "react-toastify";

import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("GETTING DATA");

    try {
      setLoading(true);
      await signIn(userInfo.email, userInfo.password);
      navigate("/");
    } catch (err) {
      console.log(err);
      toast("Invalid Credentials", {
        type: "error",
      });
    }

    console.log("GOT DATA");
    setLoading(false);
  };

  return (
    <Card>
      <div className="login-page">
        <form onSubmit={handleSubmit}>
          <Input
            value={userInfo.email}
            required
            type="email"
            label="email"
            onChange={(e) =>
              setUserInfo({ ...userInfo, email: e.target.value })
            }
          />
          <Input
            value={userInfo.password}
            required
            type="password"
            label="password"
            onChange={(e) =>
              setUserInfo({ ...userInfo, password: e.target.value })
            }
          />

          <Button loading={loading} text="Login" />
        </form>
      </div>
    </Card>
  );
};

export default Login;
