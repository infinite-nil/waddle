import { useState, useRef } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function Home() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const canvasContext = useRef(null);
  const videoProps = useRef(null);

  const [file, setFile] = useState();
  const [preview, setPreview] = useState();

  const handleFile = (event) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
      setPreview(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handlePlay = () => {
    canvasContext.current = canvasRef.current.getContext("2d");
    videoProps.current = {
      width: videoRef.current.videoWidth,
      height: videoRef.current.videoWidth,
    };

    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        timerCallback();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const timerCallback = () => {
    if (videoRef.current.paused || videoRef.current.ended) {
      return;
    }

    computeFrame();
    setTimeout(timerCallback, 1 / 60);
  };

  const computeFrame = () => {
    console.log();
    canvasContext.current.drawImage(
      videoRef.current,
      0,
      0,
      videoProps.current.width,
      videoProps.current.height
    );
  };

  return (
    <Grid justifyContent="center" alignItems="center" height="100vh" container>
      {file && (
        <>
          <video className="video" src={preview} ref={videoRef} />
          <canvas
            className="canvas"
            ref={canvasRef}
            width={videoProps?.current?.width}
            height={videoProps?.current?.width}
          />
          <Button onClick={handlePlay}>Play/Pause</Button>
        </>
      )}
      {!file && (
        <Box>
          <input type="file" onChange={handleFile} accept="video/*" />
        </Box>
      )}
    </Grid>
  );
}
