import currencyUI from "./currency";
import favoriteTickets from "../store/favorites";

class FavoriteTicketsUI {
  constructor(currency) {
    this.container = document.getElementById("dropdown1");
    this.getCurrencySymbol = currency.getCurrencySymbol.bind(currency);
  }

  renderFavoriteTickets() {
    this.clearContainer();
    const currency = this.getCurrencySymbol();
    const ticketList = favoriteTickets.tickets;

    ticketList.forEach((ticket) => {
      const newTicket = FavoriteTicketsUI.favoriteTicketTemplate(
        ticket,
        currency
      );
      this.container.insertAdjacentHTML("afterbegin", newTicket);
    });
  }

  clearContainer() {
    this.container.innerHTML = "";
  }

  changeBtnStyle(ticket, type, ticketId) {
    if (type === "add") {
      ticket.innerText = "added";
      ticket.setAttribute("disabled", "");
    } else if (type === "remove") {
      const btnContainer = ticket.closest(".btn-container");
      let btn = btnContainer.querySelector(".add-favorite");

      ticket.remove();
      if (btn) {
        btn.removeAttribute("disabled");
        btn.innerText = "add to favorites";
      } else {
        btn = document
          .querySelector(".tickets-sections")
          .querySelectorAll(`[data-id="${ticketId}"]`);

        btn[0].removeAttribute("disabled");
        btn[0].innerText = "add to favorites";
        btn[1].remove();
      }
    }
  }

  renderRemoveFromFavoriteBtn(ticket, ticketId) {
    const removeBtn = FavoriteTicketsUI.removeFromFavoriteBtnTemplate(ticketId);
    const container = ticket.closest(".btn-container");
    container.insertAdjacentHTML("beforeend", removeBtn);
  }

  showEmptyMsg(container) {
    this.clearContainer();
    const msg = FavoriteTicketsUI.emptyMsgTemplate();

    container.insertAdjacentHTML("afterbegin", msg);
  }

  static emptyMsgTemplate() {
    return `Нет избранных билетов`;
  }
  static removeFromFavoriteBtnTemplate(ticketId) {
    return `    <button
    class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto" data-id=${ticketId}
    >Delete from favorites</button
  >`;
  }

  static favoriteTicketTemplate(ticket, currency) {
    return `<div class="favorite-item  d-flex align-items-start">
  <img
    src="${ticket.airline_logo}"
    class="favorite-item-airline-img"
  />
  <div class="favorite-item-info d-flex flex-column">
    <div
      class="favorite-item-destination d-flex align-items-center"
    >
      <div class="d-flex align-items-center mr-auto">
        <span class="favorite-item-city">${ticket.origin_name} </span>
        <i class="medium material-icons">flight_takeoff</i>
      </div>
      <div class="d-flex align-items-center">
        <i class="medium material-icons">flight_land</i>
        <span class="favorite-item-city">${ticket.destination_name}</span>
      </div>
    </div>
    <div class="ticket-time-price d-flex align-items-center">
      <span class="ticket-time-departure">${ticket.departure_at}</span>
      <span class="ticket-price ml-auto">${currency}${ticket.price}</span>
    </div>
    <div class="ticket-additional-info">
      <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
      <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
    </div>
    <div class="btn-container d-flex">
    <button
      class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto" data-id="${ticket.id}"
      >Delete from favorites</button
    >
    </div>
  </div>
</div>`;
  }
}

const favoriteTicketsUI = new FavoriteTicketsUI(currencyUI);

export default favoriteTicketsUI;
