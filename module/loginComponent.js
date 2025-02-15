import { authorizationUser, registrationUser } from "./optionComment.js"

export let token = null;
export let currentUser =null;




export function renderLogin (appElement,fetchAndRenderComments){
    let isLoginMode = true ;

    const appHtml = `
    <ul class="comments" id="listComments">
    <p>Пожалуйста подождите, комментарии загружаются...</p>
    </ul>
    <p>чтобы добавить комментарий, 
    <a class="text-atoriz" href="#" id="toggleLink">авторизуйтесь</a></p>`;


    appElement.innerHTML = appHtml;
    fetchAndRenderComments();
    document.getElementById('toggleLink').addEventListener('click', () =>{
        renderForm();
    })

    const renderForm = () => {
        appElement.innerHTML =
    `<div class="add-form add-form-registering" id="addForm">
      <h3 >Форма ${isLoginMode ? 'входа' : 'регистрации'}</h3>
      ${isLoginMode ? '' : '<input type="text" class="add-form-register " placeholder="Введите ваше имя" id="inputForRegName" value="" /> <br>'}
      
      <input type="text" class="add-form-register" placeholder="Введите логин" id="inputForRegLogin" value="" />
      <br>
      <input type="password" class="add-form-register" placeholder="Введите пароль" id="inputForRegPassword" value="" />

        <button class="add-form-button" id="buttonReg">${isLoginMode ? 'Войти' : 'Зарегистрироваться'}</button>
        <br>
        <a href="#" class="text_Reg" id='toggleReg'>${isLoginMode ? 'Зарегистрироваться' : 'Войти'}</a>   
      </div>`

      document.getElementById('toggleReg').addEventListener('click', () => {
        isLoginMode = !isLoginMode;
        renderForm();
      })

        document.getElementById('buttonReg').addEventListener('click', () => {
            if (isLoginMode) {
                authorizationUser((newToken) => {
                    token = newToken;
                }, (newUser) => {currentUser = newUser});
            } else {
                registrationUser((newToken) => {
                    token = newToken;
                }, (newUser) => { currentUser = newUser });
            }
        })
    }
}