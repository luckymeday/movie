import React from 'react'

export default function UpcomingCard(props) {
    let fullImg = `https://image.tmdb.org/t/p/original/${props.image}`
    return (
        <div className="col-md-2">
            <div className="card">
                <img src={fullImg} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 class="card-title">{props.title}</h5>
                    <h6 class="card-text">{props.releaseDate}</h6>
                </div>
            </div>
        </div>
    )
}
