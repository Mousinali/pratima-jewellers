// var nav = document.querySelector(".navbar");
// window.onscroll = function () {
//     if (document.documentElement.scrollTop > 20) {
//         nav.classList.add("scroll-on");
//     }
//     else {
//         nav.classList.remove("scroll-on");
//     }
// }



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

    // Re-enable scrolling
    body.classList.remove("overflow-hidden");
}




gsap.registerPlugin(ScrollTrigger);

// MASTER TIMELINE
const heroTL = gsap.timeline({
    defaults: {
        ease: "power3.out",
        duration: 1.2
    }
});

// LEFT CONTENT
heroTL
    // Eyebrow text
    .from(".hero-tag", {
        y: 20,
        opacity: 0
    })

    // Eyebrow line (draw effect)
    .from(".hero-line", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.6")

    // Headline

    // Beauty underline reveal
    .from(".hero-underline", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.7")

    // Divider line
    .from(".hero-divider", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.6")

    // Description
    .from(".hero-text", {
        y: 30,
        opacity: 0
    }, "-=0.4")

    // CTA
    .from(".hero-cta", {
        y: 20,
        opacity: 0
    }, "-=0.3");


// INITIAL STATE
gsap.set(".reveal", {
    autoAlpha: 0,
    overflow: "hidden"
});

document.querySelectorAll(".reveal").forEach((container) => {

    let image = container.querySelector("img");

    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: container,
            start: "top 85%",
            toggleActions: "play none none none"
        }
    });

    tl.to(container, { autoAlpha: 1, duration: 0.01 });

    if (container.classList.contains("left")) {
        tl.from(container, { xPercent: -100, duration: 1.5, ease: "power2.out" })
            .from(image, { xPercent: 100, scale: 1.05, duration: 1.5, ease: "power2.out" }, "<");
    }

    else if (container.classList.contains("right")) {
        tl.from(container, { xPercent: 100, duration: 1.5, ease: "power2.out" })
            .from(image, { xPercent: -100, scale: 1.05, duration: 1.5, ease: "power2.out" }, "<");
    }

    else if (container.classList.contains("top")) {
        tl.from(container, { yPercent: -100, duration: 1.4, ease: "power3.out" })
            .from(image, { yPercent: 40, scale: 1.1, duration: 1.4, ease: "power3.out" }, "<");
    }

    else if (container.classList.contains("bottom")) {
        tl.from(container, { yPercent: 100, duration: 1.4, ease: "power3.out" })
            .from(image, { yPercent: -40, scale: 1.1, duration: 1.4, ease: "power3.out" }, "<");
    }
});

// REFRESH AFTER IMAGES LOAD
window.addEventListener("load", () => {
    ScrollTrigger.refresh();
});





// Split text animation
document.addEventListener("DOMContentLoaded", function () {

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

});





