document.addEventListener('DOMContentLoaded', () => {
  const apiUrlInput = document.getElementById('apiUrl');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  
  const loginBtn = document.getElementById('loginBtn');
  const saveBtn = document.getElementById('saveBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  
  const loginView = document.getElementById('loginView');
  const actionView = document.getElementById('actionView');
  
  const activeUserSpan = document.getElementById('activeUser');
  const statusDiv = document.getElementById('status');

  // Check auth status on load
  chrome.storage.local.get(['token', 'apiUrl', 'username'], (result) => {
    if (result.apiUrl) apiUrlInput.value = result.apiUrl;
    
    if (result.token) {
      showActionView(result.username || 'admin');
    } else {
      showLoginView();
    }
  });

  function showLoginView() {
    loginView.classList.remove('hidden');
    actionView.classList.add('hidden');
    statusDiv.innerText = "";
  }

  function showActionView(username) {
    loginView.classList.add('hidden');
    actionView.classList.remove('hidden');
    activeUserSpan.innerText = `Connected as ${username}`;
    statusDiv.innerText = "";
  }

  // Handle Login
  loginBtn.addEventListener('click', async () => {
    const apiUrl = apiUrlInput.value.replace(/\/$/, "");
    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (!username || !password) {
      showStatus("Please enter username and password", "error");
      return;
    }

    loginBtn.disabled = true;
    loginBtn.innerText = "Authenticating...";
    statusDiv.innerText = "";

    try {
      const response = await fetch(`${apiUrl}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      const data = await response.json();
      
      // Save settings to extension storage
      chrome.storage.local.set({ 
        token: data.token, 
        apiUrl: apiUrl,
        username: username
      }, () => {
        showActionView(username);
      });
    } catch (err) {
      showStatus(err.message || "Failed to log in", "error");
    } finally {
      loginBtn.disabled = false;
      loginBtn.innerText = "Log In & Sync";
    }
  });

  // Handle Save Job
  saveBtn.addEventListener('click', async () => {
    chrome.storage.local.get(['token', 'apiUrl'], async (stored) => {
      const { token, apiUrl } = stored;
      
      if (!token) {
        showStatus("Session expired. Please log in again.", "error");
        showLoginView();
        return;
      }

      saveBtn.disabled = true;
      saveBtn.innerText = "Extracting content...";
      statusDiv.innerText = "";

      try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab) throw new Error("No active tab found");

        const [{ result }] = await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => {
            const clone = document.body.cloneNode(true);
            const elementsToRemove = clone.querySelectorAll('script, style, noscript, nav, footer, header');
            elementsToRemove.forEach(el => el.remove());
            
            return {
              url: window.location.href,
              page_title: document.title,
              description: clone.innerText.substring(0, 15000)
            };
          }
        });

        saveBtn.innerText = "Saving to board...";

        const response = await fetch(`${apiUrl}/api/jobs/extension`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(result)
        });

        if (!response.ok) {
          if (response.status === 401) {
            chrome.storage.local.remove(['token']);
            showLoginView();
            throw new Error("Session expired. Please log in again.");
          }
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.detail || "Server returned " + response.status);
        }

        const data = await response.json();
        showStatus(`Saved: ${data.company} - ${data.title}`, "success");
      } catch (err) {
        showStatus(err.message || "Failed to save job", "error");
      } finally {
        saveBtn.disabled = false;
        saveBtn.innerText = "Save Active Job";
      }
    });
  });

  // Handle Logout
  logoutBtn.addEventListener('click', () => {
    chrome.storage.local.remove(['token', 'username'], () => {
      showLoginView();
    });
  });

  function showStatus(message, className) {
    statusDiv.className = className;
    statusDiv.innerText = message;
  }
});
