import './style.scss';
var loader = document.querySelector('.loader');
var navBarTabs = document.querySelector('.nav-bar ul');
var portfolioTabs = document.querySelector('.heading ul');
var selectedLine = document.querySelector('.selected-line');
var iso = new Isotope('.projects .container', { itemSelector: '.projects .container .card', masonry: { gutter: 32 } });

window.addEventListener("load", () => { loader.classList.add('hide') })

document.addEventListener("DOMContentLoaded", function (event) {
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
    const cardList = ['card', 'app', 'game', 'design'];

    iso.arrange({
        filter: function (itemElem) {
            return itemElem.classList.contains(cardList[index - 1]);
        }
    });
}