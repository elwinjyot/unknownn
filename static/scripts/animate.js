let tl = gsap.timeline();

const shade1 = "#fe757013";
const shade2 = "#fe75702f";

window.addEventListener("scroll", function () {
	let state = $(".navbar__right").attr("data-open");
	if (window.scrollY > 6) {
		gsap.to("#head", {
			duration: 0.4,
			y: "18%",
			borderRadius: "6px",
			scaleX: 0.98,
			background: shade1,
			ease: "circ.out",
		});
	} else {
		if (state === "false") {
			gsap.to("#head", {
				duration: 0.4,
				borderRadius: "0px",
				scaleX: 1,
				y: "0%",
				background: shade2,
				ease: "circ.out",
			});
		}
	}
});

$(document).ready(function () {
	tl.to("#headp-1", {
		duration: 0.4,
		opacity: 1,
		y: 0,
		ease: "circ.out",
	}).to("#headp-2", {
		duration: 0.4,
		opacity: 1,
		y: 0,
		ease: "circ.out",
	});
});

$(".nav__ham").click(() => {
	let state = $(".navbar__right").attr("data-open");
	if (state == "false") {
		openNav();
		gsap.to("#head", {
			duration: 0.6,
			backgroundColor: shade2,
			ease: "Expo.easeInOut",
			y: "18%",
			borderRadius: "6px",
			scaleX: 0.98,
		});
		tl.to(".navbar__right", {
			duration: 0.6,
			scaleY: 1,
			borderRadius: "6px",
			scaleX: 0.98,
			y: "10%",
			ease: "Expo.easeInOut",
		}).to(".nav-li", {
			delay: -1,
			duration: 0.6,
			x: "0%",
			opacity: 1,
			stagger: 0.1,
		});
		$(".navbar__right").attr("data-open", "true");
	} else {
		closeNav();
		tl.to(".nav-li", {
			duration: 0.6,
			x: "-90%",
			opacity: 0,
			stagger: -0.1,
		}).to(".navbar__right", {
			delay: -1,
			duration: 0.6,
			scaleY: 0,
			borderRadius: "0px",
			scaleX: 1,
			ease: "Expo.easeInOut",
		});
		if (window.scrollY === 0) {
			gsap.to("#head", {
				duration: 0.4,
				backgroundColor: shade1,
				ease: "Expo.easeInOut",
				borderRadius: "0px",
				scaleX: 1,
				y: "0%",
			});
		}
		$(".navbar__right").attr("data-open", "false");
	}
});

function openNav() {
	gsap.to(".nav__ham svg .line2", {
		duration: 0.2,
		rotateZ: "45deg",
		y: "4px",
	}).then(
		gsap.to(".nav__ham svg .line2", {
			duration: 0.2,
			delay: 0.2,
			x: "-8.3px",
		})
	);
	gsap.to(".nav__ham svg .line3", {
		duration: 0.2,
		rotateZ: "-45deg",
		y: "-12px",
	}).then(
		gsap.to(".nav__ham svg .line3", {
			duration: 0.2,
			delay: 0.2,
			x: "8px",
		})
	);
	gsap.to(".nav__ham svg .line1", {
		duration: 0.2,
		opacity: 0,
	});
}

function closeNav() {
	gsap.to(".nav__ham svg .line2", {
		duration: 0.2,
		rotateZ: "0deg",
		y: "0px",
	}).then(
		gsap.to(".nav__ham svg .line2", {
			duration: 0.2,
			delay: 0.2,
			x: "0px",
		})
	);
	gsap.to(".nav__ham svg .line3", {
		duration: 0.2,
		rotateZ: "0deg",
		y: "0px",
	}).then(
		gsap.to(".nav__ham svg .line3", {
			duration: 0.2,
			delay: 0.2,
			x: "0px",
		})
	);
	gsap.to(".nav__ham svg .line1", {
		duration: 0.2,
		opacity: 1,
	});
}

$(".mobile li .nav-item").click(function () {
	gsap.to(".nav_close", { duration: 0.3, y: "0%" });
	gsap.to(".nav__ham", { duration: 0.3, y: "0%" });
	tl.to(".nav-li", {
		duration: 0.6,
		x: "-90%",
		opacity: 0,
		stagger: -0.1,
	}).to(".navbar__right", {
		delay: -1,
		duration: 0.4,
		scaleY: 0,
		ease: "Expo.easeInOut",
	});
});

gsap.from("#scroll-down-img", {
	duration: 1,
	y: "-12px",
	repeat: -1,
	delay: 1,
	yoyo: true,
	ease: "Expo.easeInOut",
});

$(".nav-item").click(function (event) {
	event.preventDefault();
	window.location.replace($(this).attr("data-link"));
});

// Hover Service Animation
