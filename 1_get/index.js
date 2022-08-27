const apiKey = "OoQqgPS8ckk08RVrN8BvC924MoBJOE1s";
const limit = 5;
const offset = 0;

function onSearch() {
  let search = document.getElementById("userSearch").value;

  fetch(
    `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=${apiKey}&q=&limit=${limit}&offset=${offset}&rating=r&lang=en`
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      response.data.forEach((element) => {
        let iframe = document.createElement("iframe");
        iframe.src = element.embed_url;
        iframe.className = "gif";

        document.getElementById("container").appendChild(iframe);
      });
    })
    .catch((error) => console.log(error));
}
