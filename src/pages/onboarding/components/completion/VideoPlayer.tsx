import React from 'react'
// import ReactPlayer from 'react-player'

function VideoPlayer() {
    // return <ReactPlayer url={src} width="100%" height="auto" controls />
    return (
        <video
            width="100%"
            height="100%"
            controls
            style={{ borderRadius: '8px' }}
        >
            <source src="https://videos.pexels.com/video-files/1526909/1526909-hd_1920_1080_30fps.mp4" />
            Your browser does not support the video tag.
        </video>
    )
}

export default VideoPlayer