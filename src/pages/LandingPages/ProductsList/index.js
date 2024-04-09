import React, { useEffect, useState } from "react";
import MKBox from "components/MKBox";
import MKAvatar from "components/MKAvatar";
import MKTypography from "components/MKTypography";
import RotatingCard from "examples/Cards/RotatingCard";
import RotatingCardFront from "examples/Cards/RotatingCard/RotatingCardFront";
import RotatingCardBack from "examples/Cards/RotatingCard/RotatingCardBack";
import {
  Card,
  Grid,
  Paper,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Modal,
  Box,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import Icon from "@mui/material/Icon";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
//Images
import bgImage from "assets/images/city-profile.jpg";

// // Routes
import routes from "routes";
import footerRoutes from "footer.routes";

// // DATA
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #a37913",
  borderRadius: "1.25rem",
  boxShadow: 24,
  p: 4,
  "@media (max-width: 768px)": {
    width: 300, // Changez cette valeur en fonction de votre besoin
  },
  "@media (min-width: 769px) and (max-width: 1024px)": {
    width: 400, // Changez cette valeur en fonction de votre besoin
  },
  "@media (min-width: 1025px)": {
    width: 700, // Changez cette valeur en fonction de votre besoin
  },
};

const ProductsList = () => {
  //  POP-UP
  const [open, setOpen] = React.useState(false);
  const [selectedTshirt, setSelectedTshirt] = React.useState(null);

  const handleClose = () => setOpen(false);

  const handleItemClick = (tshirt) => {
    setSelectedTshirt(tshirt);
    setOpen(true);
    console.log(" button clicked ");
  };

  // FILTER AND SEARCH
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [tshirts, setTshirts] = useState([]);

  useEffect(() => {
    async function fetchTshirts() {
      try {
        let q = collection(db, "tshirts");

        // Apply category filter
        if (categoryFilter) {
          q = query(q, where("sex", "==", categoryFilter));
        }

        // Apply search query filter
        if (searchQuery) {
          q = query(q, where("name", "==", searchQuery));
        }

        const querySnapshot = await getDocs(q);
        const fetchedProducts = [];
        querySnapshot.forEach((doc) => {
          fetchedProducts.push({ id: doc.id, ...doc.data() });
          console.log(doc.id, " => ", doc.data());
        });
        setTshirts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchTshirts();
  }, [categoryFilter, searchQuery]); // Trigger fetch on category filter and search query change

  const handleCategoryChange = (_, newCategory) => {
    setCategoryFilter(newCategory);
    console.log(newCategory);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    console.log(event.target.value);
  };

  // T-SHIRT IMAGE TEMPLATE
  const imageTemplate = (tshirt) => (
    <RotatingCard>
      <RotatingCardFront image={tshirt.frontImage} />
      <RotatingCardBack image={tshirt.backImage} />
    </RotatingCard>
  );

  return (
    <>
      <DefaultNavbar routes={routes} sticky />
      <MKBox bgColor="white">
        <MKBox
          minHeight="25rem"
          width="100%"
          sx={{
            backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
              `${linearGradient(
                rgba(gradients.dark.main, 0.8),
                rgba(gradients.dark.state, 0.8)
              )}, url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "grid",
            placeItems: "center",
          }}
        />
      </MKBox>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        {/* Products block */}
        <Grid container spacing={3} id={"productsBlock"}>
          <Grid item xs={12} sm={3}>
            <Paper elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
              <MKTypography variant="h6" color="black">
                Filter
              </MKTypography>
              <ToggleButtonGroup
                color="error"
                fullWidth={true}
                orientation="vertical"
                value={categoryFilter}
                exclusive
                onChange={handleCategoryChange}
              >
                <ToggleButton value="men">
                  <MKTypography
                    variant="caption"
                    color="black"
                    fontWeight="normal"
                    mb={1}
                    pr={2}
                    sx={{ textAlign: "center" }}
                  >
                    Men
                  </MKTypography>
                </ToggleButton>
                <ToggleButton value="women">
                  <MKTypography
                    variant="caption"
                    color="black"
                    fontWeight="normal"
                    mb={1}
                    pr={2}
                    sx={{ textAlign: "center" }}
                  >
                    Women
                  </MKTypography>
                </ToggleButton>
              </ToggleButtonGroup>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={9}>
            <Paper elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
              {/* Search filter */}
              <TextField
                value={searchQuery}
                onChange={handleSearchChange}
                label="Search by Name"
                type="search"
                variant="outlined"
                fullWidth
                style={{ marginBottom: "16px" }}
              />
              {/* Products display */}
              <Grid container spacing={2}>
                {tshirts.map((tshirt) => (
                  <React.Fragment key={tshirt.id}>
                    <Grid key={tshirt.name} item xs={12} sm={4} lg={3}>
                      <MKBox position="relative">
                        {imageTemplate(tshirt)}
                        <MKBox
                          ml={1}
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          {tshirt.name && (
                            <MKTypography variant="overline" fontWeight="medium" color="black">
                              {tshirt.name}
                            </MKTypography>
                          )}
                          <Tooltip title="See more details">
                            <IconButton onClick={() => handleItemClick(tshirt)}>
                              <Icon>zoom_in</Icon>
                            </IconButton>
                          </Tooltip>
                        </MKBox>
                      </MKBox>
                    </Grid>
                  </React.Fragment>
                ))}

                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={styleModal}>
                    <MKBox display="flex" justifyContent="space-between" alignItems="center">
                      <MKTypography color="gold" id="modal-modal-title" variant="h4">
                        {selectedTshirt && selectedTshirt.name}
                      </MKTypography>
                      <MKTypography color="gold" id="modal-modal-title" variant="h4">
                        {selectedTshirt && selectedTshirt.price}
                      </MKTypography>
                      {selectedTshirt && selectedTshirt.image && (
                        <MKAvatar
                          src={selectedTshirt.image}
                          alt={selectedTshirt.name}
                          variant="rounded"
                          size="lg"
                          shadow="md"
                        />
                      )}
                    </MKBox>
                    <Typography id="modal-modal-description" textAlign={"justify"} sx={{ mt: 2 }}>
                      {selectedTshirt && selectedTshirt.description}
                    </Typography>
                  </Box>
                </Modal>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Card>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
};

export default ProductsList;
