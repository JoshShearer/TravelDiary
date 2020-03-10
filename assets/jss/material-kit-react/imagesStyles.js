const imagesStyles = {
  imgFluid: {
    maxWidth: "100%",
    height: "auto"
  },
  imgRounded: {
    borderRadius: "6px !important"
  },
  imgRoundedCircle: {
    borderRadius: "50% !important"
  },
  imgRaised: {
    boxShadow:
      "0 5px 15px -8px rgba(0, 0, 0, 0.24), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  },
  imgGallery: {
    maxWidth: "100%",
    height: "auto",
    marginBottom: "2.142rem",
    flex: "1",
    position: "relative",
    "&:hover,&:focus": {
      color: "inherit",
      opacity: "0.3"
    }
  },
  imgCardTop: {
    width: "100%",
    borderTopLeftRadius: "calc(.25rem - 1px)",
    borderTopRightRadius: "calc(.25rem - 1px)"
  },
  imgCardBottom: {
    width: "100%",
    borderBottomLeftRadius: "calc(.25rem - 1px)",
    borderBottomRightRadius: "calc(.25rem - 1px)"
  },
  imgCard: {
    width: "100%",
    borderRadius: "calc(.25rem - 1px)"
  },
  imgCardOverlay: {
    position: "absolute",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    padding: "1.25rem"
  }

};

export default imagesStyles;
