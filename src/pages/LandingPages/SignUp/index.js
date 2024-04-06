import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import auth from "../../../firebase";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";

// Material Kit 2 React example components
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import SimpleFooter from "examples/Footers/SimpleFooter";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/Delete";

import routes from "routes";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function SignUp() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  useEffect(() => {
    if (password === "" || confirmPassword === "") {
      setPasswordsMatch(true); // If either field is empty, passwords are considered to match
    } else {
      setPasswordsMatch(password === confirmPassword);
    }
  }, [password, confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setError("");

    // Validate password
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setError("Your password should have at least one uppercase character.");
      return;
    }

    // Create a new user account with Firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setSuccess("User Created Successfully.");

        // Update user profile with a display name
        updateProfile(result.user, {
          displayName: name,
        });

        // Send email verification
        sendEmailVerification(result.user).then(() => {
          alert("Please check your email and verify your account");
        });
        // Clear success message after 5 seconds
        setTimeout(() => {
          setSuccess("");
        }, 5000);
      })
      .catch((error) => {
        setError(error.message);

        // Clear error message after 5 seconds
        setTimeout(() => {
          setError("");
        }, 2000);
      });
  };

  return (
    <>
      <DefaultNavbar routes={routes} transparent light />
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <MKBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  Join us today
                </MKTypography>
                <MKTypography display="block" variant="button" color="white" my={1}>
                  Enter your email and password to register
                </MKTypography>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form" onSubmit={handleSubmit}>
                  <MKBox mb={2}>
                    <MKInput name="email" type="email" label="Email" fullWidth />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      name="password"
                      type={showPassword ? "text" : "password"}
                      label="Password"
                      fullWidth
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      name="confirmPassword"
                      type="password"
                      label="Confirm Password"
                      fullWidth
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </MKBox>
                  <MKBox mt={4} mb={1}>
                    <MKButton
                      type="submit"
                      variant="gradient"
                      color="info"
                      fullWidth
                      disabled={!passwordsMatch}
                    >
                      sign up
                    </MKButton>
                  </MKBox>
                  <MKBox mt={3} mb={1} textAlign="center">
                    <MKTypography variant="button" color="text">
                      Don&apos;t have an account?{" "}
                      <Link to="/pages/authentication/sign-in">Sign In</Link>
                    </MKTypography>
                  </MKBox>
                </MKBox>
                {/* Display error and success messages */}
                {error && (
                  <div className="message">
                    <p className="text-red-700">{error}</p>
                    <IconButton aria-label="delete" onClick={() => setError("")}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                )}
                {success && (
                  <div className="message">
                    <p className="text-green-600">{success}</p>
                    <IconButton aria-label="delete" onClick={() => setSuccess("")}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                )}
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
      <MKBox width="100%" position="absolute" zIndex={2} bottom="1.625rem">
        <SimpleFooter light />
      </MKBox>
    </>
  );
}

export default SignUp;
