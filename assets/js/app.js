// Crete a single card or item where shows people details
function card(data) {
  const div = document.createElement("div");
  div.className = "col-md-4";
  div.innerHTML = `<div class="bg-secondary-subtle py-4 px-2">
  <h3 class="text-center mb-3">${data.person.name}</h3>
  <div class="d-flex align-items-center">
    <img src="${data.squareImage}" alt="" width="200" class="img-fluid me-2">
    <div class="border-start ps-2">
      <p><b>Citizenship:</b> ${data.countryOfCitizenship}</p>
      <p><b>State:</b> ${data.state ? data.state : "unknown"}</p>
      <p><b>City:</b> ${data.city}</p>
      <p><b>Share Price:</b> $${
        data?.financialAssets
          ? data?.financialAssets[0].sharePrice.toFixed(2)
          : ""
      }</p>
    </div>
  </div>
  <p><b>Source:</b> ${data.source}</p>
</div>`;
  return div;
}

// Fetch data from api
const getData = async () => {
  // https://forbes400.onrender.com/api/forbes400/{?limit=10}
  // const URL = `https://forbes400.onrender.com/api/forbes400/?limit=10`;
  const URL = `https://raw.githubusercontent.com/sheik-mostafizur/billionaire-diary-phb7/main/api/data.json`;
  console.log(URL);
  const fetched = await fetch(URL);
  const data = await fetched.json();
  showRichestPeopleItems(data);
  showMoreItems(data);
};
getData();

// show items
function showRichestPeopleItems(data) {
  isLoading(true);
  const riches_peoples = document.getElementById("riches_peoples");
  riches_peoples.innerHTMl = "";
  data &&
    data.slice(0, 10).forEach((singleData) => {
      riches_peoples.appendChild(card(singleData));
    });

  isLoading(false);
}

// show see more items
function showMoreItems(data) {
  isLoading(true);
  data.length = 50;
  const dataLength = data.length;
  const riches_peoples = document.getElementById("riches_peoples");
  const showMoreBtn = document.getElementById("show_more");
  let showItems = 10;

  showMoreBtn.addEventListener("click", function () {
    riches_peoples.innerHTML = "";

    showItems = showItems + 10;

    data &&
      data.slice(0, showItems).forEach((singleData) => {
        riches_peoples.appendChild(card(singleData));
      });
    if (dataLength <= showItems) {
      this.parentElement.innerHTML = "";
    }
  });
  isLoading(false);
}

// is loading
function isLoading(isLoad) {
  const loading = document.getElementById("loading");
  if (isLoad) {
    loading.classList.remove("d-none");
  } else {
    loading.classList.add("d-none");
  }
}
