const API_KEY = "0a2e5ff1a3e847839f51df40b0d819cc";

const choicesElem = document.querySelector(".js-choise");
const newsList = document.querySelector(".news-list");
const formSearch = document.querySelector(".form-search");
const title = document.querySelector(".title");

const choices = new Choices(choicesElem, {
  searchEnabled: false,
  itemSelectText: "",
});

const getData = async (url) => {
  const response = await fetch(url, {
    headers: {
      "X-Api-Key": API_KEY,
    },
  });

  const data = await response.json();

  return data;
};

const getDateCorrectFormat = (isoDate) => {
  const date = new Date(isoDate);

  const fullDate = date.toLocaleString("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const fullTime = date.toLocaleString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `<span class="news-date">${fullDate}</span> ${fullTime}`;
};

const getImage = (url) =>
  new Promise((resolve) => {
    const image = new Image(270, 200);

    image.addEventListener("load", () => {
      resolve(image);
    });

    image.addEventListener("error", () => {
      image.src = "img/no-photo.jpg";

      resolve(image);
    });

    image.src = url || "img/no-photo.jpg";

    image.className = "news-image";

    return image;
  });

const renderCard = (data) => {
  newsList.textContent = "";

  data.forEach(
    async ({ urlToImage, title, url, description, publishedAt, author }) => {
      const card = document.createElement("li");

      card.className = "news-item";

      // вставляем заглушку вместо картинки

      const image = await getImage(urlToImage);

      image.alt = title;

      card.append(image);

      card.insertAdjacentHTML(
        "beforeend",
        `
				<h3 class="news-title">
				<a href="${url}" target="_blank" class="news-link"
				>${title || ""}</a
				>
			</h3>
			<p class="news-description">
				${description || ""}
			</p>
			<div class="news-footer">
				<time class="news-datetime" datetime="${publishedAt}">
					${getDateCorrectFormat(publishedAt)}
				</time>
				<div class="news-author">${author || ""}</div>
			</div>
		`
      );

      // или так

      //    card.innerHTML += `
      // 		<h3 class="news-title">
      // 			<a href="${url}" target="_blank" class="news-link"
      // 			>${title || ""}</a
      // 			>
      // 		</h3>
      // 		<p class="news-description">
      // 			${description || ""}
      // 		</p>
      // 		<div class="news-footer">
      // 			<time class="news-datetime" datetime="${publishedAt}">
      // 				${getDateCorrectFormat(publishedAt)}
      // 			</time>
      // 			<div class="news-author">${author || ""}</div>
      // 		</div>
      //  `;

      newsList.append(card);
    }
  );
};

const loadNews = async () => {
  newsList.innerHTML = "<li class='preload'></li>";

  const country = localStorage.getItem("country") || "us";

  choices.setChoiceByValue(country);

  title.classList.add("hide");

  const data = await getData(
    `https://newsapi.org/v2/top-headlines?country=${country}&pageSize=10&category=science`
  );

  renderCard(data.articles);
};

const loadSearch = async (value) => {
  const data = await getData(
    `https://newsapi.org/v2/everything?q=${value}&pageSize=10`
  );

  title.classList.remove("hide");

  title.textContent = `Your search "${value}" found ${data.articles.length} results`;

  choices.setChoiceByValue("");

  renderCard(data.articles);
};

// выбор страны

choicesElem.addEventListener("change", (e) => {
  const value = e.detail.value;

  localStorage.setItem("country", value);

  loadNews();
});

// поиск

formSearch.addEventListener("submit", (e) => {
  e.event.preventDefault();

  loadSearch(formSearch.search.value);

  formSearch.reset();
});

loadNews();
