let tl = gsap.timeline();

const edObj = {
  holder: "editorjs",
  tools: {
    header: {
      class: Header,
      inlineToolbar: true,
    },
    paragraph: {
      class: Paragraph,
      inlineToolbar: true,
    },
    embed: {
      class: Embed,
      config: {
        services: { youtube: true },
      },
    },
    quote: {
      class: Quote,
    },
    checkList: {
      class: Checklist,
      inlineToolbar: true,
    },
    list: {
      class: List,
      inlineToolbar: true,
    },
    image: {
      class: ImageTool,
      inlineToolbar: true,
      config: {
        endpoints: {
          byFile: "http://localhost:8000/imageUp/",
          byUrl: "http://localhost:8000/imageUp/",
        },
      },
    },
  },
  autofocus: true,
};
const ed = new EditorJS(edObj);

$("#save-blog").click(function (event) {
  let title = $("#blog-title");
  if (title.val().length <= 0) {
    $(title).attr("placeholder", "Title required");
    setTimeout(() => {
      $(title).attr("placeholder", "An awesome title here.");
    }, 1000);
  } else if (!$("#up-thumb").val().trim().length) {
    $("#up-thumb-text").text("IMAGE REQUIRED!");
    setTimeout(() => {
      $("#up-thumb-text").text("UPLOAD THUMBNAIL");
    }, 1000);
  } else {
    openMsg();
  }
});

$(".confirm").click(function () {
  console.log($(this).attr("data-state"));
  if ($(this).attr("data-state") === "yes") {
    saveBlog();
  } else {
    tl.to(".popup_wrapper", {
      duration: 0.2,
      scale: 0.86,
      ease: Expo.easeInOut,
    })
      .to(".popup_wrapper", {
        duration: 0.2,
        opacity: 0,
        delay: 0.04,
        ease: Expo.easeInOut,
      })
      .to("#popup", {
        display: "none",
      });
  }
});

function saveBlog() {
  $("#popup .popup_wrapper h2").html("Publishing <span>🌏</span>");
  $("#popup .popup_wrapper p").text("Hold on awesomness is loading! 😉");
  gsap.to("#popup .popup_wrapper .btn-group", {
    opacity: 0,
    duration: 0.3,
  });
  gsap.to("#popup .popup_wrapper", {
    height: "140px",
    duration: 0.3,
  });
  ed.save().then((data) => {
    let form = new FormData();
    form.append("title", $("#blog-title").val());
    form.append("content", JSON.stringify(data));
    form.append("image", $("#up-thumb").prop("files")[0]);
    $.ajax({
      method: "POST",
      url: "/create-blog/",
      processData: false,
      contentType: false,
      data: form,
      success: (res) => {
        setTimeout(() => {
          window.location.replace("/blogs/");
        }, 2000);
        console.log(res);
      },
      error: () => {
        console.log("Uhhh!");
      },
    });
  });
}

function openMsg() {
  tl.to("#popup", {
    display: "flex",
  })
    .to(".popup_wrapper", {
      duration: 0.2,
      opacity: 1,
      delay: 0.04,
      ease: Expo.easeInOut,
    })
    .to(".popup_wrapper", {
      duration: 0.2,
      scale: 1,
      ease: Expo.easeInOut,
    });
}
