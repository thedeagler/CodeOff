ColorPicker(
  document.getElementById('slide'),
  document.getElementById('picker'),
  function(hex, hsv, rgb) {
    document.body.style.backgroundColor = hex;
});