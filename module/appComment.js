
import { token } from "./loginComponent.js";
import { renderComments, renderApp } from "./render.js";
import { format } from "date-fns";

const convertServer = (response, commentArr) => {
    return response.json().then((responseData) => {
        commentArr = responseData.comments;
      commentArr = commentArr.map((comment) => {
        const createDate = format(new Date(comment.date), 'dd/MM/yyyy hh:mm');
        return {
          name: comment.author.name,
          date: createDate,
          textComment: comment.text,
          likes: comment.likes,
          isActiveLike: false,
        }
      });
      if(!token){
        renderComments(commentArr); 
      } else renderApp(commentArr);
           
    })
  }
export {convertServer}