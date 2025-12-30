// var nav = document.querySelector(".navbar");
// window.onscroll = function () {
//     if (document.documentElement.scrollTop > 20) {
//         nav.classList.add("scroll-on");
//     }
//     else {
//         nav.classList.remove("scroll-on");
//     }
// }


gsap.registerPlugin(ScrollTrigger);

function mobileMenu() {
    const openBtn = document.getElementById("openMenu");
    const closeBtn = document.getElementById("closeMenu");
    const mobileMenu = document.getElementById("mobileMenu");
    const backdrop = document.getElementById("backdrop");
    const body = document.body;

    openBtn.addEventListener("click", () => {
        mobileMenu.classList.remove("translate-x-full");
        mobileMenu.classList.add("translate-x-0");
        backdrop.classList.remove("opacity-0", "invisible");
        backdrop.classList.add("opacity-100", "visible");

        // Disable scrolling
        body.classList.add("overflow-hidden");
    });

    closeBtn.addEventListener("click", closeMenuHandler);
    backdrop.addEventListener("click", closeMenuHandler);

    function closeMenuHandler() {
        mobileMenu.classList.add("translate-x-full");
        mobileMenu.classList.remove("translate-x-0");
        backdrop.classList.add("opacity-0", "invisible");
        backdrop.classList.remove("opacity-100", "visible");
        body.classList.remove("overflow-hidden");
    }
}
mobileMenu()

