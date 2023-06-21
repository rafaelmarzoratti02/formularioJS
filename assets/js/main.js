class ValidaFormulario{
    constructor(){
        this.formulario = document.querySelector('.formulario')
        this.eventos()

    }

    eventos(){
        this.formulario.addEventListener('submit', e =>{
            this.handleSubmit(e)
        })
    }

    handleSubmit(e){
        e.preventDefault()
        const camposValidos = this.checkFields()
        const senhasValidas = this.checkPassword()

        if(camposValidos & senhasValidas){
            alert('Formulário enviado')
            this.formulario.submit()
        }
    }

    checkPassword(){
        let isValid = true

        const senha = this.formulario.querySelector('.senha');
        const repetirSenha = this.formulario.querySelector('.repetir-senha');

        if(senha.value !== repetirSenha.value){
        
            this.createError(senha, 'As senhas devem ser iguais')
            this.createError(repetirSenha, 'As senhas devem ser iguais')
            valid = false
        }

        if(senha.value.length < 6 || senha.value.length >12){
            
            this.createError(senha, 'Senha precisa estar entre 6 e 12 caracteres')

            isValid = false
        }
        return isValid
    }
    
    checkFields(){
        let isValid = true
        for(let errorText of this.formulario.querySelectorAll('.error-text')){
            errorText.remove()
        }

        for(let field of  this.formulario.querySelectorAll('.validar')){
            const label = field.previousElementSibling.innerText;

            if(!field.value){

                this.createError(field, `Campo "${label}" não pode estar em branco!`)
                isValid= false
            }
            if(field.classList.contains('cpf')){
                if(!this.validaCPF(field)) isValid = false
            }
            if(field.classList.contains('usuario')){
                if(!this.validaUsuario(field)) isValid = false
            }
        }

        return isValid
    }

    createError(field, msg){
        const div = document.createElement('div')
        div.innerHTML = msg;
        div.classList.add('error-text')
        field.insertAdjacentElement('afterend',div)
    }

    validaUsuario(field){
        const usuario = field.value
        let valid =true

        if(usuario.length > 12 || usuario.length < 3){
            this.createError(field,'Usuário precisa ter entre 3 e 12 caracteres')
            valid = false
        }

        if(!usuario.match(/^[a-zA-Z0-9]+$/g)){
            this.createError(field,'O nome do usário deve ter apenas letras e/ou números')
            valid = false
        }
        return valid
    }

    validaCPF(field){
        const cpf = new ValidaCPF(field.value)

        if(!cpf.valida()){
            this.createError(field,'CPF inválido')
            return false
        }
        return true
    }
}


const valida = new ValidaFormulario()