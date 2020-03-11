'use strict';

let screenWidth = window.innerWidth;
let mainNav = document.querySelectorAll('.main-nav');
let mainNavClose = document.querySelectorAll('.main-nav--toggle');
let mainNavItem = document.querySelectorAll('.main-nav__item');

let scrollDownPage = document.querySelectorAll('.button-scroll');

let navPopupBurger = document.querySelectorAll('.popup-menu-btn');

let blockNineSetofPictures = document.querySelector('.contacts__set-of-pictures');
let blockNineGoogleMap = document.querySelector('.contacts__wrapper-google-map');
let blockNineShowMapBtn = document.querySelector('.contact__button--show-map');
let blockNineCloseMapBtn = document.querySelector('.contacts__wrapper-google-map');

let blockSevenuserShowCommentBtn = document.querySelector('.user-info__btn-show-full-comment');
let blockSevenUserPhoto = document.querySelector('.user-info__photo');
let blockSevenUserName = document.querySelector('.user-info__name');
let blockSevenUserAge = document.querySelector('.user-info__age');
let blockSevenUserComment = document.querySelector('.user-info__user-comment');

let blockTwoYogaTypeName = document.querySelector('.yoga-description__main-second-half-title');
let blockTwoYogaTypeText = document.querySelector('.yoga-description__text');

let blockFourInstructorName = document.querySelector('.our-instructor__name');
let blockFourInstructorShortData = document.querySelector('.our-instructor__experience:first-child');
let blockFourInstructorFullData = document.querySelector('.our-instructor__experience:nth-child(2)');
let blockFourInstructorPhoto = document.querySelector('.our-instructor__picture');
let blockFourInstructorList = document.querySelectorAll('.our-instructor__teacher-item');


let jsonCommentsData = '../database/dataInfo.json';
let request = new XMLHttpRequest();
request.open('GET', jsonCommentsData);
request.responseType = 'json';
request.send();


request.onload = function() {
    let superHeroes = request.response;
    blockSevenShowUserinfo(superHeroes);
};

function blockSevenShowUserinfo(jsonObj) {

        let data = jsonObj['userNamesofComments'];
        let users = {};

        let dataYogaTypes = jsonObj['yogaTypes'];
        let yogaTypes = {};

        let dataYogaTeachers = jsonObj['yogaTeachers'];
        let yogaTeachers = {};

        data.forEach(({name, age, comment, photo}) => {
            users[`${name}`] = {name, age, comment, photo};
        });

        let comments = document.querySelector(".user-info__user-comment-list")
        comments.onclick = (event) => {

            if (event.target.classList.contains("user-info__user-comment-item",)) {
                {
                    let userID = event.target.textContent;

                    if (users[`${userID}`]) {

                        let {name, age, comment, photo} = users[`${userID}`];

                        blockSevenUserName.innerHTML = `${name}`;
                        blockSevenUserAge.innerHTML = `${age}`;
                        blockSevenUserComment.innerHTML = `${comment}`;
                        blockSevenUserPhoto.src = `${photo}`;
                    }
                }
            }
        };

        dataYogaTypes.forEach(({name, description}) => {
            yogaTypes[`${name}`] = {name, description};
        });

        let yogaType = document.querySelector(".yoga-description__yoga-type")
        yogaType.onclick = (event) => {
            if (event.target.classList.contains("yoga-description__yoga-item",)) {
                {
                    let yogaID = event.target.textContent;

                    if (yogaTypes[`${yogaID}`]) {

                        let {name, description} = yogaTypes[`${yogaID}`];

                        blockTwoYogaTypeName.innerHTML = `${name}`;
                        blockTwoYogaTypeText.innerHTML = `${description}`;
                    }
                }
            }
        };

        dataYogaTeachers.forEach(({name, shortDescription, fullDescription}) => {
            yogaTeachers[`${name}`] = {name, shortDescription, fullDescription};
        });

        let yogaTeacher = document.querySelector(".our-instructor__teacher-list")
        yogaTeacher.onclick = (event) => {

            let blockFourInstructorData = document.querySelector('.our-instructor__experience:nth-child(3)');
            blockFourInstructorData.style.display = 'none';

            if (event.target.classList.contains("our-instructor__teacher-item",)) {
                {
                    let teacherID = event.target.textContent;

                    if (yogaTeachers[`${teacherID}`]) {

                        let {name, shortDescription, fullDescription} = yogaTeachers[`${teacherID}`];

                        blockFourInstructorName.innerHTML = `${name}`;
                        blockFourInstructorShortData.innerHTML = `${shortDescription}`;
                        blockFourInstructorFullData.innerHTML = `${fullDescription}`;
                    }
                }
            }
        }
    }

