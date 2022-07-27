const colorInput = document.querySelector('input[name="color"]');
const blurInput = document.querySelector('input[name="blur"]');
const spacingInput = document.querySelector('input[name="spacing"]');
const jsSpan = document.querySelector(".hl");
const img = document.querySelector("img");

colorInput.addEventListener("input", function (e) {
  const color = e.target.value;
  jsSpan.style.color = color;
  img.style.backgroundColor = color;
});

blurInput.addEventListener("input", function (e) {
  const blur = e.target.value;
  img.style.filter = `blur(${blur}px)`;
});

spacingInput.addEventListener("input", function (e) {
  const spacing = e.target.value;
  img.style.padding = `${spacing}px`;
});
