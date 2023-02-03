import Address from "../models/address.js";
import * as addressServices from "../services/address-service.js";

// Guardar informações relevantes do modulo
function State() {
  this.address = new Address();

  this.btnSave = null;
  this.btnClear = null;

  this.inputCep = null;
  this.inputStreet = null;
  this.inputNumber = null;
  this.inputCity = null;

  this.errorCep = null;
  this.errorNumber = null;
}

const state = new State();

export function init() {
  state.inputCep = document.forms.newAddress.cep;
  state.inputStreet = document.forms.newAddress.street;
  state.inputNumber = document.forms.newAddress.number;
  state.inputCity = document.forms.newAddress.city;

  state.btnSave = document.forms.newAddress.btnSave;
  state.btnClear = document.forms.newAddress.btnClear;

  state.errorCep = document.querySelector('[data-error="cep"]');
  state.errorNumber = document.querySelector('[data-error="number"]');

  // Chamando função para tratar o evento de mudança do campo number
  state.inputNumber.addEventListener("change", handleInputNumberChange);
  state.btnClear.addEventListener("click", handleBtnClearClick);
  state.btnSave.addEventListener("click", handleBtnSaveClick);
  state.inputCep.addEventListener("change", handleImputCepChange);
}

async function handleImputCepChange(event) {
  const cep = event.target.value;

  try {
    const address = await addressServices.findByCep(cep);

    state.inputCity.value = address.city;
    state.inputStreet.value = address.street;
    state.address = address;

    setFormError("cep", "");
    state.inputNumber.focus;
  } catch (e) {
    state.inputStreet.value = "";
    state.inputCity.value = "";

    setFormError("cep", "Informe um cep válido");
  }
}

async function handleBtnSaveClick(event) {
  event.preventDefault();
  console.log(event.target);
}

// Função para tratar o evento de mudança do campo number
function handleInputNumberChange(event) {
  if (event.target.value == "") {
    setFormError("number", "Campo requerido");
  } else {
    setFormError("number", "");
  }
}

// Função para tratar o evento click do botão limpar
function handleBtnClearClick(event) {
  event.preventDefault();
  clearForm();
}

function clearForm() {
  state.inputCep.value = "";
  state.inputCity.value = "";
  state.inputNumber.value = "";
  state.inputStreet.value = "";

  setFormError("cep", "");
  setFormError("number", "");

  state.inputCep.focus();
}

// Função para incluir label de erro no elemento
function setFormError(key, value) {
  const element = document.querySelector(`[data-error="${key}"]`);
  element.innerHTML = value;
}
