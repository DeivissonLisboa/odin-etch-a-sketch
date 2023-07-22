const GRID = document.querySelector(".grid")
const SIZE_BTN = document.getElementById("size")
const BORDER_BTN = document.getElementById("toggle-border")
const CLEAN_BTN = document.getElementById("clean")
const SAVE_BTN = document.getElementById("save")
const DOWNLOAD_ANCHOR = document.getElementById("download-link")
let currentWidth = 16

function setGrid(width) {
  GRID.innerHTML = ""
  GRID.setAttribute("style", `--grid-width: ${width};`)

  for (let i = 0; i < width * width; i++) {
    cell = document.createElement("div")
    cell.classList.add("cell")

    GRID.append(cell)
  }

  let cells = document.querySelectorAll(".grid .cell")

  cells.forEach((cell) => {
    cell.addEventListener("mouseover", () => {
      cell.setAttribute("style", "background-color: #000;")
    })
  })
}

setGrid(currentWidth)

SIZE_BTN.addEventListener("click", () => {
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
