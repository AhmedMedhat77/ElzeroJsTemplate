// check if there is color in LocalStorage 

let mainColor = localStorage.getItem('color-option');

if (mainColor !== null) {
  //  document.documentElement.dataset.color = window.localStorage.getItem('color-option');
  document.documentElement.style.setProperty('--main-color', window.localStorage.getItem('color-option'));
  // check for active class in colors list 

  // remove active class from all color list items 
  document.querySelectorAll('.colors-list li').forEach(element => {
    element.classList.remove('active');
    // add active class element with data-set color === local storage color
    if (element.dataset.color === window.localStorage.getItem('color-option')) {
      // add active class 
      element.classList.add('active');
    }
  })

}
//random backgound option
let backgroundOption = true
//variable to control the interval
let bgInterval;

//if there 's  background option in local storage 
let backgroundItem = localStorage.getItem('background-option');
//check if random background in local storage is not empty 
if (backgroundItem !== null) {
  if (backgroundItem === 'true') {
    backgroundOption = true;
  }
  else {
    backgroundOption = false;
  }

  // remove all active class from spans 
  document.querySelectorAll('.random-backgrounds span').forEach(element => {
    element.classList.remove('active')
  })
  if (backgroundItem === 'true') {
    document.querySelector('.yes').classList.add('active');
  }
  else {
    document.querySelector('.no').classList.add('active');
  }
}

//active settings box 
let gearIcon = document.querySelector('.fa-gear');
let settingsMenu = document.querySelector('.settings-box');

gearIcon.addEventListener('click', () => {
  settingsMenu.classList.toggle('active')
  gearIcon.classList.toggle('fa-spin');
})

//Switch Colors. 
const colorsLi = document.querySelectorAll('.colors-list li');
colorsLi.forEach(li => {
  li.addEventListener('click', (e) => {
    console.log(e.target.dataset.color);
    // set Color For Root 
    document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
    // set color to local Storage 
    window.localStorage.setItem('color-option', e.target.dataset.color);
    // remove active class from all Chilren 
    e.target.parentElement.querySelectorAll('.active').forEach(element => {
      element.classList.remove('active');
    })
    // add active class on target element 
    e.target.classList.add('active');
  })
})
//Switch background image.  
const randomBackground = document.querySelectorAll('.random-backgrounds span');

randomBackground.forEach(span => {
  span.addEventListener('click', (e) => {
    // remove active class from all Chilren 
    e.target.parentElement.querySelectorAll('.active').forEach(element => {
      element.classList.remove('active');
    })
    // add active class on target element 
    e.target.classList.add('active');

    if (e.target.dataset.background === 'yes') {
      backgroundOption = true;
      randomizeImages();
      console.log(backgroundOption);
      localStorage.setItem('background-option', true);
    }
    else {
      backgroundOption = false;
      clearInterval(bgInterval);
      console.log(backgroundOption);
      localStorage.setItem('background-option', false);

    }
  })
})

// select landing page Element 
let landingPage = document.querySelector('.landing-page');
// get Images Array 
let imagesArray = ['1.jpeg', '2.jpeg', '3.jpeg', '4.jpeg', '5.jpeg'];
//change background image URL 
landingPage.style.backgroundImage = `url(image/)`;

//function to Randomize image 
function randomizeImages() {
  if (backgroundOption === true) {
    bgInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imagesArray.length);
      landingPage.style.backgroundImage = `url(image/${imagesArray[randomNumber]})`
    }, 5000);
  }
}


// select skills 

let ourSkills = document.querySelector('.skills');

window.onscroll = function() {
  // skills section offset top  
  let skillsOffset = ourSkills.offsetTop;
  // skills outer height
  let skillsOuterHeight = ourSkills.offsetHeight;
  // window height 
  let windowHeight = this.innerHeight;
  //window scroll top 
  let windowScrollTop = pageYOffset;
  if (windowScrollTop > (skillsOffset + skillsOuterHeight - windowHeight)) {
    let allSkills = document.querySelectorAll('.skill-box .skill-progress span')
    console.log(allSkills);
    allSkills.forEach(skill => {
      skill.style.width = skill.dataset.progress;
    })
  }

}

// create a popUp Image 

let ourGallary = document.querySelectorAll('.gallary img') 

ourGallary.forEach(img =>{
  img.addEventListener('click', (e)=>{
  // create overlay Element 
  let overLay = document.createElement('div');
  //add overlay Class Name
    overLay.classList.add('popup-overlay');
    // append overlay to body 
    document.body.appendChild(overLay);
    //create the PopUp 
    let popupBox = document.createElement('div');
      popupBox.classList.add('popup-box');
      if (img.alt !== null) {
        // create heading 
        let imageHeading = document.createElement('h3');
        // create text for heading 
        let imgText = document.createTextNode(img.alt);
        //append text to heading 
        imageHeading.appendChild(imgText);
        // append to popup-box
        popupBox.appendChild(imageHeading);
      }
      //create-image
      let popubImage = document.createElement('img');
      //set image src
      popubImage.src = img.src;
      // add image to popub box 
      popupBox.appendChild(popubImage);
      // append box to body 
      document.body.appendChild(popupBox);
      // create the close span 
      let closeBtn = document.createElement('span');
      // Create the close button text 
      let closeBtnText = document.createTextNode('X');
      // Append  text to btn 
      closeBtn.appendChild(closeBtnText);
      closeBtn.className = 'close-btn';
      //add to popup box
      popupBox.appendChild(closeBtn);
  })
})

//close popup 
document.addEventListener('click',(e)=>{
  if(e.target.className == 'close-btn'){
  e.target.parentElement.remove();
  // remove overLay' 
  document.querySelector('.popup-overlay').remove();
  }
})