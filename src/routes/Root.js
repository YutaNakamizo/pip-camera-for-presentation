import React, {
  useEffect,
  useRef,
} from 'react';
import { Video } from '~/components/Video';

export const Root = ({
  ...props
}) => {
  const videoElRef = useRef();
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

  return (
    <>
      <Video
        ref={videoElRef}
      />
    </>
  );
};

