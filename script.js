"use strict";

import { renderComments } from "./render.js";
import { fetchPromise, postComment } from "./api.js";
// Получеаем доступ к разметке html в JS

 export const buttonElement = document.getElementById("add-button");
 export const listElement = document.getElementById("list");
 export const nameInputElement = document.getElementById("name-input");  
 export const textInputElement = document.getElementById("text-input");
 export const loadingCommentElement = document.getElementById("loadingCommentText");
 export const addCommentElement = document.getElementById('addComment');
 export const addFormComment = document.getElementById('addForm');

 addCommentElement.style.display = 'none';

 //  Получаем данные из API(Сервера)

 export let comments = [];
 


// Добавляем обработчик клика на кнопку "Написать"

buttonElement.addEventListener("click", () => {
   addCommentElement.style.display = 'block';
   addFormComment.style.display = 'none';


   postComment()
   });

    // Отправка коммента с помощью кнопки Enter
 document.addEventListener("keyup", (event) => {
   if (event.key === "Enter") { 
      buttonElement.click(); 
     } 
     });

  // Активность кнопки "Написать"

buttonElement.disabled = true;
 nameInputElement.addEventListener("input", () => {
   if (nameInputElement.value.trim() !== "") {
     buttonElement.disabled = false;
   } else {
     buttonElement.disabled = true; 
   }
 });

//Удаление последнего комментария

const deleteButtonElement = document.getElementById('delete-button');

deleteButtonElement.addEventListener("click", () => { 
const lastCommentIndex = listElement.innerHTML.lastIndexOf( '<li class="comment">' ); 
 if (lastCommentIndex !== -1) {
   listElement.innerHTML = listElement.innerHTML.substring( 0, lastCommentIndex ); 
 } 
 comments.pop();
 renderComments();
});


// Добавляем фукцию активности лайка

 export const likes = (commentsArr) => {
 const likeButtons = document.querySelectorAll('.like-button');
 for (const likeButton of likeButtons) {
       likeButton.addEventListener('click', (e) => {
         e.stopPropagation();
         const index = likeButton.dataset.index;
 if (commentsArr[index].isActiveLike) {
  commentsArr[index].like --;
 } else {
  commentsArr[index].like ++;
   }
   commentsArr[index].isActiveLike = !commentsArr[index].isActiveLike;
   renderComments(commentsArr);
 });
 }
 };

  // Добавляю обработчик клика на комментарий 

 export const commentEnd = () => {
   const allComments = document.querySelectorAll('.comment');
    for (const allComment of allComments) {
     allComment.addEventListener('click', () => {
       textInputElement.value = `> ${allComment.querySelector('.comment-text').innerHTML
       .replaceAll("&amp;", "&")
       .replaceAll("&lt;", "<")
       .replaceAll("&gt;", ">")
       .replaceAll("&quot;", '"')}`
       + `\n\n${allComment.querySelector('.comment-header').children[0].innerHTML
       .replaceAll("&amp;", "&")
       .replaceAll("&lt;", "<")
       .replaceAll("&gt;", ">")
       .replaceAll("&quot;", '"')}`
     })
    }
 }

 fetchPromise();
 console.log("It works!");