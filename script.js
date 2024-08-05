let B7validator = {
    //função para para o evento padrão do botão enviar
    handleSubmit: (event) => {
        event.preventDefault();

        let send = true;

        let inputs = form.querySelectorAll('input');

        //funçã que vai limpar os erros antes que apareça outro erro
        B7validator.clearErrors();

        for(let i=0; i < inputs.length; i++) {
            let input = inputs[i];
            let check = B7validator.checkInput(input);

            if(check !== true) {
                send = false;

                //função para mostrar o erro
                B7validator.showError(input, check);
            }
        }
        //send = false;

        if(send) {
            form.submit();
        }
    },
    //função que vai verificar se tem regras os inputs
    checkInput:(input) => {
        let rules = input.getAttribute('data-rules');

        //condição paras aber se o input rtem regra ou não
        if(rules !== null) {
            rules = rules.split('|');
            
            //função que vai varificar cada regra dentro do input
            for(let k in rules) {
                let rDetails = rules[k].split('=');

                //aqui você pode criar quantos e quais regras quiser
                switch(rDetails[0]) {
                    case 'required':
                        if(input.value == '') {
                            return 'Campo não pode ser vazio.';
                        }
                    break;
                    case 'min':
                        /*if(input.value.length < rDetails[1]) {
                            return `O campo deve ter pelo menos ${rDetails[1]} caracteres.`;
                        }*/
                            if(input.value.length < rDetails[1]) {
                                return 'Campo tem que ter pelomenos' +rDetails+ ' caracteres';
                            }
                    break;
                    /*case 'email':
                        if(input.value != '') {
                            let regex = /*Expressão regular// 
                            if(!regex.test(input.value.toLowerCase())) {
                                return 'Campo email precisa de um email.';
                            }
                        }
                    break;*/
                }
            }
        }return true;
    },

    //função que vai exibir o erro
    showError:(input, error) => {
        input.style.borderColor = '#ff0000';

        //variavél que vai guardar o texto de erro
        let errorElent = document.createElement('div');
        errorElent.classList.add('error');
        errorElent.innerHTML = error;

        //função que vai adicionar a mengem de error antes do elemento
        //input.parenElement.insertBefore(errorEleent, input);
        input.parentElement.insertBefore(errorElent, input.ElementSibling);
    },
    clearErrors:() => {
        let inputs = form.querySelectorAll('input');
        for(let i=0; i < inputs.length; i++) {
            inputs[i].style = '';
        }

        //função que vai remover o error antigo
        let errorElements = document.querySelectorAll('.error');
        for(let i=0; i < errorElements.length; i++) {
            errorElements[i].remove();
        }
    }
};

let form = document.querySelector('.b7validator');

//função que pega o elemento do botão e colocar a função que criamos
form.addEventListener('submit', B7validator.handleSubmit);