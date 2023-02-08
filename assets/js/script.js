// Attach an event listener to the button that will trigger a function when the button is clicked.

// In the function, retrieve the value of the text box and make a call to the Spotify API's search endpoint, passing the mood as the search query.

// Replicate a similar function to make a call to Giphy API's search endpoint

// Parse the response from the API to extract the relevant information about the tracks that match the mood.

// Parse the response from the API to extract the relevant information about the GIFs that match the mood.

// Display the track information on the page, such as the track name, artist name, and album name.

// Display the GIF beside the generated tracks made by Spotify API

// $("#submitButton").click(function() {
//   const mood = $("#moodInput").val();

//   // Store the value of the mood in localStorage
//   localStorage.setItem("mood", mood);

//   // Set the value of the mood input field to the stored mood
//   $("#moodInput").val(localStorage.getItem("mood"));

//   $.ajax({
//     url: `https://api.spotify.com/v1/search?q=${mood}&type=track`,
//     success: function(data) {
//       const tracks = data.tracks.items;

//       tracks.forEach(function(track) {
//         const trackName = track.name;
//         const artistName = track.artists[0].name;
//         const albumName = track.album.name;

//         const trackDiv = $("<div></div>");
//         trackDiv.append(`<p>Track: ${trackName}</p>`);
//         trackDiv.append(`<p>Artist: ${artistName}</p>`);
//         trackDiv.append(`<p>Album: ${albumName}</p>`);

//         $("#results").append(trackDiv);
//       });
//     }
//   });
// });

// // Check if the mood is stored in localStorage
// if (localStorage.getItem("mood")) {
//   // Set the value of the mood input field to the stored mood
//   $("#moodInput").val(localStorage.getItem("mood"));
// } else {
//   // Set the value of the mood input field to an empty string
//   $("#moodInput").val("");
// }

// // Refresh the value of the mood in localStorage on a daily basis
// setInterval(function() {
//   localStorage.removeItem("mood");
// }, 24 * 60 * 60 * 1000);

const clientId = "097213f32ad54eeb869c70bbec206c6d";
const clientSecret = "e0e8ff51f1c049f5bca2345433e5f5f4";

// First, obtain an access token using the Client ID and Client Secret
$.ajax({
  url: "https://accounts.spotify.com/api/token",
  method: "POST",
  headers: {
    Authorization: "Basic " + btoa(`${clientId}:${clientSecret}`),
    "Content-Type": "application/x-www-form-urlencoded",
  },
  data: {
    grant_type: "client_credentials",
  },
  success: function (response) {
    const accessToken = response.access_token;
    // Store the access token in local storage for later use
    localStorage.setItem("access_token", accessToken);
  },
});

// Later, use the access token to make requests to the Spotify Web API
$(document).ready(function () {
  const accessToken = localStorage.getItem("access_token");

  // Make a request to search for playlists related to a specific mood
  let mood = 'happy'
  $.ajax({
    url: `https://api.spotify.com/v1/search?q=${mood}$&type=playlist&limit=20`,
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
    success: function (response) {
      const playlists = response.playlists.items;
      const songList = $("#song-list");
  
      songList.empty();
      playlists.forEach(function (playlist) {
        const playlistId = playlist.id;
        console.log(response)
  
        $.ajax({
          url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=1`,
          method: "GET",
          headers: {
            Authorization: "Bearer " + accessToken,
          },
          success: function (response) {
            const tracks = response.items;
  
            tracks.forEach(function (track) {
              const songName = track.track.name;
              const artistName = track.track.artists[0].name;
  
              songList.append(`<li>${songName} by ${artistName}</li>`);
            });
          },
          error: function (error) {
            console.error(error);
          },
        });
      });
    },
    error: function (error) {
      console.error(error);
    },
  });
});

// $.ajax({
//   url: "https://accounts.spotify.com/api/token",
//   method: "POST",
//   headers: {
//     Authorization: "Basic " + btoa(`${clientId}:${clientSecret}`),
//     "Content-Type": "application/x-www-form-urlencoded",
//   },
//   data: {
//     grant_type: "client_credentials",
//   },
//   success: function (response) {
//     const accessToken = response.access_token;
//     localStorage.setItem("access_token", accessToken);
//   },
// });

// $(document).ready(function () {
//   const moodInput = $("#mood-input");
//   const mood = localStorage.getItem("mood");
//   if (mood) {
//     moodInput.val(mood);
//   }

//   $("#mood-form").submit(function (event) {
//     event.preventDefault();

//     const mood = moodInput.val();
//     localStorage.setItem("mood", mood);
//     const accessToken = localStorage.getItem("access_token");

//     $.ajax({
//       url: `https://api.spotify.com/v1/search?q=${mood}&type=playlist`,
//       method: "GET",
//       headers: {
//         Authorization: "Bearer " + accessToken,
//       },
//       success: function (response) {
//         const playlists = response.playlists.items;
//         const songList = $("#song-list");
//         console.log(response);

//         songList.empty();
//         playlists.forEach(function (playlist) {
//           const playlistId = playlist.id;

//           $.ajax({
//             url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
//             method: "GET",
//             headers: {
//               Authorization: "Bearer " + accessToken,
//             },
//             success: function (response) {
//               const tracks = response.items;

//               tracks.forEach(function (track) {
//                 const songName = track.track.name;
//                 const artistName = track.track.artists[0].name;

//                 songList.append(`<li>${songName} by ${artistName}</li>`);
//               });
//             },
//           });
//         });
//       },
//       error: function (error) {
//         console.error(error);
//       },
//     });
//   });

//   // Refresh the value of the mood in localStorage on a daily basis
//   setTimeout(function () {
//     localStorage.removeItem("mood");
//     setInterval(arguments.callee, 24 * 60 * 60 * 1000);
//   }, 24 * 60 * 60 * 1000);
// });
