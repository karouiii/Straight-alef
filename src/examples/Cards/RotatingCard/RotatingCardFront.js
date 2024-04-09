// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
// import Icon from "@mui/material/Icon";

import MKBox from "components/MKBox";
// import MKTypography from "components/MKTypography";

function RotatingCardFront({ image }) {
  return (
    <MKBox
      display="flex"
      justifyContent="center"
      alignContent="center"
      width="100%"
      position="relative"
      zIndex={2}
      bgColor="white"
      shadow="lg"
      minHeight="10rem"
      sx={{
        border: "2px solid #000000",
        borderRadius: "1.25rem",
        overflow: "hidden",
        transform: "perspective(999px) rotateX(0deg) translate3d(0, 0, 0)",
        transformOrigin: "50% 0",
        backfaceVisibility: "hidden",
        willChange: "transform, box-shadow",
        transition: "transform 200ms ease-out",

        "&:hover": {
          transform: "perspective(999px) rotateX(7deg) translate3d(0px, -4px, 5px)",
        },
      }}
    >
      <MKBox component="img" src={image} width="100%" my="auto" />
    </MKBox>
  );
}

// Setting default props for the RotatingCardFront
// RotatingCardFront.defaultProps = {
//   color: "info",
//   icon: "",
// };

// Typechecking props for the RotatingCardFront
RotatingCardFront.propTypes = {
  image: PropTypes.string.isRequired,
};

export default RotatingCardFront;
