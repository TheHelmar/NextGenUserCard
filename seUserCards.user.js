// ==UserScript==
// @name         Better SE User Card overlay
// @namespace    https://github.com/TheHelmar/seUserCards
// @homepage     https://github.com/TheHelmar/seUserCards
// @version      0.3
// @description  Provides a new User Card showing question & answer count
// @author       Helmar
// @match        https://*.stackexchange.com/questions*
// @match        https://*.stackoverflow.com/questions*
// @match        https://*.superuser.com/questions*
// @match        https://*.serverfault.com/questions*
// @match        https://*.askubuntu.com/questions*
// @match        https://*.stackapps.com/questions*
// @match        https://*.mathoverflow.net/questions*
// @downloadURL  https://github.com/TheHelmar/SEReviewStats/raw/master/seUserCards.user.js
// @updateURL    https://github.com/TheHelmar/SEReviewStats/raw/master/seUserCards.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var posts = document.querySelectorAll("div.user-details");
    [].forEach.call(posts, function(posts) {
        //replacing all user flairs
        let userURL = `` + posts.querySelector("a");
        console.log(userURL);
        //Query User Page
        let userPage = document.implementation.createHTMLDocument("");
        let userPageData;
        console.log(userURL);
        $.get(userURL, function(userPageData, status){
            userPage.documentElement.innerHTML = userPageData;
            //Get counts
            let questionCount=/[0-9]+/g.exec(userPage.querySelector("#user-panel-questions > div.subheader.p0.grid.ai-center > h3 > a > span").innerHTML);
            let answerCount=/[0-9]+/g.exec(userPage.querySelector("#user-panel-answers > div.subheader.p0.grid.ai-center > h3 > a > span").innerHTML);
            //Build new User Card
            let newUserCard = `
<table>
<tr>
<td>Questions:  </td>
<td>` + questionCount + `</td>
</tr>
<tr>
<td >Answers:  </td>
<td >` + answerCount + `</td>
</tr>
</table>
`
            //Replace User Flair
            posts.querySelector("div").innerHTML=newUserCard;
        });//userPage
    });//Loop over flairs
})();

