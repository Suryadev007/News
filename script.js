const API_URL = "https://newsapi.org/v2/everything?q=";
const API_KEY = "6d15271afa4b4ee08f3d0292cae6e383";
document.getElementById("date").innerText = new Date()
  .toLocaleString("en-IN")
  .split(",")[0];

function dateTime(publishedAt) {
  const DateTime = new Date(publishedAt).toLocaleString("en-IN").split(",");
  temp = { date: DateTime[0], time: DateTime[1] };
  return temp;
}
let publishedAt = "2024-09-05T17:15:10Z";
const publishedDate = dateTime(publishedAt).date;
console.log(publishedDate);

const cardContainer = document.getElementById("card-container");
const cardTemplate = document.getElementById("news-card-template");

const NewsDataLoader = (data) => {
  cardContainer.innerHTML = "";
  data.forEach((news, index) => {
    if (!news.urlToImage) return;
    const card = cardTemplate.content.cloneNode(true);
    card.querySelector(".click-to-know-more").href = news.url;
    card.querySelector(".card-title").innerText = news.title;
    card.querySelector(".card-image").src = news.urlToImage;
    card.querySelector(".card-description").innerText = news.description;
    card.querySelector(".card-date").innerText = dateTime(
      news.publishedAt
    ).date;
    card.querySelector(".card-time").innerText = dateTime(
      news.publishedAt
    ).time;

    cardContainer.appendChild(card);
  });
};

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    let currentID = null;
    const selectedID = e.target.id;
    const links = document.querySelectorAll(".nav-link");

    links.forEach((link) => {
      if (link.id === selectedID) {
        link.classList.add("active");
        currentID = selectedID;
      } else {
        link.classList.remove("active");
      }
    });
  });
});

async function newsLoader(topic) {
  try {
    const url = API_URL + topic + "&apiKey=" + API_KEY;
    const response = await fetch(url);
    if (!response.ok) {
      document.getElementById("no-news-popup").style.display = "block";
      throw new Error("Error Fetching News");
    }
    const newsData = await response.json();
    NewsDataLoader(newsData.articles);
  } catch (error) {
    console.error(error);
  }
}

document.getElementById("search-form").onsubmit = function (e) {
  e.preventDefault();
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
  });
  const searchInput = document.getElementById("search-input").value;
  searchInput !== "" ? newsLoader(searchInput) : alert("Enter Valid Search");
  document.getElementById("search-input").value = "";
};
