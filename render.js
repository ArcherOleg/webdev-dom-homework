
import { listElement, nameInputElement, textInputElement, loadingCommentElement, addCommentElement, addFormComment, likes, commentEnd } from './script.js';

// // Добавляем дату нового комментария
const formatDate = (commentDate) => {
  const date = new Date(commentDate);
     
     const formattedDate =
     date.getDate().toString().padStart(2, '0') + '.' +
     (date.getMonth() + 1).toString().padStart(2, '0') + '.' +
     date.getFullYear().toString().slice(-2) + ' ' +
     date.getHours().toString().padStart(2, '0') + ':' +
     date.getMinutes().toString().padStart(2, '0');
     return formattedDate;
   }

// создаем рендер фукцию для добавления разметки html из JS

 const renderComments = (commentsArr) => {
 const commentsHtml = commentsArr.map((comment, index) =>{
 let activeLike = '';
  if (commentsArr[index].isActiveLike) {
     activeLike ='-active-like'
   } 
     return `<li class="comment">
       <div class="comment-header">
         <div>${comment.name}</div>
         <div>${comment.date}</div>
       </div>
       <div class="comment-body">
         <div class="comment-text preline">${comment.text}</div>
       </div>
       <div class="comment-footer">
         <div class="likes">
           <span class="likes-counter">${comment.like}</span>
           <button class="like-button ${activeLike}" data-index='${index}'></button>
         </div>
       </div>
     </li>`
   }
 ).join(''); 

 listElement.innerHTML = commentsHtml;

 loadingCommentElement.style.display = 'none';
 nameInputElement.value = '';
 textInputElement.value = '';
 addCommentElement.style.display = 'none';
 addFormComment.style.display = 'flex';


 likes(commentsArr);
 commentEnd();
 
};
 export {renderComments,formatDate}