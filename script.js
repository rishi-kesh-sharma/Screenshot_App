const captureBtn = document.querySelector(".btn");
const screenshotContainer = document.querySelector(".screenshot-container");
const preview = document.querySelector(".preview");
const cancelIcon = document.querySelector(".cancel-btn");

const handleClick = async (e) => {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      preferCurrentTab: true,
    });
    const video = document.createElement("video");
    video.addEventListener("loadedmetadata", () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.height = video.videoWidth;
      canvas.width = video.videoWidth;
      video.play();
      ctx.drawImage(video, 0, 0, canvas.height, canvas.height);
      stream.getVideoTracks()[0].stop();
      // preview

      preview.querySelector("img").src = canvas.toDataURL();
      preview.classList.add("show");
      cancelIcon.addEventListener("click", () => {
        preview.classList.remove("show");
        screenshotContainer.appendChild(canvas);
      });
    });

    video.srcObject = stream;
  } catch (err) {
    alert("cannot capture image");
  }
};

captureBtn.addEventListener("click", handleClick);
