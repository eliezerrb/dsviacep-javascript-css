import Address from "../models/address.js";
import * as addressServices from "../services/address-service.js";
import * as listController from "./list-controller.js";

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
  state.inputNumber.addEventListener("keyup", handleInputNumberKeyup);
  state.btnClear.addEventListener("click", handleBtnClearClick);
  state.btnSave.addEventListener("click", handleBtnSaveClick);
  state.inputCep.addEventListener("change", handleImputCepChange);
}

function handleInputNumberKeyup(event) {
  state.address.number = event.target.value;
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

function handleBtnSaveClick(event) {
  event.preventDefault();

  const errors = addressServices.getErrors(state.address);

  // Cria array com os campos do objeto passado
  const keys = Object.keys(errors);

  if (keys.length > 0) {
    keys.forEach((key) => {
      setFormError(key, errors[key]);
    });

    // Forma classica de percorrer o vetor
    //  for (let i = 0; i < keys.length; i++) {
    //    setFormError(keys[i], errors[keys[i]]);
    //  }
  } else {
    listController.addCard(state.address);
    clearForm;
  }
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

  state.address = new address();

  state.inputCep.focus();
}

// Função para incluir label de erro no elemento
function setFormError(key, value) {
  const element = document.querySelector(`[data-error="${key}"]`);
  element.innerHTML = value;
}
