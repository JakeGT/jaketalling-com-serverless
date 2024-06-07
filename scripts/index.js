var lastScrollTop = 0;
var scrollOn = true;
var atTop = true;
var atBottom = false;

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

function preventBehavior(e) {
    e.preventDefault(); 
}

document.addEventListener("touchmove", preventBehavior, {passive: false});

function nextSection() {
    previousSection = Math.floor(window.scrollY/window.innerHeight);
    section = previousSection+1
    sections = document.getElementsByClassName("section");
    if (section <= sections.length && !atBottom) {
        for(i = 0; i < sections.length; i++) {
            sections[i].style.top = (100*(i-section)) + "vh"
        }
        sections[previousSection].classList.add("move-up")
        sections[section].style.opacity = 0;
        setTimeout(() => {
            sections[section].classList.add("fade-in-right")
            sections[section].style.opacity = 1;
        }, 1000)
        setTimeout(() => {
            sections[previousSection].classList.remove("move-up");
            sections[section].classList.remove("fade-in-right");
        }, 2000)
        atTop = false;
    }
    atBottom = section === sections.length - 1;
}

function prevSection() {
    section = Math.floor(window.scrollY/window.innerHeight);
    currentSection = section + 1;
    sections = document.getElementsByClassName("section");
    if (section >= 0 && !atTop) {
        for(i = 0; i < sections.length; i++) {
            sections[i].style.top = (100*(i-section)) + "vh"
        }
        sections[currentSection].classList.add("move-down")
        sections[section].classList.add("move-down")

        setTimeout(() => {
            sections[currentSection].classList.remove("move-down");
            sections[section].classList.remove("move-down")
        }, 2000)
        atBottom = false;
    }
    atTop = section === 0;

}

function detectedScroll(event) {
    if(scrollOn) {
        if (event.deltaY > 0){
            nextSection();
        } else {
            prevSection();
        }
        setTimeout(function() {
            scrollOn = true;
        }, 2100)
        scrollOn = false;
    }
}

var touchPos;

// store the touching position at the start of each touch
document.body.ontouchstart = function(e){
    touchPos = e.changedTouches[0].clientY;
}

// detect wether the "old" touchPos is 
// greater or smaller than the newTouchPos
document.body.ontouchmove = function(e){
    let newTouchPos = e.changedTouches[0].clientY;
    if (scrollOn === true){
        if(newTouchPos > touchPos) {
            prevSection();
        }
        if(newTouchPos < touchPos) {
            nextSection();
        }
        setTimeout(function() {
            scrollOn = true;
        }, 2100)
        scrollOn = false;
    }
}



window.onwheel = detectedScroll;