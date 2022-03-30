
import React, { useState } from "react";

// react-router-dom ../../components
import { Link } from "react-router-dom";

// @mui material ../../components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Kit 2 React ../../components
import CBox from "../../components/CBox";
import Typography from "../../components/Typography";
import CInput from "../../components/CInput";
import CButton from "../../components/CButton";

// Material Kit 2 React example ../../components
// import DefaultNavbar from "examples/Navbars/DefaultNavbar";
// import SimpleFooter from "examples/Footers/SimpleFooter";

// Material Kit 2 React page layout routes
// import routes from "routes";

// Images
import bgImage from "../../assets/images/BeachNight.jpg";

function SignInBasic() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <>
      <CBox
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
      <CBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <CBox
                variant="gradient"
                bgColor="primary"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <Typography variant="h4" fontWeight="medium" color="white" mt={1}>
                  Sign in
                </Typography>
                <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
                  <Grid item xs={2}>
                    <Typography component={MuiLink} href="#" variant="body1" color="white">
                      <FacebookIcon color="inherit" />
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography component={MuiLink} href="#" variant="body1" color="white">
                      <GitHubIcon color="inherit" />
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography component={MuiLink} href="#" variant="body1" color="white">
                      <GoogleIcon color="inherit" />
                    </Typography>
                  </Grid>
                </Grid>
              </CBox>
              <CBox pt={4} pb={3} px={3}>
                <CBox component="form" role="form">
                  <CBox mb={2}>
                    <CInput type="email" label="Email" fullWidth />
                  </CBox>
                  <CBox mb={2}>
                    <CInput type="password" label="Password" fullWidth />
                  </CBox>
                  <CBox display="flex" alignItems="center" ml={-1}>
                    <Switch checked={rememberMe} onChange={handleSetRememberMe} />
                    <Typography
                      variant="button"
                      fontWeight="regular"
                      color="text"
                      onClick={handleSetRememberMe}
                      sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                    >
                      &nbsp;&nbsp;Remember me
                    </Typography>
                  </CBox>
                  <CBox mt={4} mb={1}>
                    <CButton variant="gradient" color="primary" fullWidth>
                      sign in
                    </CButton>
                  </CBox>
                  <CBox mt={3} mb={1} textAlign="center">
                    <Typography variant="button" color="text">
                      Don&apos;t have an account?{" "}
                      <Typography
                        component={Link}
                        to="/signup"
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        textGradient
                      >
                        Sign up
                      </Typography>
                    </Typography>
                  </CBox>
                </CBox>
              </CBox>
            </Card>
          </Grid>
        </Grid>
      </CBox>
    </>
  );
}

export default SignInBasic;
