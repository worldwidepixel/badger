window.addEventListener("load", (event) => {
  exportAllPng = document.getElementById("exportAllPng");
  exportAllSvg = document.getElementById("exportAllSvg");

  colourPickerStart = document.getElementById("gradientStart");
  colourPickerEnd = document.getElementById("gradientEnd");

  cozyMinimal = document.getElementById("cozyMinimal");
  cozy = document.getElementById("cozy");
  compactMinimal = document.getElementById("compactMinimal");
  compact = document.getElementById("compact");
  gradientPreview = document.getElementById("gradientPreview");

  iconPicker = document.getElementById("iconInput");
  iconPreview = document.getElementById("iconPreview");

  textOneInput = document.getElementById("textOneInput");
  textTwoInput = document.getElementById("textTwoInput");

  textOneColourInput = document.getElementById("textOneColour");
  textTwoColourInput = document.getElementById("textTwoColour");

  cozyLineOne = document.getElementById("cozyLineOne");
  cozyLineTwo = document.getElementById("cozyLineTwo");
  compactLineOne = document.getElementById("compactLineOne");
  compactLineTwo = document.getElementById("compactLineTwo");

  textOneInput.addEventListener("change", changeText);
  textTwoInput.addEventListener("change", changeText);

  colourPickerStart.addEventListener("change", changeStart, false);
  colourPickerEnd.addEventListener("change", changeEnd, false);

  textOneColourInput.addEventListener("change", changeTextColour, false);
  textTwoColourInput.addEventListener("change", changeTextColour, false);

  cozyMinimalImg = document.getElementById("cozyMinimalImg");
  cozyImg = document.getElementById("cozyImg");
  compactMinimalImg = document.getElementById("compactMinimalImg");
  compactImg = document.getElementById("compactImg");

  exportAllPng.addEventListener("click", saveAllPng);
  exportAllSvg.addEventListener("click", saveAllSvg);

  iconPicker.onchange = () => {
    changeIcon(iconPicker);
  }
  
  if (localStorage.getItem('gradientStart')) {
    startColour = localStorage.getItem('gradientStart');
    gradientStart.value = localStorage.getItem('gradientStart');
  }
  if (localStorage.getItem('gradientEnd')) {
    endColour = localStorage.getItem('gradientEnd');
    gradientEnd.value = localStorage.getItem('gradientEnd');
  }
  if (localStorage.getItem('icon')) {
    icon = localStorage.getItem('icon');
    iconPreview.src = localStorage.getItem('icon');
  }
  if (localStorage.getItem('lineOne')) {
    textOne = localStorage.getItem('lineOne');
  }
  if (localStorage.getItem('lineTwo')) {
    textTwo = localStorage.getItem('lineTwo');
  }
  if (localStorage.getItem('lineOneColour')) {
    textOneColour = localStorage.getItem('lineOneColour');
    textOneColourInput.value = localStorage.getItem('lineOneColour');
  }
  if (localStorage.getItem('lineTwoColour')) {
    textTwoColour = localStorage.getItem('lineTwoColour');
    textTwoColourInput.value = localStorage.getItem('lineTwoColour');
  }

  updateBadges();

});

var startColour = '#076137';
var endColour = '#084e28';
var textOne = 'Anything here';
var textTwo = 'Something else';
var icon = './img/badger.png'
var textOneColour = '#ffffff';
var textTwoColour = '#ff0000';
var gradStartLoaded = false;
var gradEndLoaded = false;
var textOneLoaded = false;
var textTwoLoaded = false;
var textOneColourLoaded = false;
var textTwoColourLoaded = false;
var iconLoaded = false;

function changeStart(event) {
  startColour = event.target.value;
  updateBadges();
}

function changeEnd(event) {
  endColour = event.target.value;
  updateBadges();
}

function changeIcon(iconPicker) {
  if (iconPicker.files.length != 0) {
    icon = URL.createObjectURL(iconPicker.files[0]);
    updateBadges();
  } else {
    //
  }
  //var iconObjectUrl = URL.createObjectURL(event.target.value);
}

function changeText() {
  textOne = textOneInput.value;
  textTwo = textTwoInput.value;
  console.log(textOne, textTwo);
  updateBadges();
}

function changeTextColour() {
  textOneColour = textOneColourInput.value;
  textTwoColour = textTwoColourInput.value;
  updateBadges();
}

