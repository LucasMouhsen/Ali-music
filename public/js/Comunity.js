window.addEventListener("load", (event) => {
  /* Youtube */
  const openYoutube = document.getElementById('openYoutube');
  const modal_youtube = document.getElementById('modal_youtube');
  const closeYoutube = document.getElementById('closeYoutube');

  openYoutube.addEventListener('click', () => {
    modal_youtube.classList.add('show');
  });

  closeYoutube.addEventListener('click', () => {
    modal_youtube.classList.remove('show');
  });
  /* video */
  const openvideo = document.getElementById('openVideo');
  const modal_video = document.getElementById('modal_video');
  const closevideo = document.getElementById('closeVideo');

  openvideo.addEventListener('click', () => {
    modal_video.classList.add('show');
  });

  closevideo.addEventListener('click', () => {
    modal_video.classList.remove('show');
  });
  /* text */
  const opentext = document.getElementById('openText');
  const modal_text = document.getElementById('modal_text');
  const closetext = document.getElementById('closeText');

  opentext.addEventListener('click', () => {
    modal_text.classList.add('show');
  });

  closetext.addEventListener('click', (event) => {
    event.preventDefault();
    modal_text.classList.remove('show');
  });
})