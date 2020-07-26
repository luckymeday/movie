import React from 'react'

// how to define props, how to use props variable in this component 
// how to send value of variable from here to parents? - by props
export default function MovieCard(props) {
    // console.log("props ok?", props)
    let fullImg = `https://image.tmdb.org/t/p/original/${props.image}`
    return (
        <div className="col-md-3">
            <div className="card moviecard">
                <img src={fullImg} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 class="card-title card-text">{props.title}</h5>
                    <div class="small-letter">
                        <h6 class="card-text card-text">{props.releaseDate}</h6>
                        <h6 class="card-text card-text">   ★ {props.rating}</h6>
                    </div>
                </div>
            </div>
        </div>
    )
}


