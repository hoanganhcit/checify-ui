// Data (menus)
const menus = [
  {
    title: "Spicy Adventure",
    by: "Amira · Waitstaff Curator",
    price: 49,
    tags: ["Thai", "Heat Level 7/10", "Casual"],
    blurb:
      "A playful parade of tangy papaya salad, panang curry, and mango sticky rice.",
  },
  {
    title: "Cozy Comforts",
    by: "Marco · Waitstaff Curator",
    price: 42,
    tags: ["Italian", "Comfort", "Candlelight"],
    blurb:
      "Handmade pasta, slow-braised ragu, and tiramisu for two—simple and swoony.",
  },
  {
    title: "Plant‑Powered Flirt",
    by: "Sana · Waitstaff Curator",
    price: 45,
    tags: ["Vegan", "Fresh", "Light"],
    blurb: "Roasted beet carpaccio, herbed risotto, and citrus olive‑oil cake.",
  },
  {
    title: "Street Food Safari",
    by: "Luis · Waitstaff Curator",
    price: 39,
    tags: ["Global", "Fun", "Shareables"],
    blurb:
      "Bite-sized tour: bao, tacos al pastor, and falafel with zesty dips.",
  },
];

// Render menu cards
function renderMenus() {
  const $grid = $("#menuGrid");
  $grid.empty();
  menus.forEach((m) => {
    const $col = $('<div class="col-sm-6 col-lg-3"></div>');
    const $card = $(`
            <div class="card h-100 rounded-2xl ring card-hover overflow-hidden">
              <div class="d-grid place-items-center" style="height:144px;background: linear-gradient(135deg, rgba(108,99,255,.12), rgba(167,139,250,.12))">
                <i class="fal fa-utensils  fs-2" style="color:var(--brand)"></i>
              </div>
              <div class="card-body d-flex flex-column">
                <h3 class="h6 fw-semibold mb-1">${m.title}</h3>
                <p class="small text-charcoal mb-2">${m.blurb}</p>
                <div class="d-flex flex-wrap gap-2 mb-3">
                  ${m.tags
                    .map(
                      (t) =>
                        `<span class='badge badge-soft-teal rounded-pill'>${t}</span>`
                    )
                    .join("")}
                </div>
                <div class="mt-auto pt-2 d-flex align-items-center justify-content-between border-top">
                  <span class="small text-charcoal">${m.by}</span>
                  <span class="fw-bold">$${
                    m.price
                  }<span class="fw-normal small">/person</span></span>
                </div>
              </div>
            </div>`);
    $col.append($card);
    $grid.append($col);
  });
}

// Smooth scroll for anchor links (Bootstrap doesn't include this by default)
$(document).on("click", 'a[href^="#"]', function (e) {
  const target = $(this.getAttribute("href"));
  if (target.length) {
    e.preventDefault();
    window.scrollTo({ top: target.offset().top - 70, behavior: "smooth" });
  }
});

// Forms — show thank-you message after submit
function attachThanks(formSelector, thanksSelector) {
  $(formSelector).on("submit", function (e) {
    e.preventDefault();
    $(this).addClass("d-none");
    $(thanksSelector).removeClass("d-none");
  });
}

// Waitstaff apply toggles
$("#btnStartWaitstaff, #btnOpenWaitstaff, #btnEarn").on("click", function () {
  $("#waitstaffApplyBox").addClass("d-none");
  $("#waitstaffForm")
    .removeClass("d-none")[0]
    .scrollIntoView({ behavior: "smooth", block: "start" });
});

// Screenshot upload preview
function wireScreenshotSlot(id) {
  const $slot = $(id);
  const $input = $slot.find("input[type=file]");
  $slot.on("click", function () {
    $input.trigger("click");
  });
  $input.on("change", function () {
    const file = this.files && this.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    $slot
      .css("padding", 0)
      .html(
        `<img src='${url}' alt='screenshot' class='w-100 h-100' style='object-fit:cover;border-radius:.5rem'/>`
      );
  });
}

// Footer year
$("#year").text(new Date().getFullYear());

// Init
$(function () {
  renderMenus();
  attachThanks("#dinerForm", "#dinerThanks");
  attachThanks("#waitstaffForm", "#waitstaffThanks");
  wireScreenshotSlot("#slot1");
  wireScreenshotSlot("#slot2");
});
