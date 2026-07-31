/* ==========================================
   LOADER
========================================== */

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    const openBtn = document.getElementById("openInvBtn");
    const spinner = document.querySelector(".loading-spinner");
    const audio = document.getElementById("bg-music");

    if (spinner) spinner.style.display = "none";

    if (openBtn) {
        openBtn.style.display = "inline-block";
        openBtn.addEventListener("click", () => {
            loader.style.opacity = "0";
            loader.style.visibility = "hidden";
            if (audio) {
                audio.volume = 0.6;
                const playPromise = audio.play();
                
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        audio.currentTime = 22; // Skip to 0:22 after it starts
                    }).catch(e => console.log("Audio play failed:", e));
                } else {
                    audio.currentTime = 22;
                }

                // Loop custom duration: 0:22 to 1:40 (100 seconds)
                audio.addEventListener("timeupdate", () => {
                    if (audio.currentTime >= 100) {
                        audio.currentTime = 22;
                        audio.play();
                    }
                });
            }
        });
    } else {
        setTimeout(() => {
            loader.style.opacity = "0";
            loader.style.visibility = "hidden";
        }, 1800);
    }
});


/* ==========================================
   COUNTDOWN
========================================== */

const weddingDate = new Date("August 28, 2026 10:18:00").getTime();

function updateCountdown() {

    const now = new Date().getTime();

    const distance = weddingDate - now;

    if (distance <= 0) {

        document.getElementById("days").innerHTML = "00";
        document.getElementById("hours").innerHTML = "00";
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";

        return;

    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60))
        / 1000
    );

    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");

}

updateCountdown();

setInterval(updateCountdown, 1000);


/* ==========================================
   RSVP POPUP
========================================== */

const popup = document.getElementById("popup");

const popupTitle = document.getElementById("popupTitle");

const popupMessage = document.getElementById("popupMessage");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const rsvpStatus = document.getElementById("rsvpStatus");

const RSVP_KEY = "thulasiNikhil_rsvp";

function paintRsvpState(response) {

    yesBtn.classList.toggle("selected", response === "yes");
    noBtn.classList.toggle("selected", response === "no");

    if (rsvpStatus) {

        rsvpStatus.textContent =
            response === "yes" ? "You're on the list — see you there! 💛" :
                response === "no" ? "Thanks for letting us know 🙏" : "";

    }

}

// Restore any previous response for this visitor on load
paintRsvpState(localStorage.getItem(RSVP_KEY));

yesBtn.onclick = () => {

    localStorage.setItem(RSVP_KEY, "yes");
    paintRsvpState("yes");
    
    window.location.href = "mailto:tulu.reddy1995@gmail.com?subject=RSVP%20Yes:%20Attending%20Tulasi%20and%20Nikhil's%20Wedding!&body=Hi%20Tulasi%20and%20Nikhil,%0A%0AI%20am%20excited%20to%20let%20you%20know%20that%20I%20will%20be%20attending%20your%20wedding!%0A%0APlease%20accept%20my%20RSVP.%0A%0ABest%20regards,%0A[Your Name Here]";

    popup.classList.add("show");

    popupTitle.innerHTML = "💖 Thank You!";

    popupMessage.innerHTML = `
        Your presence is the greatest gift we could ask for.
        <br><br>
        We are eagerly waiting to celebrate
        this beautiful day with you.
        <br><br>
        See you on <b>28 August 2026</b>.
    `;

};

noBtn.onclick = () => {

    localStorage.setItem(RSVP_KEY, "no");
    paintRsvpState("no");
    
    window.location.href = "mailto:tulu.reddy1995@gmail.com?subject=RSVP%20No:%20Cannot%20Attend%20Tulasi%20and%20Nikhil's%20Wedding&body=Hi%20Tulasi%20and%20Nikhil,%0A%0AUnfortunately,%20I%20will%20not%20be%20able%20to%20attend%20the%20wedding.%20Wishing%20you%20both%20a%20lifetime%20of%20happiness!%0A%0ABest%20regards,%0A[Your Name Here]";

    popup.classList.add("show");

    popupTitle.innerHTML = "❤️ We'll Miss You";

    popupMessage.innerHTML = `
        Though you won't be able to join us,
        your love and blessings mean the world to us.
        <br><br>
        Thank you for being part of our journey.
    `;

};

document.getElementById("closePopup").onclick = () => {

    popup.classList.remove("show");

};

window.onclick = function (event) {

    if (event.target === popup) {

        popup.classList.remove("show");

    }

};


/* ==========================================
   BACK TO TOP
========================================== */

const topButton = document.getElementById("topButton");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        topButton.style.display = "block";

    }

    else {

        topButton.style.display = "none";

    }

});

topButton.onclick = () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

};


/* ==========================================================
   DYNAMIC UPGRADE — added on top of the original script
========================================================== */

/* ---------------- Scroll progress bar ---------------- */

const progressBar = document.getElementById("progressBar");

function updateProgressBar() {

    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (progressBar) progressBar.style.width = pct + "%";

}

window.addEventListener("scroll", updateProgressBar, { passive: true });
updateProgressBar();


/* ---------------- Scroll reveal + dot nav sync ---------------- */

const revealSections = document.querySelectorAll(".page.reveal");
const dots = document.querySelectorAll("#dotNav .dot");

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("in-view");

            }

        });

    }, { threshold: 0.18 });

    revealSections.forEach((section) => revealObserver.observe(section));

    // Dot-nav "scrollspy": a section becomes active once its top has
    // crossed a reference line near the upper third of the viewport. This
    // is the standard scrollspy approach and — unlike picking the section
    // with the highest intersection ratio — it has no ambiguous tie when
    // two short sections are simultaneously fully visible, and it naturally
    // keeps the last section active once you've scrolled to the bottom.
    const sectionList = Array.from(revealSections);

    function updateActiveDot() {

        const refLine = window.scrollY + window.innerHeight * 0.3;
        const atBottom = window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 2;

        let currentId = sectionList[0] && sectionList[0].id;

        sectionList.forEach((section) => {

            if (section.offsetTop <= refLine) currentId = section.id;

        });

        if (atBottom && sectionList.length) {

            currentId = sectionList[sectionList.length - 1].id;

        }

        dots.forEach((dot) => {

            dot.classList.toggle("active", dot.dataset.target === currentId);

        });

    }

    window.addEventListener("scroll", updateActiveDot, { passive: true });
    window.addEventListener("resize", updateActiveDot);

    // Lazy-loaded images keep changing the page's total height well after
    // the initial load event fires (that's the point of lazy loading — it
    // deliberately doesn't block load). Re-run the scrollspy calculation
    // every time the body's real layout size changes, so refLine/atBottom
    // stay correct as each image reserves its space.
    if (window.ResizeObserver) {

        new ResizeObserver(updateActiveDot).observe(document.body);

    } else {

        window.addEventListener("load", updateActiveDot);

    }

    updateActiveDot();

} else {

    // Fallback: just show everything if IntersectionObserver isn't supported
    revealSections.forEach((section) => section.classList.add("in-view"));

}

