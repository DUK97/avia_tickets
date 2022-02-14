import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import { formateDate } from "../helpers/date";

// Init dropdown
const dropdowns = document.querySelectorAll(".dropdown-trigger");
M.Dropdown.init(dropdowns);

// Init select
const select = document.querySelectorAll("select");
M.FormSelect.init(select);

export function getSelectInstance(elem) {
  return M.FormSelect.getInstance(elem);
}

// Init Autocomplete
const autocomplete = document.querySelectorAll(".autocomplete");
M.Autocomplete.init(autocomplete, {
  data: {
    Apple: null,
    Microsoft: null,
    Google: "https://placehold.it/250x250",
  },
});

export function getAutocompleteInstance(elem) {
  return M.Autocomplete.getInstance(elem);
}

// Init datepickers
const datepickers = document.querySelectorAll(".datepicker");

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const day = today.getDate();
const fullToday = `${year} ${month + 1} ${day}`;
const formatedTodayDate = formateDate(fullToday, `yyyy M d`);

M.Datepicker.init(datepickers, {
  showClearBtn: true,
  format: "yyyy-mm-dd",
  minDate: new Date(formatedTodayDate),
});

export function getDatePickerInstance(elem) {
  return M.Datepicker.getInstance(elem);
}
