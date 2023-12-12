// Get the ASCII container element from the document
const container = document.getElementById("asciiContainer");
const time = document.getElementById("time");
const fps = document.getElementById("fps");
const frameCount = document.getElementById("frame");
let color = 'red'
const colorCircles = document.querySelectorAll('.colorCircle');

colorCircles.forEach(circle => {
  circle.addEventListener('click', function() {
    // Remove the selected class from all circles
    colorCircles.forEach(c => c.classList.remove('selected'));
    // Add the selected class to the clicked circle
    this.classList.add('selected');
    color =  getComputedStyle(circle).backgroundColor
    // Change the color of the mouseover draw
  });
});


let lastTime = performance.now();
let initialTime = performance.now();


container.addEventListener("mousemove", (e) => { 
  // get the topmost element at position of intersection
  console.log("i am moving")
  const element = document.elementFromPoint(e.clientX, e.clientY);
  if(element.tagName === "SPAN"){
    console.log(element.textContent)
    element.textContent = density[Math.floor(Math.random() * density.length)]
    element.style.color = color;
  }
})

console.log('container', container)
// Define the characters used for ASCII shading
const density = "Ñ@#W$9876543210?!abc;:+=-,._";

// Set the number of rows and columns for the ASCII grid
const rows = 30;
const cols = 80;

// Loop to initialize the ASCII grid with spans and line breaks
for (let y = 0; y < rows; y++) {
  for (let x = 0; x < cols; x++) {
    // Create a new span element for each ASCII character
    const span = document.createElement("span");
    // Append the span to the container
    container.appendChild(span);
  }
  // After each row, append a line break to start a new line
  container.appendChild(document.createElement("br"));
}

// Select all span elements in the container (representing each ASCII character)
const chars = container.querySelectorAll("span");

// Initialize a frame counter for animation
let frame = 0;

// Function to calculate which character to display based on x, y position and frame
// In this example, there are three sine waves:
// The first wave varies with x, creating a horizontal wave.
// The second wave varies with y, creating a vertical wave.
// The third wave varies with x + y, creating a diagonal wave.
function main(x, y) {
  const dx = x - cols / 2;
  const dy = y - rows / 2;
  const dist = Math.sqrt(dx * dx + dy * dy);// dist equals radius
  const index = Math.floor(
    (Math.sin(dist / Math.max(cols, rows) * Math.PI * 2 + frame / 30) + 1) / 2 * density.length
  ) % density.length;
  return density[index];
}

function background(x, y) {
    const index = Math.floor((
      Math.sin(x / cols * Math.PI * 2 + frame / 30) // +
    //   Math.sin(y / rows * Math.PI * 2 + frame / 20) 
  //     Math.sin((x + y) / (cols + rows) * Math.PI * 2 + frame / 10)
  //   ) / 3 * density.length);
    ) / 2 * density.length);
    return density[index];
  }

// Function to update each frame of the animation
function updateFrame() {
let startTime = performance.now();

  // Initialize a counter for iterating over span elements
  let i = 0;
  // Loop over each row and column to update ASCII characters4-
  for (let y = 0; y < rows; y++) {

  for (let x = 0; x < cols; x++) {
      // Update the text content of each span with the calculated character
      const charChar = main(x, y);
      if (charChar === undefined){
        // console.log("no charchar")
      }
      chars[i++].textContent = charChar;
    }
  }

  
  const endTime = performance.now();
  const executionTime = endTime - initialTime;
  time.textContent = `Execution time: ${Math.floor(executionTime)} ms`;

  const frameTime = startTime - lastTime;
  // const fps = 1000 / frameTime;
  let fpsCalc = frameTime ? 1000 / frameTime : 0;
  fps.textContent = `FPS: ${Math.floor(fpsCalc)}`
  frameCount.textContent = `Frame: ${frame}`;
  lastTime = startTime;
  // Increment the frame counter
  frame++;
  // Request the next frame of the animation
  requestAnimationFrame(updateFrame);
}

// Start the animation
updateFrame();
