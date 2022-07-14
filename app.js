// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
const date = document.getElementById('date');
date.innerHTML = new Date().getFullYear();
// ********** close links ************
const navToggle = document.querySelector('.nav-toggle'); //3 dandi
const linksContainer = document.querySelector('.links-container'); //saare links ka parent
const links = document.querySelector('.links'); // uss parent ke andr ke bache

navToggle.addEventListener('click', function(){
    //Problem: If a new link is added then it didn't appear on the linksContainer, this is because
    // we hardcoded the show-links height, now we have to do this dynamically
    // linksContainer.classList.toggle("show-links");
    const containerHeight = linksContainer.getBoundingClientRect().height; //0
    const linksHeight = links.getBoundingClientRect().height; //the height we want
    if(containerHeight==0) { //if links are closed
        linksContainer.style.height = `${linksHeight}px`;
    } 
    else { //if links are already open
        linksContainer.style.height = 0;
    }
}) 
// ********** fixed navbar ************
const navbar = document.getElementById('nav');
const topLink = document.querySelector(".top-link");
window.addEventListener('scroll', function(){
    //get height of scroll
    const scrollHeight = window.pageYOffset;
    //get height of navbar
    const navHeight = navbar.getBoundingClientRect().height;
    if(scrollHeight>navHeight){
        navbar.classList.add("fixed-nav");
    }
    else {
        navbar.classList.remove("fixed-nav");
    }

    // back to top
    if(scrollHeight > 500) {
        topLink.classList.add('show-link');
    }
    else {
        topLink.classList.remove('show-link');
    }
})

// ********** for smooth scroll already added css named "HTML" ************
// select links
const scrollLinks = document.querySelectorAll('.scroll-link');
scrollLinks.forEach(function(link){ //coz we have multiple tags for the same class
    link.addEventListener('click', function(e){
        e.preventDefault(); //no navigation even after clicking
        //navigate to specific spot                  -- slice se # hat jayega 
        const id = e.currentTarget.getAttribute('href').slice(1); //return about, section etc
        const element = document.getElementById(id); //now we have the element

        // calculate the heights
        const navHeight = navbar.getBoundingClientRect().height;
        //containerHeight firse isliye li kuki smaller screen me shi jagah pr ni jara vo
        const containerHeight = linksContainer.getBoundingClientRect().height;
        const fixedNav = navbar.classList.contains("fixed-nav");
                                        // navHeight dhak raha tha islite minus krdia
        let position = element.offsetTop - navHeight; //value of the top of the section in "element"
       
        //when navbar is not fixed then about will not be on correct poisition
        if(!fixedNav){ //have'nt scrolled yet
            position = position -navHeight;
        }

        //smaller screen wala matter fix krne ke liye
        if(navHeight>82){
            position =position+containerHeight;
        }

        window.scrollTo({
            left: 0,
            top: position,
        })
        //close links after clicking one of them
        linksContainer.style.height=0;
    })
})
