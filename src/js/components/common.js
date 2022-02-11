$(window).on("load", function () {
    $('.scroll_to').click(function (e) {
        /*variables*/
        var jump = $(this).attr('href');
        var new_position = $(jump).offset();
        let dropdownLink = $(".list__item.highlighted");
        let dropdownHeaderMenu = $(".header__navigation-dropdown");
        let burger = $(".nav__burger");
        let mobileNavBar = $(".navigation__mobile-links");
        let dropdownAccordionLink = $(".list__item-mobile.highlighted .dropdown-link");
        let mobileAccordion = $(".navigation__mobile-accordion");
        /*variables classes*/
        dropdownLink.removeClass("clicked");
        dropdownHeaderMenu.removeClass("d-flex");
        burger.removeClass("change");
        mobileNavBar.addClass('d-none').removeClass('d-flex');
        dropdownAccordionLink.removeClass("clicked");
        mobileAccordion.removeClass("d-flex");
        /*scroll animation*/
        $('html, body').stop().animate({ scrollTop: new_position.top }, 500);
        e.preventDefault();
    });
});

$(document).ready(function () {
    /*fixed positioned header onScroll*/
    function ScrollHeader() {
        let header = document.querySelector(".header");
        let sticky = header.offsetTop;
        if (window.pageYOffset > sticky) {
            header.classList.add("sticky");
            TopArrow.show();
        } else {
            header.classList.remove("sticky");
            TopArrow.hide();
        }
    }

    window.addEventListener('scroll', function () {
        ScrollHeader();
    });

    /*languagepicker active language toggling*/
    (function toggleLanguage() {
        let language = $(".languagepicker .lang")
        let russian = $(".languagepicker .lang.russian")
        let english = $(".languagepicker .lang.english")
        language.click(function () {
            if ($(this).hasClass("english")) {
                $(this).removeClass("activelanguage");
                russian.addClass('activelanguage');
            }
            else if ($(this).hasClass("russian")) {
                $(this).removeClass("activelanguage");
                english.addClass('activelanguage');
            }
        });
    })();

    (function toggleHederDropdownMenu() {
        /*dropdown menu appearance when a voting button is being clicked*/
        let dropdownLink = $(".list__item.highlighted");
        let dropdownHeaderMenu = $(".header__navigation-dropdown");
        dropdownLink.click(function () {
            $(this).toggleClass("clicked");
            dropdownHeaderMenu.toggleClass("d-flex");
        });
        let dropdownAccordionLink = $(".list__item-mobile.highlighted .dropdown-link");
        let mobileAccordion = $(".navigation__mobile-accordion");
        dropdownAccordionLink.click(function () {
            $(this).toggleClass("clicked");
            mobileAccordion.toggleClass("d-flex");
        });
    })();

    (function toggleMobileNavBar() {
        /*mobile navigation bar toggling when a burger is being clicked*/
        let burger = $(".nav__burger");
        let mobileNavBar = $(".navigation__mobile-links");
        burger.click(function () {
            mobileNavBar.toggleClass('d-none');
            mobileNavBar.toggleClass('d-flex');
            $(this).toggleClass("change");
        });
    })();

    /*progress bar calculation*/
    (function calcProgressVotingValue() {
        $.each($('.nominant__card'), function () {
            let progressbar = $(this).find(".progressbar");
            let value = progressbar.val();
            let progressValue = $(this).find('.progress-value');
            progressValue.html(value + '%');
        });
    })();

    (function initSliders() {
        let participantsSlider = $('.main-nav-tabs-slider');
        let newsSlider = $('.news__cards-slider');
        let partnersSlider = $('.partners__content-slider');
        let feedbacksSlider = $('.feedbacks__content-slider');

        /*participants slider logic*/
        participantsSlider.slick({
            infinite: true,
            arrows: false,
            dots: false,
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                }
            ]
        });
        $('.main-nav-tabs-slider .slick-slide').click(function () {
            $(this).siblings().find('.nav-item.nav-link').removeClass('active');
        });

        /*news slider logic*/
        newsSlider.slick({
            infinite: false,
            arrows: true,
            dots: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1199,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        arrows: true,
                        prevArrow: $('.prev-arrow'),
                        nextArrow: $('.next-arrow')
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                        rows: 0
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        infinite: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                        rows: 0
                    }
                }
            ]
        });

        let newsSliderArrow = $('.news__cards-slider-arrows .arrow');
        newsSliderArrow.click(function () {
            $('.news__cards-slider-arrows .arrow.active-arrow').removeClass('active-arrow');
            $(this).addClass('active-arrow');
        });

        /*partners slider logic*/
        let pagintationCurrentSlide = $('.pagination-current__slide');
        let pagintationTotalSlides = $('.pagintaion-total__slides');

        partnersSlider.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
            if (!slick.$dots) {
                return;
            }
            let currentPage = (currentSlide ? currentSlide : 0) + 1;
            let totalSlides = slick.$dots[0].children.length;
            pagintationCurrentSlide.text('0' + currentPage + '/');
            pagintationTotalSlides.text('0' + totalSlides);
        });

        partnersSlider.slick({
            infinite: false,
            slidesPerRow: 4,
            rows: 2,
            dots: true,
            arrows: true,
            prevArrow: $('.slider-prev-arrow'),
            nextArrow: $('.slider-next-arrow'),
            responsive: [
                {
                    breakpoint: 1199,
                    settings: {
                        slidesPerRow: 3,
                        rows: 2
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesPerRow: 2,
                        rows: 2
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesPerRow: 2,
                        rows: 1
                    }
                }
            ]
        });

        let partnersSliderArrow = $('.partners__content-slider-controls .arrow');
        partnersSliderArrow.click(function () {
            $('.partners__content-slider-controls .arrow.active-arrow').removeClass('active-arrow');
            $(this).addClass('active-arrow');
        });

        /*feedbacks slider logic*/
        feedbacksSlider.slick({
            infinite: false,
            arrows: true,
            dots: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: $('.feedbacks-slider-prev-arrow'),
            nextArrow: $('.feedbacks-slider-next-arrow'),
            autoplay: true,
            autoplaySpeed: 15000,
            pauseOnHover: true,
            pauseOnFocus: true,
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        arrows: false
                    }
                }
            ]
        });

        /*resize function for slider*/
        $(window).resize(function () {
            participantsSlider.not('.slick-initialized').slick('resize');
            newsSlider.not('.slick-initialized').slick('resize');
            partnersSlider.not('.slick-initialized').slick('resize');
            feedbacksSlider.not('.slick-initialized').slick('resize');
        });

        $(window).on('orientationchange', function () {
            participantsSlider.not('.slick-initialized').slick('resize');
            newsSlider.not('.slick-initialized').slick('resize');
            partnersSlider.not('.slick-initialized').slick('resize');
            feedbacksSlider.not('.slick-initialized').slick('resize');
        });
    })();

    /*Scroll to top arrow*/
    const TopArrow = $(".top_button");
    TopArrow.click(function () {
        $('html,body').animate({ scrollTop: 0 }, 'fast');
    });

    /*counter*/
    (function initiCounter() {
        let time = parseInt($('#counter').data('timeto')); /*Monday, 19 October, 2020 year, 0:00:00; in timestamp*/
        let startDate = new Date(time).getTime();
        let now = new Date().getTime();
        let distance = Math.round((startDate - now) / 1000);
        var timer;

        let days = $(".counter__days");
        let hours = $(".counter__hours");
        let minutes = $(".counter__minutes");
        let second = $(".counter__seconds");

        function updateClock() {
            now = new Date().getTime();
            let distance = Math.round((startDate - now) / 1000);

            var d = Math.floor(distance / (24 * 60 * 60));
            distance = distance - (d * 24 * 60 * 60);

            var h = Math.floor(distance / (60 * 60));
            distance = distance - (h * 60 * 60);

            var m = Math.floor(distance / (60));
            distance = distance - (m * 60);

            var s = distance;

            days.html(d);
            hours.html(h)
            minutes.html(m)
            second.html(s)
        }

        timer = setInterval(updateClock, 1000);

        if (distance < 0) {
            clearInterval(timer);
            days.html("0");
            hours.html("0")
            minutes.html("0")
            second.html("0")
            $('.opening_video').show();
        }
    })();

    /* custom overflown scrollbar */
    $(function () {
        function triggerShadow(scrollTop) {
            var contentShadow = $('.content-shadow');
            if (scrollTop > 300) {
                contentShadow.addClass('top');
                contentShadow.removeClass('bottom');
            }
            else if (scrollTop < 300) {
                contentShadow.removeClass('top');
                contentShadow.addClass('bottom');
            }
        }
        $('.infoblock').overlayScrollbars({
            className: "os-theme-dark",
            resize: "none",
            sizeAutoCapable: false,
            nativeScrollbarsOverlaid: {
                showNativeScrollbars: false,
                initialize: true
            },
            overflowBehavior: {
                y: "scroll",
                x: "hidden"
            },
            scrollbars: {
                visibility: "auto",
                autoHide: "never",
                dragScrolling: true,
                clickScrolling: false,
                touchSupport: true,
                snapHandle: false
            },
            callbacks: {
                onScroll: function (e) {
                    const scrollTop = e.target.scrollTop;
                    triggerShadow(scrollTop);
                }
            }
        })
    });

    /*login and resgistration modals toggling*/
    (function toggleModals() {
        let registrationForm = $('.registration-modal');
        let loginModal = $('.login-modal');
        registrationForm.on('shown.bs.modal', function () {
            loginModal.hide();
        })
        registrationForm.on('hidden.bs.modal', function (e) {
            $('.modal-backdrop').hide();
        })
    })();

    /*toggle logout button on click*/
    (function toggleLogoutBtn() {
        let logoutIcon = $('.logout');
        let logoutBtn = $('.logout_btn');
        logoutIcon.click(function () {
            logoutBtn.toggleClass('d-flex');
        });
    })();
});










