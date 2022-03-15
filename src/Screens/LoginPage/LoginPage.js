import React from "react";
import { Link } from 'react-router-dom';
import {makeStyles} from '@mui/styles';
import InputAdornment from "@mui/material/InputAdornment";
import Icon from "@mui/material/Icon";
// @mui/icons-material
import Email from "@mui/icons-material/Email";
// core components
// import Header from "../../../components/Header/Header.js";
// import HeaderLinks from "../../../components/Header/HeaderLinks.js";
// import Footer from "../../../components/Footer/Footer.js";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Button from "../../components/CustomButtons/DarkButton";
// import Card from "../../../components/Card/Card.js";
// import CardBody from "../../../components/Card/CardBody.js";
// import CardHeader from "../../../components/Card/CardHeader.js";
// import CardFooter from "../../../components/Card/CardFooter.js";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import CardContent from "@mui/material/CardContent"

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Kit 2 React components
import Box from "../../components/CustomBox";
// import MKTypography from "components/MKTypography";
import CustomInput from "../../components/CustomInput/CustomInput";
import Parallax from "../../components/Parallax/Parallax";
import SocialMediaLogin from '../../components/SocialMediaLogin/SocialMediaLogin'
import "./LoginPage.css";


// import styles from "../../../assets/jss/material-kit-react/views/loginPage.js";

// import image from "assets/img/bg7.jpg";
const conatinerFluid = {
  paddingRight: "15px",
  paddingLeft: "15px",
  marginRight: "auto",
  marginLeft: "auto",
  width: "100%"
};
const conatiner = {
  ...conatinerFluid, 
  "@media (min-width: 576px)": {
    maxWidth: "540px"
  },
  "@media (min-width: 768px)": {
    maxWidth: "720px"
  },
  "@media (min-width: 992px)": {
    maxWidth: "960px"
  },
  "@media (min-width: 1200px)": {
    maxWidth: "1140px"
  }
};

const signupPageStyle = {
  conatiner: {
    ...conatiner,
    zIndex: "2",
    position: "relative",
    paddingTop: "20vh",
    color: "#FFFFFF",
    paddingBottom: "200px"
  },
  cardHidden: {
    opacity: "0",
    transform: "translate3d(0, -60px, 0)"
  },
  pageHeader: {
    minHeight: "100vh",
    height: "auto",
    display: "inherit",
    position: "relative",
    margin: "0",
    padding: "0",
    border: "0",
    alignItems: "center",
    "&:before": {
      background: "rgba(0, 0, 0, 0.5)"
    },
    "&:before,&:after": {
      position: "absolute",
      zIndex: "1",
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
      content: '""'
    },
    "& footer li a,& footer li a:hover,& footer li a:active": {
      color: "#FFFFFF"
    },
    "& footer": {
      position: "absolute",
      bottom: "0",
      width: "100%"
    }
  },
  form: {
    margin: "0"
  },
  cardHeader: {
    width: "auto",
    textAlign: "center",
    marginLeft: "20px",
    marginRight: "20px",
    marginTop: "-40px",
    padding: "20px 0",
    marginBottom: "15px"
  },
  socialIcons: {
    maxWidth: "24px",
    marginTop: "0",
    width: "100%",
    transform: "none",
    left: "0",
    top: "0",
    height: "100%",
    lineHeight: "41px",
    fontSize: "20px"
  },
  divider: {
    marginTop: "30px",
    marginBottom: "0px",
    textAlign: "center"
  },
  cardFooter: {
    paddingTop: "0rem",
    border: "0",
    borderRadius: "6px",
    justifyContent: "center !important"
  },
  socialLine: {
    marginTop: "1rem",
    textAlign: "center",
    padding: "0"
  },
  inputIconsColor: {
    color: "#495057"
  },
  fbLoginButton: {
    width: "165px",
    height:"40px",  
    borderRadius: "4px",
    background: "#3b5998",
    color:"white",
    border:"0px transparent",  
    textAlign: "center",
    margin:"5px",
    display: "inline-block",
    "&:hover": {
      background: "#3b5998",
      opacity: "0.6"
    }
  },
  googleLoginButton: {
    width: "165px",
    height:"40px",  
    borderRadius: "4px",
    backgroundColor: "#db3236 !important",
    color:"white",
    border:"0px transparent",  
    textAlign: "center",
    margin:"5px",
    display: "inline-block",
    "&:hover": {
      background: "#db3236",
      opacity: "0.6"
    }
  }
};
const useStyles = makeStyles(signupPageStyle);


export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");

  setTimeout(function() {
    setCardAnimation("");
  }, 700);

  const responseGoogle = (response) => {
    console.log(response);
  }
  const responseFacebook = (response) => {
    console.log(response);
  }

  const classes = useStyles();
  return (
    <div>
      <Parallax image={require("../../images/Sunrise.jpg")}>
        <div className={classes.conatiner}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <Box color="orange" className={classes.cardHeader}>
                    
                    <h1>Travel Diary</h1>
                    <h4>Login</h4>
                    {/* <div className={classes.socialLine}>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-twitter"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-facebook"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-google-plus-g"} />
                      </Button>
                    </div> */}
                  </Box>
                  {/* <p className={classes.divider}>Or Be Classical</p> */}
                  <CardContent>
                    <CustomInput
                      labelText="Email..."
                      id="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Password"
                      id="pass"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off"
                      }}
                    />
                  </CardContent>
                  <Box className={classes.cardFooter}>
                    <Button simple color="primary" size="lg"
                            onClick={() => props.isAuthorized(true)}
                            component={Link}
                            to="/"
                             >
                      Enter
                    </Button>
                  </Box>
                  <p className={classes.divider}>Don't have an account yet? </p>
                  <Box className={classes.cardFooter}>
                  <Button  href="signup" simple color="primary" >
                    Sign up here
                  </Button>   
                  </Box>       
                  <h6 className="text-center">Or</h6> 
                  <br/>
                  <div className="d-flex justify-content-center">
                    <SocialMediaLogin />
                  </div>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div> 
      </Parallax>       
    </div>
  )
}
