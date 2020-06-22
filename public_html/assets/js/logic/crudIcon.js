import {
  sqlCommentDelete,
  sqlCommentUpdate,
} from '../functions/sql/sqlCommentCrud.js'

//We first need to know which
const whichIconCrud = (item, type) => {
  switch (type) {
    case 'icon_delete':
      return commentDelete(item)

    case 'icon_modify':
      return commentUpdate(item)
    default:
      return
  }
}
const commentDelete = async (item) => {
  try {
    let commentElement = item.previousElementSibling
    let commentId = commentElement.getAttribute('data-id')
    let isItDelete = await sqlCommentDelete(commentId)
    if (!isItDelete) return false
    let li = commentElement.parentElement
    li.parentNode.removeChild(li)
    return true
  } catch (err) {
    console.log(err)
  }
}
const commentUpdate = async (item) => {
  try {
    let commentElement = item.previousElementSibling.previousElementSibling
    let commentId = commentElement.getAttribute('data-id')
    let isItDisabled = commentElement.disabled
    if (isItDisabled) {
      commentElement.disabled = false
      commentElement.style.border = '1px solid white'
    } else {
      commentElement.disabled = true
      commentElement.style.border = 'none'
    }
    let newEvent = await commentElement.addEventListener('blur', () => {
      let input = commentElement.value
      let result = commentUpdateNext(input, commentId)
      return result
    })
    return newEvent
  } catch (err) {
    console.log(err)
  }
}
const commentUpdateNext = async (input, commentId) => {
  try {
    let result = await sqlCommentUpdate(input, commentId)
    return result
  } catch (err) {
    console.log(err)
  }
}
export { whichIconCrud }
