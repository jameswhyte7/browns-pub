import { Button, Card, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputText from "../../common/InputText";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { message } from "antd";

function SignIn() {
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const updateFormValue = ({ updateType, value }) => {
    setLoginData({ ...loginData, [updateType]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password
      ).then((val) => {
        localStorage.setItem("user", JSON.stringify(val.user));
        navigate("/home");
        setLoading(false);
      });
    } catch (error) {
      message.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center">
      <Card className="mx-auto w-full max-w-xl shadow-xl">
        <div className="py-24 px-10">
          <form onSubmit={(e) => handleSubmit(e)}>
            <Typography color="black" variant="h3" className="text-center">
              Browns Pub and Restaurant
            </Typography>

            <div className="mb-16 mt-12">
              {/* {signInError && (
                <AlertMessage type="error" message={signInError} />
              )} */}

              <InputText
                type="text"
                defaultValue={loginData.email}
                updateType="email"
                containerStyle="mt-4"
                labelTitle="Email Address"
                updateFormValue={updateFormValue}
                required={true}
              />

              <InputText
                type="password"
                defaultValue={loginData.password}
                updateType="password"
                containerStyle="mt-4"
                labelTitle="Password"
                updateFormValue={updateFormValue}
                required={true}
              />
            </div>

            <Button
              variant="filled"
              className="text-center flex items-center justify-center"
              size="lg"
              fullWidth={true}
              type="submit"
              loading={loading}
            >
              Login
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}

export default SignIn;
