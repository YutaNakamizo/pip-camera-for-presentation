import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Toolbar,
  Button,
  Select,
  MenuItem,
} from '@material-ui/core';
import { Video } from '~/components/Video';

export const Root = ({
  ...props
}) => {
  const [ pipEnabled, setPiPEnabled ] = useState(
    document.pictureInPictureEnabled
  );
  const [ isPiP, setIsPiP ] = useState(false);
  const [ videoSources, setVideoSources ]  = useState([]);
  const [ videoSource, setVideoSource ] = useState();

  const videoElRef = useRef();

  // Get devices
  useEffect(() => {
    const updateVideoSources = () => {
      navigator.mediaDevices.enumerateDevices().then(devices => {
        const sources = devices.filter(device => device.kind === 'videoinput')
        setVideoSources(sources);
        if(!sources.find(source => source.deviceId === videoSource)) {
          setVideoSource(sources[0].deviceId);
        }
      }).catch(err => {
        console.error(err);
      });
    };
    updateVideoSources();
    navigator.mediaDevices.ondevicechange = updateVideoSources;

    return () => {
      navigator.mediaDevices.ondevicechange = null;
    };
  }, []);

  // Setup video
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        deviceId: {
          exact: videoSource,
        },
      },
    }).then(mediaStream => {
      videoElRef.current.srcObject = mediaStream;
    }).catch(err => {
      console.error(err);
    });
  }, [
    videoSource,
  ]);

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
        <Select
          value={videoSource || '(not-selected)'}
          onChange={e => {
            setVideoSource(e.target.value);
          }}
        >
          {videoSources.length > 0 ? (
            videoSources.map((source, index) => (
              <MenuItem
                key={source.deviceId}
                value={source.deviceId}
              >
                {source.label}
              </MenuItem>
            ))
          ) : (
            <MenuItem
              value="(not-selected)"
            >
              (Not Selected)
            </MenuItem>
          )}
        </Select>

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

