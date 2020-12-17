var navBarTabs = document.querySelector('.nav-bar ul');
var portfolioTabs = document.querySelector('.heading ul');
var selectedLine = document.querySelector('.selected-line');
var knowMoreBtn = document.querySelector('.know-more');
var designContainer = document.querySelector('.design-container');
var leftArrow = document.querySelector('.left-arrow');
var rightArrow = document.querySelector('.right-arrow');
var sendBtn = document.querySelector('.send');
var iso = new Isotope('.projects .container', { itemSelector: '.projects .container .card', masonry: { gutter: 32 } });

document.addEventListener("DOMContentLoaded", function (event) {
    var name = document.querySelector('.name');
    var exp = document.querySelectorAll('#experience .left, #experience .right');
    var skillBars = document.querySelectorAll('.skill .skill-bar');
    var options = {
        threshold: 0,
        rootMargin: '-150px 0px -100px'
    };
    var callback = (entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.remove('animate');
            observer.unobserve(entry.target);
        });
    };
    var observer = new IntersectionObserver(callback, options);
    observer.observe(name);
    exp.forEach(elem => observer.observe(elem));
    skillBars.forEach(elem => observer.observe(elem));
});

selectTabs(navBarTabs);
selectTabs(portfolioTabs);

function selectTabs(element) {
    element.addEventListener('click', function (event) {
        var target = event.target;
        var index = +target.dataset.index;

        if (target.dataset && index) {
            animateUnderline(element, index);
            showCards(index);
        } else {
            document.querySelector(target.hash).scrollIntoView({ behavior: 'smooth' });
        }

        event.preventDefault();
        Array.from(element.children).forEach(elem => elem.classList.remove('selected'));
        target.parentElement.classList.add('selected');
    });
}

function animateUnderline(element, index) {
    var setLeft = (count) => { selectedLine.style.left = (count - 1) * 25 + '%'; }
    var setRight = (count) => { selectedLine.style.right = (4 - count) * 25 + '%'; }
    var execFunc = (first, second, index) => {
        first(index);
        setTimeout(() => { second(index) }, 200);
    }

    +element.querySelector('.selected a').dataset.index > index
        ? execFunc(setLeft, setRight, index)
        : execFunc(setRight, setLeft, index);
}

function showCards(index) {
    var getSelection = (index) => {
        switch (index) {
            case 1: return 'card';
            case 2: return 'app';
            case 3: return 'game';
            case 4: return 'design';
        }
    }

    iso.arrange({
        filter: function (itemElem) {
            return itemElem.classList.contains(getSelection(index));
        }
    });
}

knowMoreBtn.addEventListener('click', function (event) {
    document.querySelector('#about-me').scrollIntoView({ behavior: 'smooth' });
});

leftArrow.addEventListener('click', function (event) {
    scrollContainer(false);
});

rightArrow.addEventListener('click', function (event) {
    scrollContainer(true);
});

sendBtn.addEventListener('click', function (event) {
    var name = document.getElementById('fullname');
    var email = document.getElementById('emailid');
    var message = document.getElementById('message');
    var success = document.querySelector('.success');
    var nameRegex = /^[a-zA-Z'-.]+(?: [a-zA-Z'-.]+)?$/;
    var emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var showHideError = (elem, regex) => { (elem.value.trim() === '' || !regex.test(elem.value.trim())) && elem.classList.add('error'); }
    var showSuccessMsg = (msg) => { success.classList.remove('hide-msg'); }

    showHideError(name, nameRegex);
    showHideError(email, emailRegex);

    if (name.classList.contains('error') || email.classList.contains('error') || name.value.trim() === '' || email.value.trim() === '') {
        return;
    }

    Email.send({
        Host: "smtp.gmail.com",
        Username: "faisal.faizansari@gmail.com",
        Password: "rmfdxngxiqltrybp",
        To: "faisal.faizansari@gmail.com",
        From: email.value.trim(),
        Subject: "Message from " + name.value.trim(),
        Body: message.value.trim()
    }).then(showSuccessMsg);

    name.value = '';
    email.value = '';
    message.value = '';
});

function inputChange(event) {
    event.target.classList.remove('error');
}

function scrollContainer(isRight) {
    var cardWidth = 292;
    var scroll = isRight
        ? (Math.floor(designContainer.scrollLeft / cardWidth) + 1) * cardWidth
        : (Math.round(designContainer.scrollLeft / cardWidth) - 1) * cardWidth;

    designContainer.scroll({
        left: scroll,
        behavior: 'smooth'
    });
}