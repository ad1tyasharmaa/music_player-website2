document.addEventListener('DOMContentLoaded', function() {
    let currentSongIndex = -1;
    let playbackRate = 1.0;
    const audioPlayer = document.getElementById('audio-player');
    const nowPlaying = document.getElementById('now-playing');
    const playlist = document.getElementById('playlist');

    const playlistItems = document.querySelectorAll('#playlist li');

    function selectSong(index) {
        if (currentSongIndex !== -1) {
            playlistItems[currentSongIndex].classList.remove('active');
        }
        currentSongIndex = index;
        const song = playlistItems[currentSongIndex].getAttribute('data-src');
        audioPlayer.src = song;
        nowPlaying.textContent = 'Now playing: ' + playlistItems[currentSongIndex].textContent;
        audioPlayer.play();
        playlistItems[currentSongIndex].classList.add('active');
    }

    function playNext() {
        if (currentSongIndex < playlistItems.length - 1) {
            selectSong(currentSongIndex + 1);
        }
    }

    function playPrev() {
        if (currentSongIndex > 0) {
            selectSong(currentSongIndex - 1);
        }
    }

    function stopSong() {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        nowPlaying.textContent = 'Now playing: None';
        if (currentSongIndex !== -1) {
            playlistItems[currentSongIndex].classList.remove('active');
        }
        currentSongIndex = -1;
    }

    function changePlaybackRate() {
        playbackRate += 0.25;
        if (playbackRate > 2) {
            playbackRate = 0.5;
        }
        audioPlayer.playbackRate = playbackRate;
        document.getElementById('speed').textContent = playbackRate + 'x';
    }

    document.getElementById('play').addEventListener('click', function() {
        if (currentSongIndex === -1 && playlistItems.length > 0) {
            selectSong(0);
        } else {
            audioPlayer.play();
        }
    });

    document.getElementById('pause').addEventListener('click', function() {
        audioPlayer.pause();
    });

    document.getElementById('stop').addEventListener('click', stopSong);

    document.getElementById('next').addEventListener('click', playNext);

    document.getElementById('prev').addEventListener('click', playPrev);

    document.getElementById('speed').addEventListener('click', changePlaybackRate);

    playlistItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            selectSong(index);
        });
    });
});
