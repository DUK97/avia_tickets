import "../css/style.css";
import "./plugins";
import locations from "./store/locations";
import formUI from "./views/form";
import ticketsUI from "./views/tickets";
import currencyUI from "./views/currency";
import favoriteTickets from "./store/favorites";
import favoriteTicketsUI from "./views/favorite";

document.addEventListener("DOMContentLoaded", (e) => {
  const form = formUI.form;
  const container = document.querySelector(".tickets-sections .row");
  const favoriteContainer = document.getElementById("dropdown1");
  const showFavoriteContainer = document.querySelector(".dropdown-trigger");

  // Events
  initApp();
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    onFormSubmit();
  });

  container.addEventListener("click", addTicketToFavorite);
  favoriteContainer.addEventListener("click", addTicketToFavorite);
  showFavoriteContainer.addEventListener("click", showEmptyFavorites);

  // handlers

  async function initApp() {
    await locations.init();
    formUI.setAutocompleteData(locations.shortCities);
  }

  async function onFormSubmit() {
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currecyValue;

    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });

    ticketsUI.renderTickets(locations.lastSearch);
  }

  function addTicketToFavorite({ target }) {
    if (target.classList.contains("add-favorite")) {
      const ticket = locations.getTicketById(target.dataset.id);
      const ticketId = target.dataset.id;
      favoriteTicketsUI.changeBtnStyle(target, "add");
      favoriteTicketsUI.renderRemoveFromFavoriteBtn(target, ticketId);
      favoriteTickets.addToFavorite(ticket);
      favoriteTicketsUI.renderFavoriteTickets();
    } else if (target.classList.contains("delete-favorite")) {
      const ticket = locations.getTicketById(target.dataset.id);
      const ticketId = target.dataset.id;
      favoriteTicketsUI.changeBtnStyle(target, "remove", ticketId);
      favoriteTickets.removeFavorite(ticket);
      favoriteTicketsUI.renderFavoriteTickets();
    }
  }
  function showEmptyFavorites() {
    if (!favoriteTickets.tickets.length) {
      favoriteTicketsUI.showEmptyMsg(favoriteContainer);
    }
  }
});
