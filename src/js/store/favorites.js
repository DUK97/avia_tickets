import locations from "./locations";

class FavoriteTickets {
  constructor() {
    this.favoriteTickets = [];
  }

  addToFavorite(ticket) {
    this.favoriteTickets.push(ticket);
  }

  get tickets() {
    return this.favoriteTickets;
  }

  removeFavorite(ticket) {
    console.log(ticket, this.favoriteTickets);
    const ticketPos = this.favoriteTickets.indexOf(ticket);
    this.favoriteTickets.splice(ticketPos, 1);
  }
}

const favoriteTickets = new FavoriteTickets();

export default favoriteTickets;
