import {
  FIELDS_COMMENTS
} from "./localisation/account.js";
import {
  sqlCommentCreate
} from "./functions/sql/sqlCommentCrud.js";
import {
  whichIconCrud
} from "./logic/crudIcon.js"

let commentDisplay = (comment, id) => {
  let createLi = document.createElement("li");
  let newComment = `<input data-id=${id} class="comment_retrieved" type="text" value="${comment}" disabled>
  <i class='fas fa-backspace icon_delete' style="align-self:center" ></i><i style="margin-left:0.5rem;" class="fa fa-align-left icon_modify"> </i>`;
  createLi.innerHTML = newComment;
  FIELDS_COMMENTS.insertComment.appendChild(createLi);
};
let crudOperation = async (event) => {
  try {
    let wichOperations = ["icon_delete", "icon_modify"];
    //First we need to capture which icon has been clicked
    wichOperations = wichOperations.filter(element => {
      if (event.target.classList.contains(element)) return element
    })
    //Then we send the type of icon.
    let result = await whichIconCrud(event.target, wichOperations[0]);
    if (result) {
      console.log(result)
      // I Should display a notification to confirm
    } else {
      //I should display an error 
      console.log(result)
    }
  } catch (err) {
    console.log(err)
  }
};
let commentAdd = async () => {
  //Could put this in logic
  try {
    let comment = FIELDS_COMMENTS.inputComment;
    let commentValue = comment.value.trim();
    if (!commentValue) return (comment.dataset.state = "invalid");
    let commentId = await sqlCommentCreate(commentValue);
    console.log(commentId, "COMMENT ID")
    if (!commentId) return FIELDS_COMMENTS.notificationComment.textContent = "An error happened etc."
    commentDisplay(commentValue, commentId);
    FIELDS_COMMENTS.notificationComment.textContent = "Has been added";
    comment.value = "";
  } catch (err) {
    console.log(err)
    FIELDS_COMMENTS.notificationComment.textContent = "An error happened etc."
  }
};
let eventFieldsComments = () => {
  FIELDS_COMMENTS.commentOnSubmit.addEventListener("click", commentAdd);
  FIELDS_COMMENTS.inputComment.addEventListener("focus", () => {
    FIELDS_COMMENTS.inputComment.dataset.state = "";
    FIELDS_COMMENTS.notificationComment.textContent = "";
  });
  FIELDS_COMMENTS.insertComment.addEventListener("click", crudOperation, true);
};
document.addEventListener("DOMContentLoaded", () => {
  eventFieldsComments();
});