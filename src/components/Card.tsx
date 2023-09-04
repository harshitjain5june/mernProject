import { useEffect, useState } from 'react'
import { Toast } from 'react-bootstrap';

type Option = {
    [item: string]: number;
} 

type CardProps = {
    title: string,
    description: string,
    options: Option,
    img: string
}

function Card(props: CardProps) {

    const [totalQuantity, setTotalQuantity] = useState(1);
    const [quantity, setQuantity] = useState(Object.values(props.options)[0]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        let total = totalQuantity * quantity;
        
        setTotalPrice(total);
    }, [totalQuantity, quantity])

    return (
        <div className="card m-3" style={{ "width": "18rem", "height": "28rem", "backgroundColor": "#212529", borderColor: "#6c757d" }}>
            <img className="card-img-top" style={{"height": "13rem"}} src={props.img} alt="Card" />
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text" style={{ fontSize: "15px" }}>{props.description}</p>
                <div className="">
                    <select className='m-2 h-100' onChange={(e) => setTotalQuantity(parseInt(e.target.value))} style={{ fontSize: "15px" }} >
                        {Array.from(Array(6), (e, i) => {
                            return (
                                <option key={i + 1} value={i + 1}  >{i + 1}</option>
                            )
                        })}
                    </select>
                    <select className='m-2 h-100' onChange={(e) => setQuantity(parseInt(e.target.value))} style={{ fontSize: "15px" }}>
                        {Object.keys(props.options).map((item:string)=>(
                            <>
                            <option key={item} value={props.options[item]} >{item}</option>
                            </>
                        ))}
                        
                        
                    </select>
                    <div className='mt-2 fs-6' style={{ marginLeft: '8px', fontSize: "15px" }}>
                        Total Price {totalPrice}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card