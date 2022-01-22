import React, { useState } from "react";
import { render } from "react-dom";
import { storage } from "./firebase";
import ReactPlayer from 'react-player'
import './index.css'


const ReactFirebaseFileUpload = () => {
  const [video, setVideos] = useState(null);
  const [image, setImages] = useState(null);
  const [vidupload, setVideosUpload] = useState(false)
  const [imgupload, setImagesUpload] = useState(false)
  const [imgchange, setimgChange] = useState(false)
  const [vidchange, setvidChange] = useState(false)
  const [url, setUrl] = useState("");
  const [imgprogress, setimgProgress] = useState(0);
  const [vidprogress, setvidProgress] = useState(0);
  // var Url = "https://firebasestorage.googleapis.com/v0/b/game-24c03.appspot.com/o/images%2FReveal%20your%20logo%20with%20HORROR%20Lamp%20Bloody%20wall%20Halloween%20video%20intro.mp4?alt=media&token=7ed98970-8e7f-467f-866b-53b55c988bf4"
  // var desertRef = storage.ref(`images/Bhadwa.mp4`);
  // const deleteUpload = () => {
  //   desertRef.delete().then(() => {
  //     console.log("File deleted successfully")
  //   }).catch((error) => {
  //     console.log("Error")
  //   });
  // }
  const handleVideoChange = e => {
    if (e.target.files[0]) {
      setVideos(e.target.files[0]);
      setVideosUpload(true)
    }
  };
  const handleImageChange = e => {
    if (e.target.files[0]) {
      setImages(e.target.files[0]);
      setImagesUpload(true)
    }
  };

  const handleVideoUpload = () => {
    if (video === null) alert("Please Upload a Video")
    else {
      const uploadTask = storage.ref(`videos/${video.name}`).put(video);
      uploadTask.on(
        "state_changed",
        snapshot => {
          const vidprogress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setvidProgress(vidprogress);
        },
        error => {
          console.log(error);
        },
        () => {
          storage
            .ref("videos")
            .child(video.name)
            .getDownloadURL()
            .then(url => {
              setUrl(url);
            });
          console.log("Url is" + URL.createObjectURL(video))

        }
      );
      setvidChange(true)
    }
  };
  const handleImageUpload = () => {
    if (image === null) alert("Please Upload a Video")
    else {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        snapshot => {
          const imgprogress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setimgProgress(imgprogress);
        },
        error => {
          console.log(error);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              setUrl(url);
            });
        }
      );
      setimgChange(true)
    }
  };

  return (
    <div className="S-parent">
      <div className="S-uploader">

        <div className="S-upload">

          {vidupload ? <div className="S-react-player"><div>PREVIEW</div><ReactPlayer url={URL.createObjectURL(video)} controls={true} width="100%" /></div> : <div>Upload a video</div>}
          <div className="video-upload">

            {vidchange && vidprogress !== 100 ? <div className="S-progress">
              <progress className="S-progress-bar" value={vidprogress} max="100" /><span>{vidprogress}%</span>
            </div> : ""}
            <div className="video">Video Upload</div>
            <input type="file" onChange={handleVideoChange} accept="video/*" />

            <button className={vidprogress === 100 ? "btn btn-success S-button" : "btn btn-dark S-btn"} onClick={handleVideoUpload}>{vidprogress !== 100 ? <div><span><i class="fad fa-play-circle  S-icon"></i></span><span>Upload</span></div> : <div><span><i class="fad fa-check-circle S-icon"></i></span><span>Uploaded</span></div>}</button>
          </div>

          {imgupload ? <div className="S-react-player"><div>PREVIEW</div><img src={URL.createObjectURL(image)} alt="" width="100%" /></div> : <div>Upload a Thumbnail</div>}
          <div className="image-upload">
            {imgchange && imgprogress !== 100 ? <div className="S-progress">
              <progress className="S-progress-bar" value={imgprogress} max="100" /><span>{imgprogress}%</span>
            </div> : ""}
            <div className="video">Thumbnail Upload</div>
            <input type="file" onChange={handleImageChange} accept="image/*" />
            <button className={imgprogress === 100 ? "btn btn-success S-button" : "btn btn-dark S-btn"} onClick={handleImageUpload}>{imgprogress !== 100 ? <div><span><i class="fal fa-image S-icon"></i></span><span>Upload</span></div> : <div><span><i class="fad fa-check-circle S-icon"></i></span><span>Uploaded</span></div>}</button>
          </div>
          {/* {progress === 100 ? <button className={progress === 100 ? "btn btn-danger S-button" : "btn btn-dark S-btn"} onClick={deleteUpload}><div><span><i class="fad fa-trash-alt"></i></span><span>Delete</span></div></button> : ""} */}
        </div>
      </div>
    </div >
  );
};

render(<ReactFirebaseFileUpload />, document.querySelector("#root"));