async function updateBadges() {

  const reader = new FileReader();

  cozyMinimal.style.background = `linear-gradient(180deg, ${startColour} 0%, ${endColour} 100%)`;
  cozy.style.background = `linear-gradient(180deg, ${startColour} 0%, ${endColour} 100%)`;
  compactMinimal.style.background = `linear-gradient(180deg, ${startColour} 0%, ${endColour} 100%)`;
  compact.style.background = `linear-gradient(180deg, ${startColour} 0%, ${endColour} 100%)`;
  gradientPreview.style.background = `linear-gradient(180deg, ${startColour} 0%, ${endColour} 100%)`;

  localStorage.gradientStart = startColour;
  localStorage.gradientEnd = endColour;

  //iconPreview.src = iconObjectUrl;
  iconPreview.src = icon;

  cozyImg.src = icon;
  cozyMinimalImg.src = icon;
  compactImg.src = icon;
  compactMinimalImg.src = icon;

  var iconDataUrl = domtoimage.toPng(iconPreview)
    .then(function (dataUrl) {
      return dataUrl;
    })
    .catch(function (error) {
      console.error("Icon saving failed");
    })
  localStorage.icon = await iconDataUrl;

  cozyLineOne.innerHTML = textOne;
  cozyLineTwo.innerHTML = textTwo;
  compactLineOne.innerHTML = textOne;
  compactLineTwo.innerHTML = textTwo;

  localStorage.lineOne = textOne;
  localStorage.lineTwo = textTwo;

  cozyLineOne.style.color = textOneColour;
  cozyLineTwo.style.color = textTwoColour;
  compactLineOne.style.color = textOneColour;
  compactLineTwo.style.color = textTwoColour;

  localStorage.lineOneColour = textOneColour;
  localStorage.lineTwoColour = textTwoColour;

  loadQuery();

}

async function dataUrlToBytes(dataUrl) {
  const res = await fetch(dataUrl);
  return new Uint8Array(await res.arrayBuffer());
}

function saveAllPng() {

  var zip = new JSZip();
  var cozyImg = domtoimage.toPng(cozy)
    .then(function (dataUrl) {
      return dataUrlToBytes(dataUrl)
    })
    .catch(function (error) {
      console.error("Image rendering failed for 'cozy'");
    })
  zip.file("cozy.png", cozyImg);

  var cozyMinimalImg = domtoimage.toPng(cozyMinimal)
    .then(function (dataUrl) {
      return dataUrlToBytes(dataUrl)
    })
    .catch(function (error) {
      console.error("Image rendering failed for 'cozyMinimal'");
    })
  zip.file("cozy_minimal.png", cozyMinimalImg);

  var compactImg = domtoimage.toPng(compact)
    .then(function (dataUrl) {
      return dataUrlToBytes(dataUrl)
    })
    .catch(function (error) {
      console.error("Image rendering failed for 'compact'");
    })
  zip.file("compact.png", compactImg);

  var compactMinimalImg = domtoimage.toPng(compactMinimal)
    .then(function (dataUrl) {
      return dataUrlToBytes(dataUrl)
    })
    .catch(function (error) {
      console.error("Image rendering failed for 'compactMinimal'");
    })
  zip.file("compact_minimal.png", compactMinimalImg);

  zip.generateAsync({ type: "blob" })
    .then(function (content) {
      saveAs(content, `badger_${textOne}_png.zip`)
    })
}

function saveAllSvg() {

  var zip = new JSZip();
  var cozyImg = domtoimage.toSvg(cozy)
    .then(function (dataUrl) {
      return dataUrlToBytes(dataUrl)
    })
    .catch(function (error) {
      console.error("Image rendering failed for 'cozy'");
    })
  zip.file("cozy.svg", cozyImg);

  var cozyMinimalImg = domtoimage.toSvg(cozyMinimal)
    .then(function (dataUrl) {
      return dataUrlToBytes(dataUrl)
    })
    .catch(function (error) {
      console.error("Image rendering failed for 'cozyMinimal'");
    })
  zip.file("cozy_minimal.svg", cozyMinimalImg);

  var compactImg = domtoimage.toSvg(compact)
    .then(function (dataUrl) {
      return dataUrlToBytes(dataUrl)
    })
    .catch(function (error) {
      console.error("Image rendering failed for 'compact'");
    })
  zip.file("compact.svg", compactImg);

  var compactMinimalImg = domtoimage.toSvg(compactMinimal)
    .then(function (dataUrl) {
      return dataUrlToBytes(dataUrl)
    })
    .catch(function (error) {
      console.error("Image rendering failed for 'compactMinimal'");
    })
  zip.file("compact_minimal.svg", compactMinimalImg);

  zip.generateAsync({ type: "blob" })
    .then(function (content) {
      saveAs(content, `badger_${textOne}_svg.zip`)
    })
}

async function downloadPng(type) {
  var typeName = 'undefined';
  switch (type) {
    case cozy:
      typeName = 'cozy';
      break;
    case cozyMinimal:
      typeName = 'cozy_minimal';
      break;
    case compact:
      typeName = 'compact';
      break;
    case compactMinimal:
      typeName = 'compact_minimal';
      break;
  }
  var data = domtoimage.toPng(type)
    .then(function (dataUrl) {
      return dataUrl;
    })
  saveAs(await data, `badger_${textOne}_${typeName}.png`);
}

