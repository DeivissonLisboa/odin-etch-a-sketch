const GRID = document.querySelector(".grid")
const RESIZE_BTN = document.getElementById("size")
const BORDER_BTN = document.getElementById("toggle-border")
const RAINBOW_BTN = document.getElementById("rainbow")
const GRADIENT_BTN = document.getElementById("gradient")
const CLEAN_BTN = document.getElementById("clean")
const SAVE_BTN = document.getElementById("save")
const DOWNLOAD_ANCHOR = document.getElementById("download-link")
const COLORS = [
  "#f94144",
  "#f3722c",
  "#f8961e",
  "#f9c74f",
  "#90be6d",
  "#43aa8b",
  "#577590",
]
let rainbow = false
let gradient = false
let currentColorIndex = 0
let currentWidth = 16

function addCellEventListiner(cell) {
  cell.addEventListener("mouseover", () => {
    if (rainbow) {
      cell.setAttribute(
        "style",
        `background-color: ${COLORS[currentColorIndex]};`
      )
      currentColorIndex = (currentColorIndex + 1) % COLORS.length
    } else if (gradient) {
      if (cell.dataset.gradient) {
        let color = cell.dataset.gradient

        if (color <= 0) {
          color = "000"
        }

        cell.setAttribute("style", `background-color: #${color};`)
        cell.dataset.gradient = cell.dataset.gradient - 111
      } else {
        let color = 999
        cell.dataset.gradient = color
        cell.setAttribute("style", `background-color: #${color};`)
      }
    } else {
      cell.setAttribute("style", "background-color: #000;")
      cell.dataset.gradient = "000"
    }
  })
}

function setGrid(width) {
  GRID.innerHTML = ""
  GRID.setAttribute("style", `--grid-width: ${width};`)

  for (let i = 0; i < width * width; i++) {
    cell = document.createElement("div")
    cell.classList.add("cell")

    GRID.append(cell)
  }

  let cells = document.querySelectorAll(".grid .cell")

  cells.forEach((cell) => addCellEventListiner(cell))
}

RESIZE_BTN.addEventListener("click", () => {
  let newSize = parseInt(prompt("Width should be between 16 and 100*"))

  if (newSize < 16 || newSize > 100) {
    newSize = parseInt(
      prompt("Width should be between 16 and 100*\nTHERE IS NO OTHER OPTION!")
    )
  }

  currentWidth = newSize
  setGrid(newSize)
})

BORDER_BTN.addEventListener("click", () => {
  GRID.classList.toggle("border")
})

RAINBOW_BTN.addEventListener("click", () => {
  rainbow = !rainbow
  gradient = false
})

GRADIENT_BTN.addEventListener("click", () => {
  gradient = !gradient
  rainbow = false
})

CLEAN_BTN.addEventListener("click", () => {
  setGrid(currentWidth)
})

SAVE_BTN.addEventListener("click", () => {
  html2canvas(GRID).then((canvas) => {
    DOWNLOAD_ANCHOR.download = `${Date.now()}.png`
    DOWNLOAD_ANCHOR.href = canvas.toDataURL("image/png")
    DOWNLOAD_ANCHOR.click()

    DOWNLOAD_ANCHOR.parentNode.classList.remove("hidden")

    setTimeout(() => {
      DOWNLOAD_ANCHOR.parentNode.classList.add("hidden")
    }, 3 * 10 ** 4)
  })
})

let cells = setGrid(currentWidth)
