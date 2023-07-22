const GRID = document.querySelector(".grid")

function setGrid(width = 16) {
  GRID.innerHTML = ""

  for (let i = 0; i < width * width; i++) {
    cell = document.createElement("div")
    cell.classList.add("cell")

    GRID.append(cell)
  }

  return document.querySelectorAll(".grid .cell")
}

let cells = setGrid()

cells.forEach((cell) => {
  cell.addEventListener("mouseover", () => {
    cell.setAttribute("style", "background-color: #000;")
  })
})
