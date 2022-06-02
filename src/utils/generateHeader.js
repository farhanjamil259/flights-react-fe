const { auth } = require("../config/fire");

const generateHeader = async () => {
  const user = auth.currentUser;

  const token = user && (await user.getIdToken());

  const payloadHeader = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return payloadHeader;
};

export default generateHeader
