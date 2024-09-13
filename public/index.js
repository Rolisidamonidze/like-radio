const watchedVideos = new Set(
  JSON.parse(localStorage.getItem("watchedVideos")) || []
);
const pastedChannels = new Set(
  JSON.parse(localStorage.getItem("pastedChannels")) || []
);
let watchedMinutes = parseInt(localStorage.getItem("watchedMinutes")) || 0;
let userLevel = parseInt(localStorage.getItem("userLevel")) || 1;
const badges = [
  { threshold: 10, badge: "🏅" },
  { threshold: 30, badge: "🥈" },
  { threshold: 60, badge: "🥇" },
];
let player;
let availableVideos = []; // List of available videos to choose from

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "315",
    width: "560",
    videoId: "",
    events: {
      onStateChange: onPlayerStateChange,
    },
  });
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    playNextVideo();
  }
}

function updateLevelAndBadges() {
  userLevel = Math.floor(watchedMinutes / 30) + 1;
  document.getElementById("level").textContent = `Level: ${userLevel}`;

  const earnedBadges = badges
    .filter((badge) => watchedMinutes >= badge.threshold)
    .map((badge) => badge.badge);
  document.getElementById("badges").textContent = `Badges: ${earnedBadges.join(
    " "
  )}`;
}

function saveData() {
  localStorage.setItem("watchedVideos", JSON.stringify([...watchedVideos]));
  localStorage.setItem("pastedChannels", JSON.stringify([...pastedChannels]));
  localStorage.setItem("watchedMinutes", watchedMinutes.toString());
  localStorage.setItem("userLevel", userLevel.toString());
}

async function fetchVideos(channelUrl) {
  document.getElementById("loading").style.display = "block";
  const response = await fetch("/scrape", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ channelUrl }),
  });

  const data = await response.json();
  document.getElementById("loading").style.display = "none";

  if (data.links && data.links.length > 0) {
    availableVideos = data.links.filter((link) => !watchedVideos.has(link));
    if (availableVideos.length === 0) {
      document.getElementById("message").textContent =
        "All videos have been watched.";
      return;
    }
    playNextVideo();
  } else {
    document.getElementById("message").textContent =
      "No videos found or invalid channel URL.";
  }
}

function playNextVideo() {
  if (availableVideos.length === 0) {
    document.getElementById("message").textContent = "No more new videos.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * availableVideos.length);
  const videoUrl = availableVideos.splice(randomIndex, 1)[0]; // Remove the selected video from the list
  watchedVideos.add(videoUrl);
  addToWatchedList(videoUrl);

  const videoId = new URL(videoUrl).searchParams.get("v");
  player.loadVideoById(videoId);
  document.getElementById("message").textContent = "";
  updateLevelAndBadges();
  saveData();
}

function handleChannelUrl(channelUrl) {
  if (!pastedChannels.has(channelUrl)) {
    pastedChannels.add(channelUrl);
    const listItem = document.createElement("li");
    listItem.textContent = channelUrl;
    document.getElementById("channelList").appendChild(listItem);
    saveData();
  }
  fetchVideos(channelUrl);
}

function playVideo(videoUrl) {
  const videoId = new URL(videoUrl).searchParams.get("v");
  if (player) {
    player.loadVideoById(videoId);
  }
}

function addToWatchedList(videoUrl) {
  const videoId = new URL(videoUrl).searchParams.get("v");
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
  const listItem = document.createElement("li");

  // Add HTML for thumbnail
  listItem.innerHTML = `
        <img src="${thumbnailUrl}" alt="Thumbnail" data-video-url="${videoUrl}" class="thumbnail" style="cursor: pointer; width: 100px;">
    `;

  // Add click event to the image
  listItem.querySelector("img").addEventListener("click", () => {
    playVideo(videoUrl);
  });

  document.getElementById("watchedList").appendChild(listItem);
}

document.getElementById("channelForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const channelUrl = document.getElementById("channelUrl").value;
  handleChannelUrl(channelUrl);
});

// Load YouTube API
const script = document.createElement("script");
script.src = "https://www.youtube.com/iframe_api";
document.head.appendChild(script);

// Initialize UI
updateLevelAndBadges();
pastedChannels.forEach((channel) => {
  const listItem = document.createElement("li");
  listItem.textContent = channel;
  document.getElementById("channelList").appendChild(listItem);
});
watchedVideos.forEach((videoUrl) => addToWatchedList(videoUrl));
