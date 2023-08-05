import React from 'react'

function Card() {
    return (
        <div className="card m-3" style={{ "width": "18rem" }}>
            <img className="card-img-top" src="https://skinnyspatula.com/wp-content/uploads/2021/11/Rasta_Pasta3-720x540.jpg" alt="Card" />
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">This is some important text.</p>
                <div className="container">
                    <select className='m-2 h-100' >
                        {Array.from(Array(6), (e, i) => {
                            return (
                                <option key={i + 1} value={i + 1} >{i + 1}</option>
                            )
                        })}
                    </select>
                    <select className='m-2 h-100'>
                        <option key={'half'} value="half">Half</option>
                        <option key={'full'} value="Full">Full</option>
                    </select>
                    <div className='d-inline fs-8' style={{ marginLeft: '8px' }}>
                        Total Price
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card