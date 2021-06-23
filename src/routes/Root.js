import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Toolbar,
  Button,
} from '@material-ui/core';
import { Video } from '~/components/Video';

export const Root = ({
  ...props
}) => {
  const [ pipEnabled, setPiPEnabled ] = useState(
    document.pictureInPictureEnabled
  );
  const [ isPiP, setIsPiP ] = useState(false);

  const videoElRef = useRef();

  // Setup video
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true,
    }).then(mediaStream => {
      videoElRef.current.srcObject = mediaStream;
    }).catch(err => {
      console.error(err);
    });
  }, []);

  const switchPiP = (e, _isPiP) => {
    if(isPiP) { // Exit PiP
      document.exitPictureInPicture().then(() => {
        setIsPiP(false);
      }).catch(err => {
        console.error(err);
      });
    }
    else { // Enter PiP
      videoElRef.current.requestPictureInPicture().then(pipWindow => {
        setIsPiP(true);
      }).catch(err => {
        console.error(err);
      });
    }
  };

  return (
    <>
      <Video
        ref={videoElRef}
      />

      <Toolbar
      >
        <Button
          variant="contained"
          disabled={!pipEnabled}
          onClick={e => {
            switchPiP(e, isPiP)
          }}
        >
          {isPiP ? 'Exit PiP' : 'Enable PiP'}
        </Button>
      </Toolbar>
    </>
  );
};

