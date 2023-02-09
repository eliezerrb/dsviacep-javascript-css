function State() {
    this.container = null;
    this.btnClose = null;
}

const state = new State();

export function init() {

    state.container = document.querySelector("#modal-contact");
    state.btnClose = document.querySelector("#modal-contact-close");

    state.btnClose.addEventListener('click', handleBtnCloseClick);
    state.container.addEventListener('click', handleContainerClick);
}

export function showModal() {
    state.container.classList.add("active");
}

export function closeModal() {
    state.container.classList.remove("active");
}

function handleBtnCloseClick(event) {
    event.preventDefault();
    closeModal();
}

// Quando clicar fora fechar
function handleContainerClick(event){
    event.preventDefault();

    // this referencia ao elemento onde você escreveu o evento
    // ex:  state.container 
    // this retorna a section 
    // event.target retorna a div (event.taget - pega o componente que disparou o evento)
    if(event.target === this){
        closeModal();
    }

}