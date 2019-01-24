'use strict';
function _toConsumableArray(b) {
    if (Array.isArray(b)) {
        for (var c = 0, d = Array(b.length); c < b.length; c++) 
            d[c] = b[c];
        return d
    }
    return Array.from(b)
}
var loader = document.querySelector('.loader');
loader
    .parentElement
    .removeChild(loader);
var getOffsetTop = function (c) {
        var d = c.getBoundingClientRect(),
            f = document.body,
            g = document.documentElement,
            h = window.pageYOffset || g.scrollTop || f.scrollTop,
            j = g.clientTop || f.clientTop || 0,
            k = d.top + h - j;
        return k
    },
    navigation = document.querySelector('#nav'),
    navigationOpenIcon = navigation.querySelector('.nav-sm-icon'),
    navigationListWrapper = navigation.querySelector('.nav-ul-wrapper'),
    navigationList = navigationListWrapper.querySelector('.nav-ul'),
    navigationSpy = navigationListWrapper.querySelector('.nav-spy'),
    navigationListItems = navigationList.querySelectorAll('li'),
    navigationListItemsAnchors = navigationList.querySelectorAll('a'),
    headerBtnsWrapper = document.querySelector('.header-btn-wrapper'),
    currentActiveListItem = navigationListItems[0],
    navSpyFollowingOffFlag = !1,
    navigatingThroughLinksUnviableFlag = !1,
    relocateNavigationSpy = function (b) {
        var g = 1 < arguments.length && arguments[1] !== void 0
            ? arguments[1]
            : !0;
        g && (currentActiveListItem = b);
        var c = b.getBoundingClientRect(),
            d = b.clientHeight,
            f = b.clientWidth;
        navigationListItemsAnchors.forEach(function (h) {
            return b.childNodes[0] == h
                ? h
                    .classList
                    .add('active')
                : h
                    .classList
                    .remove('active')
        }),
        navigationSpy.style.left = c.x,
        navigationSpy.style.top = c.y,
        navigationSpy.style.height = d,
        navigationSpy.style.width = f
    };
relocateNavigationSpy(currentActiveListItem),
window.onresize = function () {
    relocateNavigationSpy(currentActiveListItem)
},
headerBtnsWrapper
    .childNodes
    .forEach(function (b, c) {
        var d;
        0 == c && (d = 1),
        2 == c && (d = 2),
        d && b.addEventListener('click', navLiClick.bind(navigationListItems[d]))
    }),
navigationOpenIcon.addEventListener('click', function () {
    return navigationListWrapper
        .classList
        .toggle('open')
}),
navigationListItems.forEach(function (b) {
    b.addEventListener('click', navLiClick),
    b.addEventListener('mouseenter', navLiHover),
    b.addEventListener('mouseleave', navLiMouseLeave)
});
function navLiHover() {
    relocateNavigationSpy(this, !1)
}
function navLiClick(b) {
    if (b.preventDefault(), !navigatingThroughLinksUnviableFlag) {
        var c = Array.from(navigationListItems),
            d = this
                .childNodes[0]
                .getAttribute('href'),
            f = c.indexOf(currentActiveListItem),
            g = c.indexOf(this),
            h = 400 * Math.abs(g - f) + 300,
            j = document.querySelector(d),
            k = getOffsetTop(j);
        navSpyFollowingOffFlag = !0,
        navigatingThroughLinksUnviableFlag = !0,
        setTimeout(function () {
            navSpyFollowingOffFlag = !1,
            navigatingThroughLinksUnviableFlag = !1
        }, h),
        zenscroll.toY(k - 200, h),
        relocateNavigationSpy(this)
    }
}
function navLiMouseLeave() {
    this != currentActiveListItem && relocateNavigationSpy(currentActiveListItem)
}
var stackSection = document.querySelector('#stack'),
    techStackCards = stackSection.querySelectorAll('.tech-stack-item'),
    sections = [].concat(_toConsumableArray(document.querySelectorAll('section')), [
        document.querySelector('header'),
        document.querySelector('footer')
    ]),
    windowHeight = window.innerHeight,
    activeTechStackCardsIndexes = [];
window.addEventListener('scroll', revealTechStackCardsOnScroll),
window.addEventListener('scroll', followWindowToRelocateNavigationSpyBasedOnCurrentSection);
var currentNavigationListItemName = void 0;
function followWindowToRelocateNavigationSpyBasedOnCurrentSection() {
    var b = document.documentElement.scrollTop || document.body.scrollTop;
    sections.forEach(function (c) {
        var f = getOffsetTop(c),
            g = c.clientHeight;
        if (b + windowHeight / 1.5 > f && b + windowHeight / 1.5 < f + g) {
            currentNavigationListItemName = '#' + c.id;
            var h,
                j = c.querySelector('.section-name');
            j && j
                .classList
                .add('active'),
            navSpyFollowingOffFlag || (navigationListItems.forEach(function (k) {
                return k
                    .childNodes[0]
                    .getAttribute('href') == '#' + c.id
                    ? h = k
                    : h = h
            }), relocateNavigationSpy(h))
        }
    })
}
function revealTechStackCardsOnScroll() {
    techStackCards
        .forEach(function (b, c) {
            if (!activeTechStackCardsIndexes.includes(c)) {
                var f = activeTechStackCardsIndexes.length - 1,
                    g = activeTechStackCardsIndexes[f] || 0,
                    _item$getBoundingClie = b.getBoundingClientRect(),
                    d = _item$getBoundingClie.y;
                if (1.3 * d < windowHeight && c >= g) {
                    setTimeout(function () {
                        activeTechStackCardsIndexes.includes(c) || activeTechStackCardsIndexes.push(c),
                        b
                            .classList
                            .remove('hidden')
                    }, 350 * (c - g))
                }
            }
        }),
    techStackCards.length == activeTechStackCardsIndexes.length && window.removeEventListener('scroll', revealTechStackCardsOnScroll)
}
var cardContents = stackSection.querySelectorAll('.tech-stack-item-content');
cardContents.forEach(function (b) {
    return b.addEventListener('mouseenter', function (d) {
        cardContents
            .forEach(function (f) {
                return f == d.target
                    ? toggleCard(f.parentNode)
                    : f
                        .parentNode
                        .classList
                        .add('filter')
            })
    })
}),
cardContents.forEach(function (b) {
    return b.addEventListener('mouseleave', function (d) {
        cardContents
            .forEach(function (f) {
                return f == d.target
                    ? toggleCard(f.parentNode)
                    : f
                        .parentNode
                        .classList
                        .remove('filter')
            })
    })
});
function toggleCard(b) {
    var c = b.querySelector('.tech-item-box');
    if (b.classList.contains('hovered')) 
        return (b.classList.remove('hovered'), !c)
            ? void 0
            : (c.classList.remove('active'), void(c.classList.contains('trans') && c.classList.remove('trans')));
    b
        .classList
        .add('hovered');
    c && (c.classList.add('active'), setTimeout(function () {
        c
            .classList
            .add('trans')
    }, 100))
}
var $footer_form = $('#footer').find('form');
$footer_form.on('submit', footerForm_submit);
function footerForm_submit(b) {
    b.preventDefault();
    var c = $(this).serialize();

    $footer_form[0].reset();

    $
        .ajax({url: 'https://blogspot-node.herokuapp.com/email', type: 'POST', data: c})
        .done(() => alert('Wiadomość została wysłana.'));
}