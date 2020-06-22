/**
 * @jest-environment jsdom
 */

const {
    whichIconCrud
} = require("../../js/logic/crudIcon.js");

//which
describe("Does the user can delete or update a comment ? ", () => {
    it("should delete the comment", async () => {
        document.body.innerHTML = `
        <ul> 
        <li> 
        <input id="comment" data-id="1" type="text" value="Bonjour" disabled>
        <i class="fas fa-backspace icon_delete" style="align-self:center"> icone delete</i> <i
            style="margin-left:0.5rem;" class="fa fa-align-left icon_modify" icone update></i>
            </li>
         </ul>`;
        const iconDelete = document.getElementsByClassName("icon_delete")[0]
        const comment = document.getElementById("comment");
        let result = await whichIconCrud(iconDelete, "icon_delete");
        const isCommentDeleted = document.getElementById("comment");
        expect(isCommentDeleted).toBeNull();
    });
    it("should update the comment", async () => {
        document.body.innerHTML = `
        <ul> 
        <li> 
        <input id="comment" data-id="1" type="text" value="Bonjour" disabled>
        <i class="fas fa-backspace icon_delete" style="align-self:center"> icon update</i> <i
            style="margin-left:0.5rem;" class="fa fa-align-left icon_modify" icon update></i>
            </li>
         </ul>`;
        const iconUpdate = document.getElementsByClassName("icon_modify")[0]
        const comment = document.getElementById("comment");
        let result = await whichIconCrud(iconUpdate, "icon_modify");
        const isCommentUpdated = document.getElementById("comment");
        const isItDisabled = isCommentUpdated.disabled;
        expect(isItDisabled).toBe(false);
    });
});