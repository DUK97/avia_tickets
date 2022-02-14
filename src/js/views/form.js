import { compareDates } from "../helpers/date";
import {
  getAutocompleteInstance,
  getDatePickerInstance,
} from "../plugins/materialize";
import TicketsUI from "./tickets";

class FormUI {
  constructor(autocompleteInstance, datePickerInstance) {
    this.$form = document.forms["locationControls"];
    this.origin = document.getElementById("autocomplete-origin");
    this.originAutocomplete = autocompleteInstance(this.origin);
    this.destination = document.getElementById("autocomplete-destination");
    this.destinationAutocomplete = autocompleteInstance(this.destination);
    this.depart = datePickerInstance(
      document.getElementById("datepicker-depart")
    );
    this.return = datePickerInstance(
      document.getElementById("datepicker-return")
    );
  }

  get form() {
    return this.$form;
  }

  get originValue() {
    return this.origin.value;
  }

  get destinationValue() {
    return this.destination.value;
  }

  get departDateValue() {
    return this.depart.toString();
  }

  get returnDateValue() {
    return this.return.toString();
  }

  setAutocompleteData(data) {
    this.originAutocomplete.updateData(data);
    this.destinationAutocomplete.updateData(data);
  }
  validateForm(depart_date, return_date) {
    const compareDeparturtAndReturnDates = compareDates(
      depart_date,
      return_date
    );
    if (compareDeparturtAndReturnDates >= 0) {
      TicketsUI.clearContainer();
      TicketsUI.showMsg("validate");
      return compareDeparturtAndReturnDates;
    }
  }
}

const formUI = new FormUI(getAutocompleteInstance, getDatePickerInstance);

export default formUI;
