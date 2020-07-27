import React, { useState, useEffect } from 'react';
import { Badge, Container } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'

// how to define props, how to use props variable in this component 
// how to send value of variable from here to parents? - by props
export default function MovieCard(props) {
    console.log("what props?", props)
    let [isHover, setIsHover] = useState(false)
    let [youtubeLink, setYoutubeLink] = useState(null)
    const [show, setShow] = useState(false);
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

    const callApiGetVideo = async () => {
        let url = `https://api.themoviedb.org/3/movie/${props.movieID}?api_key=c406fd865c79fa2bbc5718f61b988fcf&language=en-US&append_to_response=videos`
        let respone = await fetch(url)
        let data = await respone.json()
        console.log('data:', data)
        if (data.videos.results.length > 0) {
            setYoutubeLink(`https://www.youtube.com/embed/${data.videos.results[0].key}`)
        }
    }
    useEffect(() => {
        callApiGetVideo()
    }, [])

    if (isHover) {
        return (
            <>
                <Modal
                    show={show}
                    onHide={() => setShow(false)}
                    dialogClassName="modal-lg"
                    aria-labelledby="example-custom-modal-styling-title"
                    style={{ borderRadius: "15px" }} >
                    <Modal.Header closeButton style={{ backgroundColor: "lightgray" }}>
                        <Modal.Title style={{ color: "black" }} id="example-custom-modal-styling-title">
                            {props.title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ backgroundColor: "gray" }}>
                        <Container className="video-modal">
                            <iframe src={youtubeLink} width="540" height="450" title="fx." ></iframe>
                        </Container>
                    </Modal.Body>
                </Modal>
                <div className="col-md-3">
                    <div className="card moviecard container" onMouseOver={showInfo} onMouseLeave={hideInfo} onClick={() => setShow(true)}>
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
            </>)
    } else {
        return (
            <>
                <Modal
                    show={show}
                    onHide={() => setShow(false)}
                    dialogClassName="modal-lg"
                    aria-labelledby="example-custom-modal-styling-title">
                    <Modal.Header closeButton style={{ backgroundColor: "lightgray", }}>
                        <Modal.Title style={{ color: "black" }} id="example-custom-modal-styling-title">
                            {props.title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ backgroundColor: "gray" }}>
                        <Container className="video-modal">
                            <iframe src={youtubeLink} width="540" height="450" title="fx." ></iframe>
                        </Container>
                    </Modal.Body>
                </Modal>
                <div className="col-md-3">
                    <div className="card moviecard" onMouseOver={showInfo} onMouseLeave={hideInfo} onClick={() => setShow(true)}>
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
            </>
        )
    }

}
