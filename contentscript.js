(function() {
  // First, ensure the current page URL is defined
  const currentUrl = window.location.href;

  // Check if the floating window already exists to avoid duplicate windows
  if (!document.getElementById("floating-window")) {

    // Create the floating window container
    const floatingWindow = document.createElement("div");
    floatingWindow.id = "floating-window";
    floatingWindow.style.position = "fixed";
    floatingWindow.style.top = "20px";
    floatingWindow.style.right = "20px";
    floatingWindow.style.width = "400px";
    floatingWindow.style.height = "300px";
    floatingWindow.style.backgroundColor = "white";
    floatingWindow.style.border = "2px solid black";
    floatingWindow.style.borderRadius = "12px";
    floatingWindow.style.zIndex = "9999"; // Ensure it stays on top of other elements
    floatingWindow.style.resize = "both";
    floatingWindow.style.overflow = "hidden";

    // Floating window header (for dragging)
    const floatingHeader = document.createElement("div");
    floatingHeader.id = "floating-header";
    floatingHeader.style.backgroundColor = "#333";
    floatingHeader.style.color = "#fff";
    floatingHeader.style.padding = "10px";
    floatingHeader.style.cursor = "move";
    floatingHeader.style.fontSize = "16px";
    floatingHeader.innerHTML = "Floating Window <button id='close-window' style='float: right;'>X</button>";

    // Floating window content (iframe with current tab's URL)
    const floatingContent = document.createElement("div");
    floatingContent.id = "floating-content";
    floatingContent.style.width = "100%";
    floatingContent.style.height = "calc(100% - 40px)"; // Adjust height based on the header
    floatingContent.innerHTML = `<iframe src="${currentUrl}" frameborder="0" style="width: 100%; height: 100%;" sandbox="allow-same-origin allow-scripts"></iframe>`;

    // Append header and content to the floating window
    floatingWindow.appendChild(floatingHeader);
    floatingWindow.appendChild(floatingContent);

    // Append the floating window to the document body
    document.body.appendChild(floatingWindow);

    // Close button functionality
    document.getElementById("close-window").addEventListener("click", () => {
      document.body.removeChild(floatingWindow);
      // Optionally, communicate with the extension to re-enable the popup button if needed
    });

    // Dragging functionality
    let isDragging = false;
    let offsetX, offsetY;

    floatingHeader.addEventListener("mousedown", (e) => {
      isDragging = true;
      offsetX = e.clientX - floatingWindow.offsetLeft;
      offsetY = e.clientY - floatingWindow.offsetTop;
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });

    function onMouseMove(e) {
      if (isDragging) {
        floatingWindow.style.left = `${e.clientX - offsetX}px`;
        floatingWindow.style.top = `${e.clientY - offsetY}px`;
      }
    }

    function onMouseUp() {
      isDragging = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }
  }
})();