function ShowMenu() {
    for (let mainNavItems = 0; mainNavItems < mainNav.length; mainNavItems++) {
        mainNav[mainNavItems].classList.add('menu-active');

        if (screenWidth <= 599) {
            document.body.style.overflow = 'hidden';
        }
    }

    for (let i = 0; i < navPopupBurger.length; i++) {
        navPopupBurger[i].style.visibility = 'hidden';
    }
}

function CloseMenu() {
    for (let mainNavItems = 0; mainNavItems < mainNav.length; mainNavItems++) {
        mainNav[mainNavItems].classList.remove('menu-active');

        if (screenWidth <= 599) {
            document.body.style.overflowY = 'auto';
        }
    }

    for (let i = 0; i < navPopupBurger.length; i++) {
        navPopupBurger[i].style.visibility = 'visible';
    }
}

for (let navPopupBurgerCounter = 0; navPopupBurgerCounter < navPopupBurger.length; navPopupBurgerCounter++) {
    navPopupBurger[navPopupBurgerCounter].addEventListener('mouseover', ShowMenu);
    navPopupBurger[navPopupBurgerCounter].addEventListener('click', ShowMenu);
}

for (let buttonScroll = 0; buttonScroll < scrollDownPage.length; buttonScroll++) {
    scrollDownPage[buttonScroll].addEventListener('click', event => {
        scrollBy(0, 500);
    })
}

for (let mainNavCloseCounter = 0; mainNavCloseCounter < mainNavClose.length; mainNavCloseCounter++) {
    mainNavClose[mainNavCloseCounter].addEventListener('click', CloseMenu);
}

for (let mainNavItemCounter = 0; mainNavItemCounter < mainNavItem.length; mainNavItemCounter++) {
    mainNavItem[mainNavItemCounter].addEventListener('click', CloseMenu);
}

for (let mainNavCounter = 0; mainNavCounter < mainNav.length; mainNavCounter++) {
    mainNav[mainNavCounter].addEventListener('mouseleave', CloseMenu);
}

blockSevenuserShowCommentBtn.addEventListener('click', event => {
    if(blockSevenuserShowCommentBtn.innerHTML === 'Читать полностью') {
        blockSevenuserShowCommentBtn.innerHTML = 'закрыть';
    }
    else if (blockSevenuserShowCommentBtn.innerHTML === 'закрыть') {
        blockSevenuserShowCommentBtn.innerHTML = 'Читать полностью';
    }
});

blockNineShowMapBtn.addEventListener('click', event => {
    blockNineGoogleMap.style.visibility = 'visible';
    blockNineSetofPictures.style.visibility = 'hidden';
});

blockNineCloseMapBtn.addEventListener('click', event => {
    blockNineGoogleMap.style.visibility = 'hidden';
    blockNineSetofPictures.style.visibility = 'visible';
});

/*
for (let instuctorCount = 0; instuctorCount < blockFourInstructorList.length; instuctorCount++) {
    blockFourInstructorList[instuctorCount].addEventListener('click', event => {

        if (blockFourInstructorList[instuctorCount].innerText === 'Максим Казаков') {
                blockFourInstructorPhoto.src = '../img/04-block.our-instructor_nastya.png';
                //blockFourInstructorPhoto.setAttribute('src', '../img/04-block.our-instructor_nastya.png');
                console.log(blockFourInstructorPhoto)
        }
        else if (blockFourInstructorList[instuctorCount].innerText === 'Настя Антипова') {
            blockFourInstructorPhoto.src = '../img/04-block.our-instructor_nastya.png';
        }
    })
}
*/

/*
function ShowPhoto() {

 for (let instructorCount = 0; instructorCount < blockFourInstructorList.leght; instructorCount++) {
     if (blockFourInstructorList[instructorCount].innerText === 'Максим Казаков') {
         document.body.style.color = 'red';
     }
     else if (blockFourInstructorList[instructorCount].innerText === 'Настя Антипова') {
         document.body.style.color = 'blue';
     }
 }
 console.log('нажатие')
}
*/

/*
    let blockFourInstructorList = document.querySelector('.our-instructor__teacher-list');

    blockFourInstructorList.addEventListener('click', event => {

        for (let instructorCount = 0; instructorCount < blockFourInstructorList.leght; instructorCount++) {
            if (blockFourInstructorList[instructorCount].innerText === 'Максим Казаков')
            blockFourInstructorList[instructorCount].style.color = 'red';
            console.log('нажатие');

        }
});

            //if(blockFourInstructorList[instructorCount].innerHTML === 'Максим Казаков') {
               // blockFourInstructorPhoto.src = '../img/04-block.our-instructor_katya.png'
               // document.body.style.backgroundColor = 'red';

           // }


   // }

"../img/04-block.our-instructor_1080px.png"
"../img/04-block.our-instructor_nastya.png"
"photos" : "../img/04-block.our-instructor_mariya.png",
../img/04-block.our-instructor_sergei.png

*/