async function downloadSvg(type) {
  var typeName = 'undefined';
  switch (type) {
    case cozy:
      typeName = 'cozy';
      break;
    case cozyMinimal:
      typeName = 'cozy_minimal';
      break;
    case compact:
      typeName = 'compact';
      break;
    case compactMinimal:
      typeName = 'compact_minimal';
      break;
  }
  var data = domtoimage.toSvg(type)
    .then(function (dataUrl) {
      return dataUrl;
    })
  saveAs(await data, `badger_${textOne}_${typeName}.svg`);
}

async function copyDataUrl(type) {
  var data = domtoimage.toPng(type)
    .then(function (dataUrl) {
      return dataUrl;
    })
  try {
    await navigator.clipboard.writeText(await data);
    console.log('Base64 copied to clipboard');
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}

async function copyHtmlSample(type) {
  var data = domtoimage.toPng(type)
    .then(function (dataUrl) {
      return dataUrl;
    })
  var HTMLSample = `<img src="${await data}">`
  try {
    await navigator.clipboard.writeText(HTMLSample);
    console.log('HTML Sample copied to clipboard');
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}

async function copyMarkdownSample(type) {
  var data = domtoimage.toPng(type)
    .then(function (dataUrl) {
      return dataUrl;
    })
  var mdSample = `![${textOne} ${textTwo}](${await data})`
  try {
    await navigator.clipboard.writeText(mdSample);
    console.log('Markdown Sample copied to clipboard');
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}

function toggleTheme() {
  const body = document.body;
  if (localStorage.getItem('theme') === 'dark') {
    localStorage.theme = 'light'
    document.getElementById("light").style.display = 'none';
    document.getElementById("dark").style.display = 'block';
    body.classList.remove('dark');
  } else {
    localStorage.theme = 'dark'
    document.getElementById("dark").style.display = 'none';
    document.getElementById("light").style.display = 'block';
    body.classList.add('dark');
  }
}

/* var gradStartLoaded = false;
var gradEndLoaded = false;
var textOneLoaded = false;
var textTwoLoaded = false;
var textOneColourLoaded = false;
var textTwoColourLoaded = false;
var iconLoaded = false; */

function loadQuery() {
  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.has("gradientStart") && gradStartLoaded === false) {
    startColour = `#${searchParams.getAll("gradientStart")[0]}`;
    updateBadges();
    gradStartLoaded = true;
  }
  if (searchParams.has("gradientEnd") && gradEndLoaded === false) {
    endColour = `#${searchParams.getAll("gradientEnd")[0]}`;
    updateBadges();
    gradEndLoaded = true;
  }
  if (searchParams.has("iconUrl") && iconLoaded === false) {
    icon = `${decodeURIComponent(searchParams.getAll("iconUrl")[0])}`;
    //console.log(icon);
    updateBadges();
    iconLoaded = true;
  }
  if (searchParams.has("lineOne") && textOneLoaded === false) {
    textOne = `${searchParams.getAll("lineOne")[0]}`;
    updateBadges();
    textOneLoaded = true;
  }
  if (searchParams.has("lineTwo") && textTwoLoaded === false) {
    textTwo = `${searchParams.getAll("lineTwo")[0]}`;
    updateBadges();
    textTwoLoaded = true;
  }
  if (searchParams.has("colourOne") && textOneColourLoaded === false) {
    textOneColour = `#${searchParams.getAll("colourOne")[0]}`;
    updateBadges();
    textOneColourLoaded = true;
  }
  if (searchParams.has("colourTwo") && textTwoColourLoaded === false) {
    textTwoColour = `#${searchParams.getAll("colourTwo")[0]}`;
    updateBadges();
    textTwoColourLoaded = true;
  }
}

async function getIconB64() {
  var iconDataUrl = domtoimage.toPng(iconPreview)
  .then(function (dataUrl) {
    return dataUrl;
  })
  .catch(function (error) {
    console.error("Icon saving failed");
  })
  console.log(await iconDataUrl);
  return iconDataUrl;
}

async function shareBadge() {
  copyString = `https://badger.worldwidepixel.ca?gradientStart=${startColour.replace("#", "")}&gradientEnd=${endColour.replace("#", "")}&lineOne=${textOne}&lineTwo=${textTwo}&colourOne=${textOneColour.replace("#", "")}&colourTwo=${textTwoColour.replace("#", "")}&iconUrl=${encodeURIComponent(await getIconB64())}`;
  navigator.clipboard.writeText(copyString);
  console.log("Share link copied");
}

