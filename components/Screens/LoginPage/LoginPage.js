import React from "react";
import { Link } from 'react-router-dom';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
// core components
// import Header from "../../../components/Header/Header.js";
// import HeaderLinks from "../../../components/Header/HeaderLinks.js";
// import Footer from "../../../components/Footer/Footer.js";
import GridContainer from "../../../components/Grid/GridContainer.js";
import GridItem from "../../../components/Grid/GridItem.js";
import Button from "../../../components/CustomButtons/Button.js";
import Card from "../../../components/Card/Card.js";
import CardBody from "../../../components/Card/CardBody.js";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardFooter from "../../../components/Card/CardFooter.js";
import CustomInput from "../../../components/CustomInput/CustomInput.js";
import Parallax from "../../../components/Parallax/Parallax.js";
import SocialMediaLogin from '../../../components/SocialMediaLogin/SocialMediaLogin.js'
import "./LoginPage.css";


import styles from "../../../assets/jss/material-kit-react/views/loginPage.js";

// import image from "assets/img/bg7.jpg";

const useStyles = makeStyles(styles);


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
      <Parallax image={require("../../../assets/img/Sunrise.jpg")}>
        <div className={classes.conatiner}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="orange" className={classes.cardHeader}>
                    
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
                  </CardHeader>
                  {/* <p className={classes.divider}>Or Be Classical</p> */}
                  <CardBody>
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
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="primary" size="lg"
                            onClick={() => props.isAuthorized(true)}
                            component={Link}
                            to="/"
                             >
                      Enter
                    </Button>
                  </CardFooter>
                  <p className={classes.divider}>Don't have an account yet? </p>
                  <CardFooter className={classes.cardFooter}>
                  <Button  href="signup" simple color="primary" >
                    Sign up here
                  </Button>   
                  </CardFooter>       
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
