# 🎵 YouTube Random Video Player

Welcome to the **YouTube Random Video Player**! This application lets you experience the joy of discovering new music and videos in a manner reminiscent of traditional radio. Just like tuning into a random radio station, you can explore YouTube channels and enjoy a fresh, random video each time.

## 🚀 Features

- **Play Random Videos**: Relive the nostalgia of radio listening by enjoying a new video each time from a chosen YouTube channel.
- **Track Watched Videos**: Automatically keep a record of videos you’ve watched, complete with thumbnails for easy reference.
- **Level Up and Earn Badges**: Gain experience and earn badges based on the time you spend watching, adding a fun, gamified element.
- **Persistent Data**: All your watched videos, pasted channels, and user progress are saved using local storage, ensuring a seamless experience every time you return.
- **Responsive UI**: A beautifully designed interface featuring sidebars for user profile details and watched videos.

## 🏁 Getting Started

These instructions will help you set up and run the project locally.

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Download from [nodejs.org](https://nodejs.org/)
- **npm**: Comes with Node.js

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/youtube-random-video-player.git
    cd youtube-random-video-player
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Start the server:**

    ```bash
    node server.js
    ```

4. **Open the application in your browser:**

    Visit `http://localhost:9009` to access the app.

## 📖 Usage

1. **Paste a YouTube Channel URL**: Enter the URL of a YouTube channel into the input field and press "Get Random Video".
2. **Watch Videos**: A random video will start playing, just like flipping through radio stations. The application will track which videos you've watched and update your profile.
3. **Explore**: View previously watched videos and pasted channels in the sidebars.
4. **Check Your Progress**: Monitor your user level and earned badges based on watched minutes.

## 🔧 Built With

- **[Express.js](https://expressjs.com/)**: Web server framework for Node.js
- **[Puppeteer](https://pptr.dev/)**: Headless Chrome Node.js API for web scraping
- **[YouTube IFrame API](https://developers.google.com/youtube/iframe_api_reference)**: Embedding and controlling YouTube videos
- **[HTML/CSS/JavaScript](https://developer.mozilla.org/en-US/)**: Frontend technologies

## 🎉 Acknowledgments
- Inspired by the nostalgic feeling of radio listening, where every turn of the dial brings something new and unexpected.
- Appreciation to the open-source community for their contributions and inspiration.
