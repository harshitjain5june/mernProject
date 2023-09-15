import { useEffect, useState } from 'react'
import { addToCart } from '../features/createSlice';
import { useDispatch } from 'react-redux';
type Option = {
    [item: string]: number;
}

type CardProps = {
    foodItem: any,
    options: Option,

}

function Card(props: CardProps) {
    const [totalQuantity, setTotalQuantity] = useState(1);
    const [quantity, setQuantity] = useState(Object.values(props.options)[0]);
    const [size, setSize] = useState(Object.keys(props.options)[0])
    const itemData = { "name": props.foodItem.name, "quantity": totalQuantity, "size": size }
    const dispatch = useDispatch();
    const handleAddToCart = () => {

        try {
            dispatch(addToCart(itemData))
            console.log("called try")
        } catch (error) {
            console.log(error)
        }
        console.log("called")

    }


    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        let total = totalQuantity * quantity;

        setTotalPrice(total);
    }, [totalQuantity, quantity])

    return (
        <div className="card m-3" style={{ "width": "18rem", "backgroundColor": "#212529", borderColor: "#6c757d" }}>
            <img className="card-img-top" style={{ "height": "13rem" }} src={props.foodItem.img} alt="Card" />
            <div className="card-body">
                <h5 className="card-title">{props.foodItem.name}</h5>
                <p className="card-text" style={{ fontSize: "15px" }}>{props.foodItem.description}</p>
                <div className="">
                    <select className='m-2 h-100' onChange={(e) => setTotalQuantity(parseInt(e.target.value))} style={{ fontSize: "15px", borderRadius: "5px", padding: "3px" }} >
                        {Array.from(Array(6), (e, i) => {
                            return (
                                <option key={i + 1} value={i + 1}  >{i + 1}</option>
                            )
                        })}
                    </select>
                    <select className='m-2 h-100' onChange={(e) => {setQuantity(props.options[e.target.value]); setSize(e.target.value)}} style={{ fontSize: "15px", borderRadius: "5px", padding: "3px" }}>
                        {Object.keys(props.options).map((item: string) => (
                            <>
                                <option key={item} value={item} >{item}</option>
                            </>
                        ))}


                    </select>
                    <div className='mt-2 fs-6' >
                        Total Price {totalPrice}
                    </div>
                    <div className="addToCart mt-2">
                        <button onClick={handleAddToCart}>Add to cart</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Card