function heroAnimation() {
    const heroTL = gsap.timeline({
        defaults: {
            ease: "power3.out",
            duration: 1.2
        }
    });

    heroTL
        .from(".hero-tag", {
            y: 20,
            opacity: 0
        })

        .from(".hero-line", {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.6")

        .from(".hero-underline", {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.7")

        .from(".hero-divider", {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.6")

        .from(".hero-text", {
            y: 30,
            opacity: 0
        }, "-=0.4")

        .from(".hero-cta", {
            y: 20,
            opacity: 0
        }, "-=0.3");
}
heroAnimation()

//Image Zoom
function revealImage() {
    let revealContainers = document.querySelectorAll(".reveal");

    revealContainers.forEach((container) => {

        let image = container.querySelector(".custom-img img");

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });

        tl.set(container, { autoAlpha: 1 });
        if (container.classList.contains("zoom-out")) {

            tl.from(image, {
                scale: 1.4,
                duration: 1.5,
                ease: "power2.out"
            });

        }
        else if (container.classList.contains("left") || container.classList.contains("right")) {

            let xPercent = container.classList.contains("left") ? -100 : 100;

            tl.from(container, {
                xPercent: xPercent,
                duration: 1.5,
                ease: "power2.out"
            })
                .from(image, {
                    xPercent: -xPercent,
                    scale: 1.05,
                    duration: 1.5,
                    delay: -1.5,
                    ease: "power2.out"
                });

        }
        else if (container.classList.contains("top")) {

            tl.from(container, {
                yPercent: -100,
                duration: 1.4,
                ease: "power3.out"
            })
                .from(image, {
                    yPercent: 40,
                    scale: 1.1,
                    duration: 1.4,
                    delay: -1.4,
                    ease: "power3.out"
                });

        }
        else if (container.classList.contains("bottom")) {

            tl.from(container, {
                yPercent: 100,
                duration: 1.4,
                ease: "power3.out"
            })
                .from(image, {
                    yPercent: -40,
                    scale: 1.1,
                    duration: 1.4,
                    delay: -1.4,
                    ease: "power3.out"
                });

        }

        else if (container.classList.contains("tl")) {

            tl.from(container, {
                xPercent: -100,
                yPercent: -100,
                duration: 1.6,
                ease: "power3.out"
            })
                .from(image, {
                    xPercent: 40,
                    yPercent: 40,
                    scale: 1.2,
                    duration: 1.6,
                    delay: -1.6,
                    ease: "power3.out"
                });

        }
        else if (container.classList.contains("br")) {

            tl.from(container, {
                xPercent: 100,
                yPercent: 100,
                duration: 1.6,
                ease: "power3.out"
            })
                .from(image, {
                    xPercent: -40,
                    yPercent: -40,
                    scale: 1.2,
                    duration: 1.6,
                    delay: -1.6,
                    ease: "power3.out"
                });

        }

    });
}
revealImage()

function mySplitText() {
    const st = document.querySelectorAll(".split-text");

    if (st.length > 0) {

        gsap.registerPlugin(SplitText, ScrollTrigger);

        st.forEach((el) => {

            el.split = new SplitText(el, {
                type: "lines,words,chars",
                linesClass: "tp-split-line"
            });

            gsap.set(el, { perspective: 400 });

            let charsAnimation = {
                opacity: 0.01
            };

            if (el.classList.contains("right")) {
                charsAnimation.x = 50;
            } else if (el.classList.contains("left")) {
                charsAnimation.x = -50;
            } else if (el.classList.contains("up")) {
                charsAnimation.y = 80;
            } else if (el.classList.contains("down")) {
                charsAnimation.y = -80;
            }

            gsap.set(el.split.chars, charsAnimation);

            el.anim = gsap.to(el.split.chars, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 90%"
                },
                x: 0,
                y: 0,
                rotateX: 0,
                scale: 1,
                opacity: 1,
                duration: 0.4,
                stagger: 0.02
            });

        });
    }
}
mySplitText()

function categoryHover() {
    gsap.set(".cursor-image", {
        xPercent: -50,
        yPercent: -50,
        autoAlpha: 0,
        scale: 0.95,
        filter: "blur(8px)"
    });

    let firstEnter = false;

    gsap.utils.toArray(".category-item").forEach((item) => {

        const image = item.querySelector(".cursor-image");

        const setX = gsap.quickTo(image, "x", {
            duration: 0.5,
            ease: "expo.out",
            overwrite: true
        });

        const setY = gsap.quickTo(image, "y", {
            duration: 0.5,
            ease: "expo.out",
            overwrite: true
        });

        const align = (e) => {
            if (firstEnter) {
                gsap.set(image, {
                    x: e.clientX,
                    y: e.clientY
                });
                firstEnter = false;
            } else {
                setX(e.clientX);
                setY(e.clientY);
            }
        };

        const startFollow = () =>
            document.addEventListener("mousemove", align);

        const stopFollow = () =>
            document.removeEventListener("mousemove", align);

        const fade = gsap.to(image, {
            autoAlpha: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.25,
            ease: "power2.out",
            paused: true,
            onReverseComplete: stopFollow
        });

        item.addEventListener("mouseenter", (e) => {
            firstEnter = true;
            fade.play();
            startFollow();
            align(e);
        });

        item.addEventListener("mouseleave", () => {
            fade.reverse();
        });
    });
}
categoryHover()


function productSection() {
    gsap.from(".product-item", {
        opacity: 0,
        y: 80,
        rotateX: 15,
        duration: 1.4,
        ease: "power4.out",
        stagger: 0.15,
        scrollTrigger: {
            trigger: ".product-item",
            start: "top 85%",
            once: true
        }
    });

    gsap.utils.toArray(".product-item").forEach(card => {

        const image = card.querySelector("img");
        const bounds = () => card.getBoundingClientRect();

        card.addEventListener("mousemove", (e) => {
            const b = bounds();
            const relX = e.clientX - b.left;
            const relY = e.clientY - b.top;

            const moveX = (relX - b.width / 2) * 0.08;
            const moveY = (relY - b.height / 2) * 0.08;

            const rotateX = -(relY / b.height - 0.5) * 12;
            const rotateY = (relX / b.width - 0.5) * 12;

            gsap.to(card, {
                x: moveX,
                y: moveY,
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 0.4,
                ease: "power3.out"
            });

            gsap.to(image, {
                scale: 1.1,
                x: moveX * 0.6,
                y: moveY * 0.6,
                duration: 0.4,
                ease: "power3.out"
            });
        });

        card.addEventListener("mouseenter", () => {
            gsap.to(card, {
                scale: 1.02,
                duration: 0.4,
                ease: "power3.out"
            });
        });

        card.addEventListener("mouseleave", () => {
            gsap.to(card, {
                x: 0,
                y: 0,
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                duration: 0.8,
                ease: "expo.out"
            });

            gsap.to(image, {
                scale: 1,
                x: 0,
                y: 0,
                duration: 0.8,
                ease: "expo.out"
            });
        });
    });

    gsap.utils.toArray(".product-item img").forEach(img => {
        gsap.to(img, {
            y: "+=12",
            duration: 4,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
        });
    });
}
productSection()


