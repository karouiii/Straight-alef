// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// react-router-dom components
// import { Link } from "react-router-dom";

// @mui material components
// import MuiLink from "@mui/material/Link";

import MKBox from "components/MKBox";
// import MKTypography from "components/MKTypography";
// import MKButton from "components/MKButton";

function RotatingCardBack({ image }) {
  return (
    <MKBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="absolute"
      top={0}
      left={0}
      zIndex={5}
      bgColor="white"
      shadow="lg"
      minHeight="10rem"
      sx={{
        border: "2px solid #000000",
        borderRadius: "1.25rem",
        overflow: "hidden",
        backgroundSize: "cover",
        backfaceVisibility: "hidden",
        transform: "rotateY(180deg)",
      }}
    >
      <MKBox component="img" src={image} width="100%" my="auto" />
    </MKBox>
  );
}

// Typechecking props for the RotatingCard
RotatingCardBack.propTypes = {
  image: PropTypes.string.isRequired,
};

export default RotatingCardBack;
