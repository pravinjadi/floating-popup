document.getElementById("popOut").addEventListener("click", () => {
    const createButton = document.getElementById("popOut");
    createButton.disabled = true; // Disable the button immediately after click

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) {
            console.error("No active tab found.");
            createButton.disabled = false; // Re-enable on error
            return;
        }

        const activeTab = tabs[0];

        // Check if the floating window is already present by querying for the element
        chrome.scripting.executeScript({
            target: { tabId: activeTab.id },
            func: () => {
                return !!document.getElementById("floating-window");
            }
        }, (results) => {
            if (chrome.runtime.lastError) {
                console.error("Script execution failed: " + chrome.runtime.lastError.message);
                createButton.disabled = false; // Re-enable on error
                return;
            }

            const isFloatingWindowPresent = results && results[0].result;

            if (isFloatingWindowPresent) {
                console.log("Floating window already exists.");
                alert("Floating window is already open.");
                createButton.disabled = false; // Re-enable since window already exists
            } else {
                console.log("Injecting content script...");
                chrome.scripting.executeScript({
                    target: { tabId: activeTab.id },
                    files: ["contentScript.js"]
                }, () => {
                    if (chrome.runtime.lastError) {
                        console.error("Script injection failed: " + chrome.runtime.lastError.message);
                        createButton.disabled = false; // Re-enable on error
                    } else {
                        console.log("Script injected successfully.");
                        // Optionally, keep the button disabled as the window is now open
                    }
                });
            }
        });
    });
});
