import { renderComments, formatDate } from "./render.js";
import { comments, buttonElement, nameInputElement, textInputElement, addCommentElement, addFormComment} from "./script.js";

const fetchPromise = () => {
    return fetch(
    'https://wedev-api.sky.pro/api/v1/oleg-chernov/comments',
    {
      method: 'GET'
    })
    .then((response) => {
     convertServer(response, comments) 
    })
};
const convertServer = (response, commentsArr) => {
    return response.json().then((responseData) => {
        commentsArr = responseData.comments;
        commentsArr = commentsArr.map((comment) => {
            return {
                name: comment.author.name,
                date: formatDate(comment.date),
                text: comment.text,
                like: comment.likes,
                isActiveLike: false,
            }
        })
        renderComments(commentsArr);
    })
}

const postComment = () => {
    // Защищаем ввод данных
    
     const sanitizeHtml = (htmlString) => {
       return htmlString.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
     };  
    
    // Добавляем новый комменрарий в API
    
     return fetch(
       'https://wedev-api.sky.pro/api/v1/oleg-chernov/comments',
       {
         method: 'POST',
         body: JSON.stringify(
           {
             text: sanitizeHtml(textInputElement.value),
             name: sanitizeHtml(nameInputElement.value),
             forceError:true,
           })
       })
       .then((response) => {
         if(response.status === 201){
           nameInputElement.classList.remove("error");
           textInputElement.classList.remove("error");
           return response.json()
         } if (response.status === 400){
           throw new Error("Плохой запрос");
         } else {
           throw new Error("Сервер не отвечает");
         }
       }) 
       .then(() => {
           nameInputElement.value = '';
           textInputElement.value = '';
           buttonElement.disabled = true;
           fetchPromise()
       })
       .catch((error) => {
         addCommentElement.style.display = 'none';
         addFormComment.style.display = 'flex';
         if (error.message === "Плохой запрос"){
           nameInputElement.classList.remove("error");
           textInputElement.classList.remove("error");
           alert("Вы ввели слишком короткое имя или комментарий")
         } if (error.message === "Сервер не отвечает"){
             postComment()
             fetchPromise()
         }
       }) 
       }
   export {fetchPromise, postComment}