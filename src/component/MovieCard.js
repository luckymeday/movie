import React, { useState } from 'react'
import { Badge } from 'react-bootstrap'

// how to define props, how to use props variable in this component 
// how to send value of variable from here to parents? - by props
export default function MovieCard(props) {
    console.log("what props?", props)
    let [isHover, setIsHover] = useState(false)
    // const [show, setShow] = useState(false)
    console.log('props.overview:', props.overview)

    // console.log("props ok?", props)
    let fullImg = `https://image.tmdb.org/t/p/original/${props.image}`

    const showInfo = () => {
        setIsHover(true)
    }
    const hideInfo = () => {
        setIsHover(false)
    }
    if (true) {
        return (
            <div className="col-md-3">
                <div className="card moviecard container" onMouseOver={showInfo} onMouseLeave={hideInfo}>
                    <img src={fullImg} className="card-img-top" alt="..." />
                    <div className="detail-info"><h5 className="card-title card-letter">{props.title}</h5>
                        <div className="small-letter">
                            <h6 className="card-text card-letter">{props.releaseDate}</h6>
                            <h6 className="card-text card-letter">   ★ {props.rating}</h6>
                        </div>
                        <h6 className="card-text card-letter">{props.genre.map((genre) => { return (<Badge variant="dark" style={{ marginRight: "10px" }}>{props.genres.find((item) => item.id === genre).name}</Badge>) })}</h6>
                        <hr></hr>
                        {props.overview}

                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="col-md-3">
                <div className="card moviecard" onMouseOver={showInfo} onMouseLeave={hideInfo}>
                    <img src={fullImg} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title card-letter">{props.title}</h5>
                        <div className="small-letter">
                            <h6 className="card-text card-letter">{props.releaseDate}</h6>
                            <h6 className="card-text card-letter">   ★ {props.rating}</h6>
                        </div>
                        <h6 className="card-text card-letter">
                            {props.genre.map((genre) => {
                                return (<Badge variant="dark" style={{ marginRight: "10px" }}>{props.genres.find((item) => item.id === genre).name}</Badge>)
                            })}</h6>
                        {/* <div className="detail-info">
                            <p>{props.overview} </p>
                        </div> */}
                    </div>
                </div>
            </div>
        )
    }

}
