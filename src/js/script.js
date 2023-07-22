const GRID = document.querySelector(".grid")
const SIZE_BTN = document.getElementById("size")
const BORDER_BTN = document.getElementById("toggle-border")
const SAVE_BTN = document.getElementById("save")
const CLEAN_BTN = document.getElementById("clean")

function setGrid(width = 16) {
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

setGrid()

SIZE_BTN.addEventListener("click", () => {
  let newSize = parseInt(prompt("Width should be between 16 and 100*"))

  if (newSize < 16 || newSize > 100) {
    newSize = parseInt(
      prompt("Width should be between 16 and 100*\nTHERE IS NO OTHER OPTION!")
    )
  }

  setGrid(newSize)
})

BORDER_BTN.addEventListener("click", () => {
  GRID.classList.toggle("border")
})
