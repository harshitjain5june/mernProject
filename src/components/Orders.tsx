import React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import { styled } from "@mui/material/styles";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Orders = () => {
  const [ordersData, setOrdersData] = useState<any>([]);
  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/myOrderData`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: localStorage.getItem("email"),
          }),
        },
      );
      const data = await response.json();
      setOrdersData(data.orderData.order_data);
    } catch (error) {
      console.log("error occured: ", error);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    setOrdersData(ordersData.reverse());
  }, [ordersData]);

  const [expandedArray, setExpandedArray] = useState<boolean[]>([]);

  useEffect(() => {
    // Initialize expandedArray with false for each card
    setExpandedArray(Array(ordersData.length).fill(false));
  }, [ordersData]);

  const handleExpandClick = (index: number) => {
    // Toggle the expanded state for the clicked card
    const updatedExpandedArray = [...expandedArray];
    updatedExpandedArray[index] = !updatedExpandedArray[index];
    setExpandedArray(updatedExpandedArray);
  };

  const calculateGrandTotal = (item: any[]) => {
    let grandTotal = 0;
    item.map((subItem: any, index: number) => {
      if (index != 0) {
        grandTotal += subItem.price;
      }
    });
    return grandTotal;
  };

  return (
    <div style={{ padding: "10px", width: "50%" }}>
      {ordersData.length > 0 ? (
        <div>
          <h1>Order History: </h1>

          {ordersData.map((item: any[], index: number) => (
            <div key={index}>
              <Card sx={{ maxWidth: 500, marginBottom: "10px" }}>
                <CardHeader
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  subheader={item[0].Order_date}
                />

                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {item.map((subitem: any, index: number) =>
                      index !== 0 ? (
                        <>
                          <p key={index}>
                            <span
                              style={{
                                padding: "4px",
                                backgroundColor: "#00BA34",
                                borderRadius: "5px",
                              }}
                            >
                              {subitem.name}
                            </span>{" "}
                            |{" "}
                            <span
                              style={{ fontWeight: "bold", marginLeft: "4px" }}
                            >
                              Quantity:
                            </span>{" "}
                            <span style={{ padding: "4px" }}>
                              {subitem.quantity}
                            </span>{" "}
                            |{" "}
                            <span
                              style={{ fontWeight: "bold", marginLeft: "4px" }}
                            >
                              Size:
                            </span>{" "}
                            <span style={{ padding: "4px" }}>
                              {subitem.size}
                            </span>{" "}
                            |{" "}
                            <span
                              style={{ fontWeight: "bold", marginLeft: "4px" }}
                            >
                              Price:
                            </span>{" "}
                            <span
                              style={{
                                padding: "4px",
                                backgroundColor: "#E92C2C",
                                borderRadius: "5px",
                              }}
                            >
                              {subitem.price}
                            </span>
                          </p>
                        </>
                      ) : (
                        <></>
                      ),
                    )}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                  <ExpandMore
                    expand={expandedArray[index]} // Use expanded state from the array
                    onClick={() => handleExpandClick(index)} // Pass the card index
                    aria-expanded={expandedArray[index]} // Use expanded state from the array
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse
                  in={expandedArray[index]}
                  timeout="auto"
                  unmountOnExit
                >
                  <CardContent>
                    GrandTotal:{" "}
                    <span
                      style={{
                        padding: "4px",
                        backgroundColor: "#E92C2C",
                        borderRadius: "5px",
                      }}
                    >
                      {" "}
                      {calculateGrandTotal(item)}
                    </span>
                  </CardContent>
                </Collapse>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <h1> No order placed yet! </h1>
      )}
    </div>
  );
};

export default Orders;
