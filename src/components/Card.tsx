import { useEffect, useState } from "react";
import { addToCart } from "../features/createSlice";
import { useDispatch } from "react-redux";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React from "react";
import Snackbar from "@mui/material/Snackbar";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  },
);

type Option = {
  [item: string]: number;
};

type CardProps = {
  foodItem: any;
  options: Option;
};

function Card(props: CardProps) {
  const [totalQuantity, setTotalQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loginFirst, setLoginFirst] = useState(false);
  const [quantity, setQuantity] = useState(Object.values(props.options)[0]);
  const [size, setSize] = useState(Object.keys(props.options)[0]);
  const itemData = {
    id: props.foodItem._id,
    name: props.foodItem.name,
    quantity: totalQuantity,
    size: size,
    price: totalPrice,
  };
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    if (localStorage.getItem("email")) {
      setAddedToCart(true);
      try {
        dispatch(addToCart(itemData));
      } catch (error) {
        console.log(error);
      }
    } else {
      setLoginFirst(true);
    }
  };

  const [addedToCart, setAddedToCart] = useState(false);
  const handleClose = () => {
    setAddedToCart(false);
    setLoginFirst(false);
  };

  useEffect(() => {
    let total = totalQuantity * quantity;

    setTotalPrice(total);
  }, [totalQuantity, quantity]);

  return (
    <div
      className="card m-3"
      style={{
        width: "18rem",
        backgroundColor: "#212529",
        borderColor: "#6c757d",
      }}
    >
      <img
        className="card-img-top"
        style={{ height: "13rem" }}
        src={props.foodItem.img}
        alt="Card"
      />
      <div className="card-body">
        <h5 className="card-title">{props.foodItem.name}</h5>
        <p className="card-text" style={{ fontSize: "15px" }}>
          {props.foodItem.description}
        </p>
        <div className="">
          <select
            className="m-2 h-100"
            onChange={(e) => setTotalQuantity(parseInt(e.target.value))}
            style={{ fontSize: "15px", borderRadius: "5px", padding: "3px" }}
          >
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
          <select
            className="m-2 h-100"
            onChange={(e) => {
              setQuantity(props.options[e.target.value]);
              setSize(e.target.value);
            }}
            style={{ fontSize: "15px", borderRadius: "5px", padding: "3px" }}
          >
            {Object.keys(props.options).map((item: string) => (
              <>
                <option key={item} value={item}>
                  {item}
                </option>
              </>
            ))}
          </select>
          <div className="mt-2 fs-6">Total Price {totalPrice}</div>
          <div className="addToCart mt-2">
            <button
              style={{
                backgroundColor: "#1F1B24",
                padding: "5px",
                borderRadius: "5px",
                color: "white",
              }}
              onClick={handleAddToCart}
            >
              Add to cart{" "}
              <AddShoppingCartIcon
                style={{ marginLeft: "5px", marginBottom: "2px" }}
                fontSize="small"
              />
            </button>
          </div>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={addedToCart}
            autoHideDuration={1000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Item added to Cart!
            </Alert>
          </Snackbar>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={loginFirst}
            autoHideDuration={1000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              You need to login first!
            </Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  );
}

export default Card;
