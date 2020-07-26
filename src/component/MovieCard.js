import React, { useState } from 'react'
import { Row } from 'react-bootstrap'

// how to define props, how to use props variable in this component 
// how to send value of variable from here to parents? - by props
export default function MovieCard(props) {
    let [isHover, setIsHover] = useState(false)
    const [show, setShow] = useState(false)
    console.log('props.overview:', props.overview)

    // console.log("props ok?", props)
    let fullImg = `https://image.tmdb.org/t/p/original/${props.image}`

    const showInfo = () => {
        setIsHover(true)
    }
    const hideInfo = () => {
        setIsHover(false)
    }
    if (isHover) {
        return (
            <div className="col-md-3">
                <div className="card moviecard container" onMouseOver={showInfo} onMouseLeave={hideInfo} onClick={() => setShow(true)}>
                    <img src={fullImg} className="card-img-top" alt="..." />
                    <div className="detail-info"><h5 class="card-title card-letter">{props.title}</h5>
                        <div class="small-letter">
                            <h6 class="card-text card-letter">{props.releaseDate}</h6>
                            <h6 class="card-text card-letter">   ★ {props.rating}</h6>
                        </div>
                        <hr></hr>
                        {props.overview}
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="col-md-3">
                <div className="card moviecard" onMouseOver={showInfo} onMouseLeave={hideInfo} onClick={() => setShow(true)}>
                    <img src={fullImg} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 class="card-title card-letter">{props.title}</h5>
                        <div class="small-letter">
                            <h6 class="card-text card-letter">{props.releaseDate}</h6>
                            <h6 class="card-text card-letter">   ★ {props.rating}</h6>
                        </div>
                        {/* <div className="detail-info">
                            <p>{props.overview} </p>
                        </div> */}
                    </div>
                </div>
            </div>
        )
    }

}
