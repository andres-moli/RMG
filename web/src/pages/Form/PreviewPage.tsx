import React from "react";
import Form from "@rjsf/core";

const schema = {
  title: "Dynamic Form",
  type: "object",
  properties: {
    username: { type: "string", title: "Username", minLength: 3 },
    password: { type: "string", title: "Password", minLength: 5 },
  },
  required: ["username", "password"],
};

const PreviewPage = () => {
  return <Form schema={schema} />;
};

export default PreviewPage;
