let indextl = gsap.timeline();

$(".service").click(function () {
  let name = $(this).attr("data-name");
  let url = `get-service-details/${name}`;

  $.get(url, function (data) {
    if (data["status"] !== 404) {
      renderHTML(data);
    } else {
    }
  });

  indextl
    .to($(".service-details"), {
      display: "flex",
      duration: 0.1,
    })
    .to($(".service-details"), {
      opacity: 1,
      duration: 0.3,
    })
    .to(".service-details-wrap", {
      duration: 0.8,
      y: "0%",
      ease: Expo.easeInOut,
    });
});

function closeDetails() {
  indextl
    .to(".service-details-wrap", {
      duration: 0.4,
      y: "100%",
      ease: Expo.easeInOut,
    })
    .to($(".service-details"), {
      opacity: 0,
      duration: 0.2,
    })
    .to($(".service-details"), {
      display: "none",
      duration: 0.1,
    });
}

$(".cross_btn_large_cont").click(function () {
  closeDetails();
});

function renderHTML(e) {
  e = JSON.parse(e);
  let base = `<div class="sect-1">
    <h2>${e["title"]} 
	<div class="cross_btn" onclick="closeDetails()">
		<span></span>
		<span></span>
	</div></h2>
    <div class="intro">
        <p>${e["intro"]}</p>
    </div>
    <div class="desc">
        <h3>Description</h3>
        <p>${e["description"]}</p>
    </div>
    <div class="niche">
        <h3>Our Niche</h3>
        <p>${e["niche"]}</p>
    </div>
  </div>
  <div class="sect-2">
    <h2>Plans</h2>
    <div class="slider">
      <div class="controls">
        <button onclick="slideLeft()" class="slide__left"><i data-feather="chevron-left"></i></button>
        <button onclick="slideRight()" class="slide__right"><i data-feather="chevron-right"></i></button>
      </div>
      <div class="slider__wrapper">
      </div>
    </div>
  </div>`;
  $(".service-details-wrap").html(base);
  feather.replace();
  for (let i = 0; i < e["plans"].length; i++) {
    const element = e["plans"][i];
    $(".slider__wrapper").append(
      `
          <div class="slide">
            <div class="slide__hold">
                <p class="title">${element["title"]}</p>
                <p class="price">$${element["pricing"]["USD"]}</p>
                <ul id="${element["title"]}"></ul>
				<div class="hire-btn">
					<button data-service="${e["code"]}" data-plan="${element["title"]}">Buy</button>
				</div>
            </div>
          </div>`
    );
    let tle = element["title"];
    for (let i = 0; i < element["details"].length; i++) {
      const el = element["details"][i];
      if (el["avail"]) {
        $(`#${tle}`).append(`
                    <li style="background-color: #75fe702f; color: #75fe70;">${el["feat"]}</li>
                `);
      } else {
        $(`#${tle}`).append(`
                    <li>${el["feat"]}</li>
                `);
      }
    }
  }
}

// Slider
let pos = 0;

function slideRight() {
  pos = pos - 100;

  if (pos > -300) {
    slide(pos);
  } else {
    pos = -200;
    tl.to(".slider__wrapper", {
      duration: 0.4,
      x: "-206%",
      repeat: 1,
      yoyo: true,
      ease: Expo.easeInOut,
    });
  }
}

function slideLeft() {
  if (pos == 0) {
    tl.to(".slider__wrapper", {
      duration: 0.4,
      x: "6%",
      repeat: 1,
      yoyo: true,
      ease: Expo.easeInOut,
    });
  } else {
    pos = pos + 100;
    slide(pos);
  }
}

function slide(pos) {
  tl.to(".slider__wrapper", {
    x: `${pos}%`,
    duration: 0.5,
    ease: Expo.easeInOut,
  });
}
