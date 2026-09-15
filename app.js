// app.js - Routing, Theme Controller, Dialog Manager & Global Aggregators

// Global Chart References
let dashboardCollectionsChart = null;

// Initialize when DOM is fully loaded
// Initialize when DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    initApp();
});

let selectedLoginRole = "";



function resetLoginOverlay() {
    const roleCard = document.getElementById("login-role-card");
    const credCard = document.getElementById("login-credentials-card");
    const errorMsg = document.getElementById("login-error-message");
    
    if (roleCard) roleCard.style.display = "flex";
    if (credCard) credCard.style.display = "none";
    if (errorMsg) errorMsg.style.display = "none";
    
    // Clear credentials form inputs
    const emailInput = document.getElementById("login-email");
    const nameInput = document.getElementById("login-fullname");
    const passInput = document.getElementById("login-password");
    const contactInput = document.getElementById("login-contact");
    
    if (emailInput) emailInput.value = "";
    if (nameInput) nameInput.value = "";
    if (passInput) {
        passInput.value = "";
        passInput.type = "password";
    }
    if (contactInput) contactInput.value = "";
    
    const passIcon = document.getElementById("toggle-password-icon");
    if (passIcon) passIcon.setAttribute("data-lucide", "eye");
    lucide.createIcons();
    
    selectedLoginRole = "";
}

function selectLoginRoleState(role) {
    selectedLoginRole = role;
    const roleCard = document.getElementById("login-role-card");
    const credCard = document.getElementById("login-credentials-card");
    const emailGroup = document.getElementById("login-email-group");
    const nameGroup = document.getElementById("login-name-group");
    const passwordGroup = document.getElementById("login-password-group");
    const contactGroup = document.getElementById("login-contact-group");
    
    const emailInput = document.getElementById("login-email");
    const nameInput = document.getElementById("login-fullname");
    const passwordInput = document.getElementById("login-password");
    const contactInput = document.getElementById("login-contact");
    
    const credTitle = document.getElementById("cred-card-title");
    
    if (roleCard) roleCard.style.display = "none";
    if (credCard) credCard.style.display = "flex";
    
    // Reset validation attributes
    emailInput.required = false;
    nameInput.required = false;
    passwordInput.required = false;
    contactInput.required = false;
    
    // Clear fields
    emailInput.value = "";
    nameInput.value = "";
    passwordInput.value = "";
    contactInput.value = "";
    
    const emailLabel = document.getElementById("login-email-label");
    
    if (role === "Admin") {
        if (emailGroup) emailGroup.style.display = "flex";
        if (nameGroup) nameGroup.style.display = "none";
        if (passwordGroup) passwordGroup.style.display = "flex";
        if (contactGroup) contactGroup.style.display = "none";
        if (emailLabel) emailLabel.innerText = "Email or Username *";
        
        emailInput.required = true;
        passwordInput.required = true;
        emailInput.placeholder = "e.g. maryjoydayondon27@gmail.com or maryjoy";
        
        if (credTitle) credTitle.innerText = "ADMIN";
    } else if (role === "Secretary") {
        if (emailGroup) emailGroup.style.display = "flex";
        if (nameGroup) nameGroup.style.display = "none";
        if (passwordGroup) passwordGroup.style.display = "flex";
        if (contactGroup) contactGroup.style.display = "none";
        if (emailLabel) emailLabel.innerText = "Username or Email *";
        
        emailInput.required = true;
        passwordInput.required = true;
        emailInput.placeholder = "e.g. sec_juan or secretary username";
        
        if (credTitle) credTitle.innerText = "SECRETARY";
    } else if (role === "GskLeader") {
        if (emailGroup) emailGroup.style.display = "flex";
        if (nameGroup) nameGroup.style.display = "none";
        if (passwordGroup) passwordGroup.style.display = "flex";
        if (contactGroup) contactGroup.style.display = "none";
        if (emailLabel) emailLabel.innerText = "Username or Email *";
        
        emailInput.required = true;
        passwordInput.required = true;
        emailInput.placeholder = "e.g. gsk_leader_1 or gsk.sanjose@gmail.com";
        
        if (credTitle) credTitle.innerText = "GSK LEADER";
    } else if (role === "Parishioner") {
        if (emailGroup) emailGroup.style.display = "none";
        if (nameGroup) nameGroup.style.display = "flex";
        if (passwordGroup) passwordGroup.style.display = "none";
        if (contactGroup) contactGroup.style.display = "flex";
        
        nameInput.required = true;
        contactInput.required = true;
        
        if (credTitle) credTitle.innerText = "PARISHIONER";
    }
}

function handleForgotPassword(e) {
    e.preventDefault();
    if (selectedLoginRole === "Admin") {
        alert("Admin Login Credentials:\n• Email / Username: maryjoydayondon27@gmail.com (or 'maryjoy')\n• Password: password123 (or maryjoy123 / Chaichai27)\n\nPlease contact Parish Office for direct reset requests.");
    } else if (selectedLoginRole === "Secretary") {
        alert("Secretary Login Credentials:\n• Username: sec_juan (or your registered secretary username)\n• Password: password123");
    } else if (selectedLoginRole === "GskLeader") {
        alert("GSK Leader Login Credentials:\n• Email options:\n  - San Jose: gsk.sanjose@gmail.com\n  - Santa Maria: gsk.santamaria@gmail.com\n  - San Pedro: gsk.sanpedro@gmail.com\n  - Santo Rosario: gsk.santorosario@gmail.com\n  (or Usernames: gsk_leader_1, gsk_leader_2, gsk_leader_3, gsk_leader_4)\n• Password: leader123");
    } else {
        alert("Parishioners access via registered Full Name and Contact Number. If you are not registered, please contact your GSK Leader.");
    }
}

function handleExitSystem() {
    const loginOverlay = document.getElementById("login-overlay");
    const exitScreen = document.getElementById("exit-screen");
    
    if (loginOverlay) loginOverlay.style.display = "none";
    if (exitScreen) exitScreen.style.display = "flex";
}

function togglePasswordVisibility() {
    const passwordInput = document.getElementById("login-password");
    const toggleIcon = document.getElementById("toggle-password-icon");
    if (!passwordInput || !toggleIcon) return;
    
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleIcon.setAttribute("data-lucide", "eye-off");
    } else {
        passwordInput.type = "password";
        toggleIcon.setAttribute("data-lucide", "eye");
    }
    lucide.createIcons();
}

function checkAuth() {
    const session = localStorage.getItem("GskActiveSession");
    const loginOverlay = document.getElementById("login-overlay");
    const appContainer = document.querySelector(".app-container");

    if (!session) {
        resetLoginOverlay();
        if (loginOverlay) {
            loginOverlay.style.display = "flex";
            loginOverlay.style.visibility = "visible";
            loginOverlay.style.opacity = "1";
        }
        if (appContainer) appContainer.style.display = "none";
        return false;
    }
    
    const user = JSON.parse(session);
    if (loginOverlay) {
        loginOverlay.style.display = "none";
        loginOverlay.style.visibility = "hidden";
        loginOverlay.style.opacity = "0";
    }
    if (appContainer) appContainer.style.display = "flex";
    
    // Set role attribute on body to trigger CSS restrictions
    document.body.setAttribute("data-role", user.role);
    if (user.assignedGsk && user.assignedGsk !== "All") {
        document.body.setAttribute("data-gsk", user.assignedGsk);
    } else {
        document.body.removeAttribute("data-gsk");
    }

    localStorage.setItem("GskActiveUser", user.username);
    if (user.username === "maryjoy" || user.name === "Jenifer Lim (Admin)" || user.name === "Maryjoy Admin") {
        user.name = "Maryjoy Dayondon (Admin)";
        localStorage.setItem("GskActiveSession", JSON.stringify(user));
    }
    const activeUserNameEl = document.getElementById("active-user-name");
    if (activeUserNameEl) {
        activeUserNameEl.innerText = user.name;
    }
    
    if (window.lucide && typeof lucide.createIcons === "function") {
        lucide.createIcons();
    }

    return true;
}

function handleLoginSubmit(e) {
    e.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;
    const fullName = document.getElementById("login-fullname").value.trim();
    const contact = document.getElementById("login-contact").value.trim();
    
    const errorMsg = document.getElementById("login-error-message");
    const errorText = document.getElementById("login-error-text");

    if (errorMsg) errorMsg.style.display = "none";

    const emailOrUser = email.toLowerCase();
    const passTrim = password.trim();

    // 1. Administrator Login
    if (selectedLoginRole === "Admin") {
        const users = getDB("users", []);
        const adminUser = users.find(u => 
            (u.role === "Admin" || u.role === "Administrator") &&
            (
                (u.email || "").trim().toLowerCase() === emailOrUser ||
                (u.username || "").trim().toLowerCase() === emailOrUser
            )
        );

        const isKnownAdminPass = (
            passTrim === "password123" ||
            passTrim === "maryjoy123" ||
            passTrim === "Chaichai27" ||
            passTrim === "admin123" ||
            passTrim === "password"
        );

        const isHardcodedAdmin = (
            (emailOrUser === "maryjoydayondon27@gmail.com" || emailOrUser === "maryjoy" || emailOrUser === "admin") &&
            isKnownAdminPass
        );

        const isDbMatch = adminUser && (
            (adminUser.password || "").trim() === passTrim ||
            isKnownAdminPass
        );

        if (isHardcodedAdmin || isDbMatch) {
            const session = {
                email: adminUser ? adminUser.email : "maryjoydayondon27@gmail.com",
                username: adminUser ? adminUser.username : "maryjoy",
                name: "Maryjoy Dayondon (Admin)",
                role: "Administrator",
                assignedGsk: "All"
            };
            localStorage.setItem("GskActiveSession", JSON.stringify(session));
            
            addSystemLog("LOGIN", "SETTINGS", "Administrator logged in successfully", session.username);
            showToast("Welcome back, Administrator!");
            
            initApp();
            switchSection("view-tithes-members");
            return;
        }

        // Check if user is a Secretary
        const settings = getDB("settings", DEFAULT_SETTINGS);
        const secretaries = settings.secretaries || [];
        const secMatch = secretaries.find(s =>
            (s.username || "").toLowerCase() === emailOrUser && s.active !== false && s.role !== "Administrator"
        );
        if (secMatch && (passTrim === "password123" || passTrim === "secretary123" || passTrim === "sec123" || isKnownAdminPass)) {
            const session = {
                email: "secretary@fatimaparish.org",
                username: secMatch.username,
                name: secMatch.name,
                role: "Secretary",
                assignedGsk: "All"
            };
            localStorage.setItem("GskActiveSession", JSON.stringify(session));
            addSystemLog("LOGIN", "SETTINGS", `Secretary ${secMatch.name} logged in`, session.username);
            showToast(`Welcome back, ${secMatch.name}!`);
            initApp();
            switchSection("view-tithes-members");
            return;
        }

        const secUserCheck = users.find(u =>
            (u.role === "Secretary") &&
            ((u.email || "").toLowerCase() === emailOrUser || (u.username || "").toLowerCase() === emailOrUser) &&
            ((u.password || "").trim() === passTrim || passTrim === "password123" || passTrim === "secretary123")
        );
        if (secUserCheck) {
            const session = {
                email: secUserCheck.email || "secretary@fatimaparish.org",
                username: secUserCheck.username,
                name: secUserCheck.name,
                role: "Secretary",
                assignedGsk: secUserCheck.gsk || "All"
            };
            localStorage.setItem("GskActiveSession", JSON.stringify(session));
            addSystemLog("LOGIN", "SETTINGS", `Secretary ${secUserCheck.name} logged in`, session.username);
            showToast(`Welcome, ${secUserCheck.name}!`);
            initApp();
            switchSection("view-tithes-members");
            return;
        }

        // Cross-role auto-detection: If leader credentials were typed in Admin box, log them in as GSK Leader
        const leaderCheck = users.find(u =>
            (u.role === "GskLeader" || u.role === "Leader") &&
            ((u.email || "").toLowerCase() === emailOrUser || (u.username || "").toLowerCase() === emailOrUser || (emailOrUser.includes("gsk"))) &&
            (u.password === passTrim || passTrim === "leader123" || passTrim === "Gskleader1")
        );
        if (leaderCheck) {
            const session = {
                email: leaderCheck.email,
                username: leaderCheck.username,
                name: leaderCheck.name,
                role: "GskLeader",
                assignedGsk: leaderCheck.gsk
            };
            localStorage.setItem("GskActiveSession", JSON.stringify(session));
            addSystemLog("LOGIN", "SETTINGS", `GSK Leader for ${leaderCheck.gsk} logged in`, session.username);
            showToast(`Welcome, ${leaderCheck.name}!`);
            initApp();
            switchSection("view-tithes-records-leader");
            return;
        }

        if (errorMsg && errorText) {
            errorText.innerText = "Invalid credentials. Use Email: maryjoydayondon27@gmail.com (or Username: maryjoy) with Password: password123 (or maryjoy123 / Chaichai27).";
            errorMsg.style.display = "flex";
        }
        return;
    }

    // 2. Secretary Login
    if (selectedLoginRole === "Secretary") {
        const settings = getDB("settings", DEFAULT_SETTINGS);
        const secretaries = settings.secretaries || [];
        const secMatch = secretaries.find(s =>
            (s.username || "").toLowerCase() === emailOrUser && s.active !== false
        );

        const isKnownPass = (
            passTrim === "password123" ||
            passTrim === "secretary123" ||
            passTrim === "sec123" ||
            passTrim === "maryjoy123" ||
            passTrim === "password"
        );

        if (secMatch && ((secMatch.password || "").trim() === passTrim || isKnownPass)) {
            const session = {
                email: secMatch.email || "secretary@fatimaparish.org",
                username: secMatch.username,
                name: secMatch.name,
                role: "Secretary",
                assignedGsk: "All"
            };
            localStorage.setItem("GskActiveSession", JSON.stringify(session));
            addSystemLog("LOGIN", "SETTINGS", `Secretary ${secMatch.name} logged in`, session.username);
            showToast(`Welcome back, ${secMatch.name}!`);
            initApp();
            switchSection("view-tithes-members");
            return;
        }

        const users = getDB("users", []);
        const secUserCheck = users.find(u =>
            (u.role === "Secretary") &&
            ((u.email || "").toLowerCase() === emailOrUser || (u.username || "").toLowerCase() === emailOrUser) &&
            ((u.password || "").trim() === passTrim || isKnownPass)
        );
        if (secUserCheck) {
            const session = {
                email: secUserCheck.email || "secretary@fatimaparish.org",
                username: secUserCheck.username,
                name: secUserCheck.name,
                role: "Secretary",
                assignedGsk: secUserCheck.gsk || "All"
            };
            localStorage.setItem("GskActiveSession", JSON.stringify(session));
            addSystemLog("LOGIN", "SETTINGS", `Secretary ${secUserCheck.name} logged in`, session.username);
            showToast(`Welcome back, ${secUserCheck.name}!`);
            initApp();
            switchSection("view-tithes-members");
            return;
        }

        // Cross-role auto-detection for Secretary role button
        if ((emailOrUser === "maryjoy" || emailOrUser === "maryjoydayondon27@gmail.com") && (passTrim === "password123" || passTrim === "maryjoy123" || passTrim === "Chaichai27")) {
            const session = {
                email: "maryjoydayondon27@gmail.com",
                username: "maryjoy",
                name: "Maryjoy Dayondon (Admin)",
                role: "Administrator",
                assignedGsk: "All"
            };
            localStorage.setItem("GskActiveSession", JSON.stringify(session));
            addSystemLog("LOGIN", "SETTINGS", "Administrator logged in successfully", session.username);
            showToast("Welcome back, Administrator!");
            initApp();
            switchSection("view-tithes-members");
            return;
        }

        if (errorMsg && errorText) {
            errorText.innerText = "Invalid Secretary credentials. Use username (e.g. sec_juan) and password (password123).";
            errorMsg.style.display = "flex";
        }
        return;
    }

    // 3. GSK Leader Login
    if (selectedLoginRole === "GskLeader") {
        const users = getDB("users", []);

        // Cross-role auto-detection: If admin credentials were typed in Leader box, log in as Admin
        const isKnownAdminPass = (passTrim === "password123" || passTrim === "maryjoy123" || passTrim === "Chaichai27" || passTrim === "admin123");
        if ((emailOrUser === "maryjoydayondon27@gmail.com" || emailOrUser === "maryjoy" || emailOrUser === "admin") && isKnownAdminPass) {
            const session = {
                email: "maryjoydayondon27@gmail.com",
                username: "maryjoy",
                name: "Maryjoy Dayondon (Admin)",
                role: "Administrator",
                assignedGsk: "All"
            };
            localStorage.setItem("GskActiveSession", JSON.stringify(session));
            addSystemLog("LOGIN", "SETTINGS", "Administrator logged in successfully", session.username);
            showToast("Welcome back, Administrator!");
            initApp();
            switchSection("view-tithes-members");
            return;
        }

        const isKnownLeaderPass = (
            passTrim === "leader123" ||
            passTrim === "gskleader123" ||
            passTrim === "password123" ||
            passTrim === "Gskleader1" ||
            passTrim === "Gskleader2" ||
            passTrim === "Gskleader3" ||
            passTrim === "Gskleader4"
        );

        let foundUser = users.find(u =>
            (u.role === "GskLeader" || u.role === "Leader") &&
            (
                (u.email || "").trim().toLowerCase() === emailOrUser ||
                (u.username || "").trim().toLowerCase() === emailOrUser
            ) &&
            (
                (u.password || "").trim() === passTrim ||
                (u.password || "").trim().toLowerCase() === passTrim.toLowerCase() ||
                isKnownLeaderPass
            )
        );

        if (!foundUser) {
            // Check by community name alias if full email was omitted
            foundUser = users.find(u =>
                (u.role === "GskLeader" || u.role === "Leader") &&
                (
                    (emailOrUser.includes("sanjose") && u.gsk.includes("San Jose")) ||
                    (emailOrUser.includes("santamaria") && u.gsk.includes("Santa Maria")) ||
                    (emailOrUser.includes("sanpedro") && u.gsk.includes("San Pedro")) ||
                    (emailOrUser.includes("santorosario") && u.gsk.includes("Santo Rosario"))
                ) &&
                (
                    (u.password || "").trim() === passTrim ||
                    (u.password || "").trim().toLowerCase() === passTrim.toLowerCase() ||
                    isKnownLeaderPass
                )
            );
        }

        // Fallback check against default leader records
        if (!foundUser) {
            const defaultLeadersList = [
                { id: "usr_1", name: "GSK Leader (San Jose)",     gsk: "GSK San Jose",     email: "gsk.sanjose@gmail.com",       username: "gsk_leader_1", password: "leader123" },
                { id: "usr_2", name: "GSK Leader (Santa Maria)",  gsk: "GSK Santa Maria",  email: "gsk.santamaria@gmail.com",    username: "gsk_leader_2", password: "leader123" },
                { id: "usr_3", name: "GSK Leader (San Pedro)",    gsk: "GSK San Pedro",    email: "gsk.sanpedro@gmail.com",      username: "gsk_leader_3", password: "leader123" },
                { id: "usr_4", name: "GSK Leader (Santo Rosario)", gsk: "GSK Santo Rosario", email: "gsk.santorosario@gmail.com",   username: "gsk_leader_4", password: "leader123" }
            ];

            const defMatch = defaultLeadersList.find(l =>
                (
                    l.email.toLowerCase() === emailOrUser ||
                    l.username.toLowerCase() === emailOrUser ||
                    (emailOrUser.includes("sanjose") && l.gsk.includes("San Jose")) ||
                    (emailOrUser.includes("santamaria") && l.gsk.includes("Santa Maria")) ||
                    (emailOrUser.includes("sanpedro") && l.gsk.includes("San Pedro")) ||
                    (emailOrUser.includes("santorosario") && l.gsk.includes("Santo Rosario"))
                ) &&
                (
                    l.password === passTrim ||
                    l.password.toLowerCase() === passTrim.toLowerCase() ||
                    isKnownLeaderPass
                )
            );

            if (defMatch) {
                foundUser = { ...defMatch, role: "GskLeader", status: "Active" };
            }
        }

        if (foundUser) {
            if (foundUser.status && foundUser.status !== "Active") {
                if (errorMsg && errorText) {
                    errorText.innerText = "Access Denied: This Leader account is currently inactive.";
                    errorMsg.style.display = "flex";
                }
                return;
            }

            const session = {
                email: foundUser.email,
                username: foundUser.username || foundUser.id,
                name: foundUser.name,
                role: "GskLeader",
                assignedGsk: foundUser.gsk
            };
            localStorage.setItem("GskActiveSession", JSON.stringify(session));

            addSystemLog("LOGIN", "SETTINGS", `GSK Leader for ${foundUser.gsk} logged in`, session.username);
            showToast(`Welcome, ${foundUser.name}!`);

            initApp();
            switchSection("view-tithes-records-leader");
            return;
        } else {
            if (errorMsg && errorText) {
                errorText.innerText = "Invalid credentials. Use your Username (e.g. gsk_leader_1) or Email (e.g. gsk.sanjose@gmail.com) and Password (leader123).";
                errorMsg.style.display = "flex";
            }
            return;
        }
    }

    // 3. Parishioner Login (Dynamic check against member list)
    if (selectedLoginRole === "Parishioner") {
        const members = getDB("members");
        const foundMember = members.find(m => 
            m.name.toLowerCase() === fullName.toLowerCase() && 
            (m.contact || "").trim() === contact
        );
        
        if (foundMember) {
            if (foundMember.status !== "Active") {
                if (errorMsg && errorText) {
                    errorText.innerText = "Access Denied: This member account is currently inactive.";
                    errorMsg.style.display = "block";
                }
                return;
            }
            
            const session = {
                email: "parishioner@sjbp.org",
                username: `parishioner_${foundMember.id}`,
                name: foundMember.name,
                role: "Parishioner",
                memberId: foundMember.id,
                assignedGsk: foundMember.gsk
            };
            localStorage.setItem("GskActiveSession", JSON.stringify(session));
            
            // Remember me handling
            if (rememberMe) {
                localStorage.setItem("GskRemembered_Parishioner", JSON.stringify({ name: fullName, contact: contact }));
            } else {
                localStorage.removeItem("GskRemembered_Parishioner");
            }
            
            showToast(`Welcome, ${foundMember.name}!`);
            initApp();
            switchSection("view-tithes-reports");
            return;
        } else {
            if (errorMsg && errorText) {
                errorText.innerText = "No matching member record found. Please verify your Full Name and Contact Number.";
                errorMsg.style.display = "block";
            }
            return;
        }
    }

    // Authentication failure feedback
    if (errorMsg && errorText) {
        errorText.innerText = "Incorrect credentials combination.";
        errorMsg.style.display = "block";
    }
}

function logout() {
    const session = localStorage.getItem("GskActiveSession");
    if (session) {
        const userObj = JSON.parse(session);
        if (!userObj.username.startsWith("parishioner")) {
            addSystemLog("LOGOUT", "SETTINGS", `User @${userObj.username} logged out`, userObj.username);
        }
    }
    localStorage.removeItem("GskActiveSession");
    localStorage.removeItem("GskActiveUser");
    
    showToast("Logged out successfully.", "warning");
    setTimeout(() => {
        location.reload();
    }, 600);
}

function initApp() {
    // 1. Initialize Lucide Icons
    lucide.createIcons();

    // 2. Setup Login Event Listeners
    
    const selectAdminBtn = document.getElementById("select-role-admin");
    if (selectAdminBtn) selectAdminBtn.onclick = () => selectLoginRoleState("Admin");

    const selectSecretaryBtn = document.getElementById("select-role-secretary");
    if (selectSecretaryBtn) selectSecretaryBtn.onclick = () => selectLoginRoleState("Secretary");

    const selectLeaderBtn = document.getElementById("select-role-leader");
    if (selectLeaderBtn) selectLeaderBtn.onclick = () => selectLoginRoleState("GskLeader");

    const selectParishionerBtn = document.getElementById("select-role-parishioner");
    if (selectParishionerBtn) {
        selectParishionerBtn.onclick = () => {
            const session = {
                email: "parishioner@sjbp.org",
                username: "parishioner_guest",
                name: "Parishioner (Guest)",
                role: "Parishioner",
                assignedGsk: "All"
            };
            localStorage.setItem("GskActiveSession", JSON.stringify(session));
            showToast("Welcome to the Parish Transparency Portal!");
            initApp();
            switchSection("view-tithes-reports");
        };
    }

    const backBtn = document.getElementById("login-back-btn");
    if (backBtn) backBtn.onclick = resetLoginOverlay;

    const togglePassBtn = document.getElementById("toggle-password-btn");
    if (togglePassBtn) togglePassBtn.onclick = togglePasswordVisibility;

    const forgotPassBtn = document.getElementById("login-forgot-pass");
    if (forgotPassBtn) forgotPassBtn.onclick = handleForgotPassword;

    const exitBtn = document.getElementById("login-exit-btn");
    if (exitBtn) exitBtn.onclick = handleExitSystem;

    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        // Clone and replace form to remove any old listeners
        const newForm = loginForm.cloneNode(true);
        loginForm.parentNode.replaceChild(newForm, loginForm);
        newForm.addEventListener("submit", handleLoginSubmit);
        
        // Rebind inner elements inside the cloned form
        const newToggleBtn = document.getElementById("toggle-password-btn");
        if (newToggleBtn) newToggleBtn.onclick = togglePasswordVisibility;

        const newForgotBtn = document.getElementById("login-forgot-pass");
        if (newForgotBtn) newForgotBtn.onclick = handleForgotPassword;
    }

    // 3. Authenticate and redirect
    if (!checkAuth()) {
        return; // Halt loading main app views
    }

    // 4. Setup Sidebar Navigation Event Listeners
    const navItems = document.querySelectorAll(".sidebar-nav .nav-item");
    navItems.forEach(item => {
        // Skip the logout button — it has no data-target and is handled separately
        if (item.id === "logout-btn") return;

        // Clone element to prevent double binding on re-init
        const newEl = item.cloneNode(true);
        item.parentNode.replaceChild(newEl, item);
        
        newEl.addEventListener("click", () => {
            const target = newEl.getAttribute("data-target");
            switchSection(target);
            
            // On mobile, close sidebar after clicking
            const sidebar = document.querySelector(".sidebar");
            const sidebarBackdrop = document.getElementById("sidebar-backdrop");
            if (window.innerWidth <= 768 && sidebar) {
                sidebar.classList.remove("open");
                if (sidebarBackdrop) sidebarBackdrop.classList.remove("active");
            }
        });
    });

    // 4b. Setup Mobile Menu Toggle and Backdrop
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const sidebarBackdrop = document.getElementById("sidebar-backdrop");
    const sidebar = document.querySelector(".sidebar");

    if (mobileMenuBtn && sidebar) {
        mobileMenuBtn.onclick = (e) => {
            e.stopPropagation();
            sidebar.classList.toggle("open");
            if (sidebarBackdrop) {
                sidebarBackdrop.classList.toggle("active", sidebar.classList.contains("open"));
            }
        };
    }

    if (sidebarBackdrop && sidebar) {
        sidebarBackdrop.onclick = () => {
            sidebar.classList.remove("open");
            sidebarBackdrop.classList.remove("active");
        };
    }

    // 4c. Bind Logout button (after cloning loop so it isn't replaced)
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.onclick = logout;
    }

    // 5. Setup Theme Switcher
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", toggleTheme);
    }
    loadSavedTheme();

    // 6. Initial Statistics Calculation for Main Dashboard
    updateMainDashboardStats();

    // 7. Initialize Submodule View Hooks
    if (typeof initTithesModule === "function") initTithesModule();
    if (typeof initMortuaryModule === "function") initMortuaryModule();
    if (typeof initSettingsModule === "function") initSettingsModule();
    if (typeof initLeaderTithesModule === "function") initLeaderTithesModule();
    if (typeof initLeaderMortuaryModule === "function") initLeaderMortuaryModule();

    // Initial population of dropdowns and views
    if (typeof populateDynamicYearDropdowns === "function") populateDynamicYearDropdowns();
    if (typeof populateGSKDropdowns === "function") populateGSKDropdowns();
    if (typeof renderMemberFolderTabs === "function") renderMemberFolderTabs();
    if (typeof renderMembersTable === "function") renderMembersTable();
    if (typeof window.populateAllMemberDropdowns === "function") window.populateAllMemberDropdowns();
    if (typeof renderLeaderTithes === "function") renderLeaderTithes();
    if (typeof renderLeaderMortuary === "function") renderLeaderMortuary();
    if (typeof renderMortuaryContributionsView === "function") renderMortuaryContributionsView();
    if (typeof renderLeaderMembers === "function") renderLeaderMembers();

    // 8. Add Click Close Handler to Modals Overlay (Close on click background)
    const modals = document.querySelectorAll(".modal-overlay");
    modals.forEach(modal => {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });

    // 9. Load Active Page Display Name
    const settings = getDB("settings", DEFAULT_SETTINGS);
    
    // Force patch old system names
    if (settings.systemName && (settings.systemName.includes("SJBP") || settings.systemName.includes("St. John") || settings.systemName.includes("Mortuary") || settings.systemName.includes("Portal"))) {
        settings.systemName = "FATIMA PARISH";
        saveDB("settings", settings);
    }
    
    // Force patch allocations to 20% GSK / 20% Chapel / 60% Parokya
    if (!settings.allocations || settings.allocations.gskShare === 30 || settings.allocations.parokyaShare === 50 || settings.allocations.parokyaShare === 40 || (Number(settings.allocations.gskShare) + Number(settings.allocations.chapelShare) + Number(settings.allocations.parokyaShare) !== 100)) {
        settings.allocations = {
            gskShare: 20,
            chapelShare: 20,
            parokyaShare: 60
        };
        saveDB("settings", settings);
    }
    
    const systemName = settings.systemName || DEFAULT_SETTINGS.systemName;
    const brandName = document.getElementById("brand-system-name");
    if (brandName) {
        brandName.innerText = systemName.split(" - ")[0];
    }

    // 9b. Activate the proper default view based on user role
    const activeSessionStr = localStorage.getItem("GskActiveSession");
    if (activeSessionStr) {
        try {
            const activeUser = JSON.parse(activeSessionStr);
            const currentActiveView = document.querySelector(".view-section.active-view");
            if (!currentActiveView || currentActiveView.id === "view-tithes-members" || currentActiveView.id === "view-dashboard") {
                if (activeUser.role === "GskLeader") {
                    switchSection("view-tithes-records-leader");
                } else if (activeUser.role === "Parishioner") {
                    switchSection("view-tithes-reports");
                } else {
                    switchSection("view-tithes-members");
                }
            } else {
                switchSection(currentActiveView.id);
            }
        } catch (_) {}
    }

    // 10. Real-Time Sync across multiple tabs/windows
    window.addEventListener("storage", function(e) {
        // If any of our app's LocalStorage keys change in another window
        if (e.key && e.key.startsWith("GskSystem_")) {
            // Automatically recount dashboard stats based on updated data
            updateMainDashboardStats();
            
            // Automatically re-render the currently active section
            const activeSection = document.querySelector(".view-section.active-view");
            if (activeSection) {
                triggerSectionLoader(activeSection.id);
            }
        }
    });
}

// Single Page Navigation Controller
function switchSection(sectionId) {
    // 1. Verify Role Permissions for target view
    const sessionStr = localStorage.getItem("GskActiveSession");
    if (sessionStr) {
        const session = JSON.parse(sessionStr);
        if (session.role === "Parishioner") {
            const forbidden = [
                "view-tithes-funds", "view-tithes-settings", "view-mortuary-contributions", "view-mortuary-reports",
                "view-tithes-records-leader", "view-mortuary-records-leader", "view-members-leader", "view-reports-leader", "view-admin-users"
            ];
            if (forbidden.includes(sectionId) || !sectionId || sectionId === "view-dashboard") {
                switchSection("view-tithes-reports");
                return;
            }
        } else if (session.role === "GskLeader") {
            const forbidden = [
                "view-tithes-members", "view-tithes-funds", "view-tithes-reports", "view-tithes-settings",
                "view-mortuary-overview", "view-mortuary-records", "view-mortuary-contributions", "view-mortuary-reports", "view-admin-users"
            ];
            if (forbidden.includes(sectionId) || !sectionId || sectionId === "view-dashboard") {
                switchSection("view-tithes-records-leader");
                return;
            }
        } else if (session.role === "Secretary" || session.role === "Administrator" || session.role === "Admin") {
            const forbidden = [
                "view-tithes-records-leader", "view-mortuary-records-leader", "view-members-leader", "view-reports-leader"
            ];
            if (forbidden.includes(sectionId) || !sectionId || sectionId === "view-dashboard") {
                switchSection("view-tithes-members");
                return;
            }
        }
    }

    // Deactivate all sections
    const sections = document.querySelectorAll(".view-section");
    sections.forEach(sec => sec.classList.remove("active-view"));

    // Activate selected section
    const activeSec = document.getElementById(sectionId);
    if (activeSec) {
        activeSec.classList.add("active-view");
    }

    // Update Nav active styling
    const navItems = document.querySelectorAll(".sidebar-nav .nav-item");
    navItems.forEach(item => {
        if (item.getAttribute("data-target") === sectionId) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });

    // Update Top Header Information
    updateHeaderTitle(sectionId);

    // Call Section-specific loaders
    triggerSectionLoader(sectionId);
}

function updateHeaderTitle(sectionId) {
    const pageTitle = document.getElementById("current-page-title");
    const pageDesc = document.getElementById("current-page-desc");

    const sessionStr = localStorage.getItem("GskActiveSession");
    let isParishioner = false;
    let isSecretary = false;
    let isLeader = false;
    if (sessionStr) {
        try {
            const s = JSON.parse(sessionStr);
            if (s.role === "Parishioner") isParishioner = true;
            if (s.role === "Secretary") isSecretary = true;
            if (s.role === "GskLeader") isLeader = true;
        } catch (_) {}
    }

    if (isParishioner && sectionId === "view-tithes-reports") {
        if (pageTitle) pageTitle.innerText = "Parishioner Dashboard";
        if (pageDesc) pageDesc.innerText = "View parish financial transparency summaries, monthly reports, and contribution records.";
        return;
    }

    if (isSecretary && sectionId === "view-tithes-members") {
        if (pageTitle) pageTitle.innerText = "Secretary Dashboard";
        if (pageDesc) pageDesc.innerText = "Manage parish members, tithes records, and general overview.";
        return;
    }

    if (isLeader && sectionId === "view-tithes-records-leader") {
        if (pageTitle) pageTitle.innerText = "GSK Leader Dashboard";
        if (pageDesc) pageDesc.innerText = "View, search, and record Tithes and Mortuary contributions for your assigned GSK.";
        return;
    }

    const titles = {

        "view-tithes-members": { title: "Overview & Member Management", desc: "View total GSK counts, manage members list, active status and review histories." },
        "view-tithes-funds": { title: "Manage Tithes", desc: "Record tithes and manage percentages allocations (GSK, Chapel, and Parokya Shares)." },
        "view-tithes-reports": { title: "Reports & Financial History", desc: "Explore transaction ledgers, analytics, logs and export statements." },
        "view-admin-users": { title: "Account Directory", desc: "Create, edit, and manage GSK Leader access accounts." },
        "view-tithes-settings": { title: "Settings & Configurations", desc: "Manage general properties, percentage rules, secretary permissions, and backups." },
        "view-mortuary-overview": { title: "Mortuary Overview", desc: "Summaries of active contributions and deceased profiles." },
        "view-mortuary-records": { title: "Manage Deceased Records", desc: "Registry directory of all deceased members and assistance cases." },
        "view-mortuary-contributions": { title: "Mortuary Contributions", desc: "Record and review contributions towards active mortuary assistances." },
        "view-mortuary-reports": { title: "Mortuary Reports & Analytics", desc: "Track financial statements and payout balances for mortuary support." },
        "view-tithes-records-leader": { title: "Financial Records", desc: "View, search, and record Tithes and Mortuary contributions for your assigned GSK." },
        "view-mortuary-records-leader": { title: "Mortuary Records", desc: "View, search, and record mortuary contributions for your assigned GSK." },
        "view-members-leader": { title: "Members Management", desc: "Add, edit, and manage members in your assigned GSK." },
        "view-reports-leader": { title: "Reports History", desc: "View transaction histories and total collections for your assigned GSK." }
    };

    if (titles[sectionId]) {
        if (pageTitle) pageTitle.innerText = titles[sectionId].title;
        if (pageDesc) pageDesc.innerText = titles[sectionId].desc;
    }
}

// Router/Controller hook to load data dynamically on tab switch
function triggerSectionLoader(sectionId) {
    if (typeof window.populateAllMemberDropdowns === "function") {
        window.populateAllMemberDropdowns();
    }
    switch (sectionId) {
        case "view-dashboard":
            updateMainDashboardStats();
            break;
        case "view-tithes-members":
            if (typeof renderMemberFolderTabs === "function") renderMemberFolderTabs();
            if (typeof renderMembersTable === "function") renderMembersTable();
            if (typeof populateGSKDropdowns === "function") populateGSKDropdowns();
            break;
        case "view-tithes-funds":
            if (typeof renderTitheFundDetails === "function") renderTitheFundDetails();
            break;
        case "view-tithes-reports":
            if (typeof renderTitheReports === "function") renderTitheReports();
            break;
        case "view-tithes-settings":
            if (typeof renderSettingsView === "function") renderSettingsView();
            break;
        case "view-admin-users":
            if (typeof renderUserAccounts === "function") renderUserAccounts();
            if (typeof populateGSKDropdowns === "function") populateGSKDropdowns();
            break;
        case "view-mortuary-overview":
            if (typeof renderMortuaryOverview === "function") renderMortuaryOverview();
            break;
        case "view-mortuary-records":
            if (typeof renderMortuaryFolderTabs === "function") renderMortuaryFolderTabs();
            if (typeof renderDeceasedTable === "function") renderDeceasedTable();
            break;
        case "view-mortuary-contributions":
            if (typeof renderMortuaryContributionsView === "function") renderMortuaryContributionsView();
            break;
        case "view-mortuary-reports":
            if (typeof renderMortuaryReportsView === "function") renderMortuaryReportsView();
            break;
        case "view-tithes-records-leader":
            if (typeof renderLeaderTithes === "function") renderLeaderTithes();
            if (typeof renderLeaderMortuary === "function") renderLeaderMortuary();
            break;
        case "view-mortuary-records-leader":
            if (typeof renderLeaderMortuary === "function") renderLeaderMortuary();
            break;
        case "view-members-leader":
            if (typeof renderLeaderMembers === "function") renderLeaderMembers();
            if (typeof populateGSKDropdowns === "function") populateGSKDropdowns();
            break;
        case "view-reports-leader":
            if (typeof renderUnifiedLeaderSubmissions === "function") renderUnifiedLeaderSubmissions();
            break;
    }
}

// ==================== STATS AGGREGATOR ====================
// ==================== STATS AGGREGATOR ====================
function updateMainDashboardStats() {
    const members = getDB("members");
    const tithes = getDB("tithes");
    const deceased = getDB("deceased");
    const mortuaryContributions = getDB("mortuary_contributions");
    const logs = getDB("logs");

    let filteredMembers = [...members];
    let filteredTithes = [...tithes];
    let filteredDeceased = [...deceased];
    let filteredMortuary = [...mortuaryContributions];
    let filteredLogs = [...logs];
    
    const sessionStr = localStorage.getItem("GskActiveSession");
    let activeRole = "Administrator";
    let assignedGsk = "All";
    let activeName = "";

    if (sessionStr) {
        const session = JSON.parse(sessionStr);
        activeRole = session.role;
        assignedGsk = session.assignedGsk || "All";
        activeName = session.name;

        if (activeRole === "GskLeader") {
            const sessionUser = (session.username || "").toLowerCase().trim();
            const sessionEmail = (session.email || "").toLowerCase().trim();
            const aGsk = (assignedGsk || "").toLowerCase().trim();

            filteredMembers = members.filter(m => {
                const sub = (m.submittedBy || "").toLowerCase().trim();
                const mGsk = (m.gsk || "").toLowerCase().trim();
                return (sub && (sub === sessionUser || sub === sessionEmail)) || (aGsk && aGsk !== "all" && (mGsk === aGsk || mGsk.includes(aGsk)));
            });
            filteredDeceased = deceased.filter(d => d.gsk === assignedGsk || assignedGsk === "All");
            
            filteredTithes = tithes.filter(t => {
                const sub = (t.submittedBy || "").toLowerCase().trim();
                const member = members.find(m => m.id === t.memberId);
                const mGsk = (member && member.gsk ? member.gsk : (t.gsk || "")).toLowerCase().trim();
                return (sub && (sub === sessionUser || sub === sessionEmail)) || (aGsk && aGsk !== "all" && (mGsk === aGsk || mGsk.includes(aGsk)));
            });
            
            filteredMortuary = mortuaryContributions.filter(c => {
                const sub = (c.submittedBy || "").toLowerCase().trim();
                const mGsk = (c.gsk || "").toLowerCase().trim();
                return (sub && (sub === sessionUser || sub === sessionEmail)) || (aGsk && aGsk !== "all" && (mGsk === aGsk || mGsk.includes(aGsk)));
            });
            
            filteredLogs = logs.filter(log => log.user === session.username || (sessionUser && (log.user || "").toLowerCase() === sessionUser));
        } else if (activeRole === "Parishioner") {
            filteredMembers = [...members];
            filteredDeceased = [...deceased];
            filteredTithes = [...tithes];
            filteredMortuary = [...mortuaryContributions];
            filteredLogs = []; // Parishioners do not see activity logs
        }
    }

    // Removed global UI Year/Month filters from Main Dashboard Stats.
    // Dashboard must always show the all-time Grand Totals.

    // 1. Calculate stats
    const activeMembersCount = filteredMembers.filter(m => m.status === "Active").length;
    
    // Total Tithes amount
    const totalTithes = filteredTithes.reduce((sum, item) => sum + Number(item.amount), 0);
    // Total Mortuary amount
    const totalMortuary = filteredMortuary.reduce((sum, item) => sum + Number(item.amount), 0);
    const totalCollections = totalTithes + totalMortuary;

    // Display counts


    const dashActiveMembersEl = document.getElementById("dash-active-members");
    if (dashActiveMembersEl) dashActiveMembersEl.innerText = activeMembersCount;

    const dashTithesCollectionsEl = document.getElementById("dash-tithes-collections");
    if (dashTithesCollectionsEl) dashTithesCollectionsEl.innerText = formatCurrency(totalTithes);

    const dashMortuaryCollectionsEl = document.getElementById("dash-mortuary-collections");
    if (dashMortuaryCollectionsEl) dashMortuaryCollectionsEl.innerText = formatCurrency(totalMortuary);

    // ============================================
    // MAIN DASHBOARD TITHES ALLOCATIONS SUMMARY
    // ============================================
    const settings = getDB("settings", DEFAULT_SETTINGS);
    const allocations = settings.allocations || DEFAULT_SETTINGS.allocations;

    const mainDashTithesTotal = document.getElementById("main-dash-tithes-total");
    if (mainDashTithesTotal) mainDashTithesTotal.innerText = formatCurrency(totalTithes);

    const chapelShare = totalTithes * (allocations.chapelShare / 100);
    const gskShare = totalTithes * (allocations.gskShare / 100);
    const parishShare = totalTithes * (allocations.parokyaShare / 100);

    const mainDashChapelShare = document.getElementById("main-dash-chapel-share");
    if (mainDashChapelShare) mainDashChapelShare.innerText = formatCurrency(chapelShare);
    const chapelLabel = document.getElementById("main-dash-chapel-label");
    if (chapelLabel) chapelLabel.innerText = `Chapel Share (${allocations.chapelShare}%)`;

    const mainDashGskShare = document.getElementById("main-dash-gsk-share");
    if (mainDashGskShare) mainDashGskShare.innerText = formatCurrency(gskShare);
    const gskLabel = document.getElementById("main-dash-gsk-label");
    if (gskLabel) gskLabel.innerText = `GSK Share (${allocations.gskShare}%)`;

    const mainDashParishShare = document.getElementById("main-dash-parish-share");
    if (mainDashParishShare) mainDashParishShare.innerText = formatCurrency(parishShare);
    const parishLabel = document.getElementById("main-dash-parish-label");
    if (parishLabel) parishLabel.innerText = `Parish Share (${allocations.parokyaShare}%)`;

    // GSK Share Breakdown
    const mainDashGskBreakdown = document.getElementById("main-dash-gsk-breakdown");
    if (mainDashGskBreakdown) {
        mainDashGskBreakdown.innerHTML = "";
        const allGroups = typeof getAllGskGroups === "function" ? getAllGskGroups() : GSK_LIST;
        const perGskShare = allGroups.length > 0 ? (gskShare / allGroups.length) : 0;
        allGroups.forEach(gskName => {
            mainDashGskBreakdown.innerHTML += `
                <tr>
                    <td><strong>${gskName}</strong></td>
                    <td><strong style="color:var(--primary);">${formatCurrency(perGskShare)}</strong></td>
                </tr>
            `;
        });
    }

    // 2. Load Recent Activity Logs (top 5)
    const recentActivitiesContainer = document.getElementById("dashboard-recent-activities");
    if (recentActivitiesContainer) {
        recentActivitiesContainer.innerHTML = "";
        
        const recentLogs = filteredLogs.slice(0, 5);
        if (recentLogs.length === 0) {
            recentActivitiesContainer.innerHTML = `<div style="text-align:center; padding:20px; color:var(--text-muted);">No recent logs.</div>`;
        } else {
            recentLogs.forEach(log => {
                const dateStr = formatDate(log.timestamp);
                
                // Map actions to visual details
                let icon = "info";
                let typeClass = "info";

                if (log.action.includes("TITHE")) {
                    icon = "coins";
                    typeClass = "primary";
                } else if (log.action.includes("MORTUARY") || log.action.includes("DECEASED")) {
                    icon = "heart-off";
                    typeClass = "danger";
                } else if (log.action.includes("MEMBER")) {
                    icon = "user";
                    typeClass = "success";
                } else if (log.action.includes("SETTING")) {
                    icon = "sliders-horizontal";
                    typeClass = "warning";
                }

                const recentItem = document.createElement("div");
                recentItem.className = "recent-item";
                recentItem.innerHTML = `
                    <div style="display:flex; align-items:center; gap:12px;">
                        <div class="stat-icon ${typeClass}" style="width:36px; height:36px; font-size:16px;">
                            <i data-lucide="${icon}"></i>
                        </div>
                        <div class="recent-details">
                            <h4>${log.details}</h4>
                            <p>${dateStr} &bull; by @${log.user}</p>
                        </div>
                    </div>
                `;
                recentActivitiesContainer.appendChild(recentItem);
            });
            lucide.createIcons();
        }
    }

    // 2b. Load Monitoring Dashboard (if Admin or Secretary)
    if (activeRole === "Administrator" || activeRole === "Secretary" || activeRole === "Admin") {
        initAdminMonitoringDashboard();
    }

    // 2c. Synchronize Chapel & GSK Dashboards
    if (typeof renderChapelFinancialDashboard === "function") renderChapelFinancialDashboard();
    if (typeof renderGskFinancialDashboard === "function") renderGskFinancialDashboard();
}

// Chart.js Collections Overview Render
function renderDashboardCollectionsChart(tithes, mortuaryContributions) {
    const ctx = document.getElementById("dashboardCollectionsChart");
    if (!ctx) return;

    // Aggregate monthly data for 2026
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const titheData = Array(12).fill(0);
    const mortuaryData = Array(12).fill(0);

    // Populate Tithes by month
    tithes.forEach(t => {
        const d = new Date(t.date);
        if (d.getFullYear() === 2026) {
            titheData[d.getMonth()] += Number(t.amount);
        }
    });

    // Populate Mortuary by month
    mortuaryContributions.forEach(mc => {
        const d = new Date(mc.date);
        if (d.getFullYear() === 2026) {
            mortuaryData[d.getMonth()] += Number(mc.amount);
        }
    });

    // Destroy chart if already exists to redraw fresh
    if (dashboardCollectionsChart) {
        dashboardCollectionsChart.destroy();
    }

    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const gridColor = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.05)";
    const textColor = isDark ? "#94a3b8" : "#64748b";

    dashboardCollectionsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Tithes Collections (₱)',
                    data: titheData,
                    backgroundColor: 'rgba(99, 102, 241, 0.75)', // Indigo
                    borderColor: 'rgb(99, 102, 241)',
                    borderWidth: 1,
                    borderRadius: 4
                },
                {
                    label: 'Mortuary Collections (₱)',
                    data: mortuaryData,
                    backgroundColor: 'rgba(16, 185, 129, 0.75)', // Emerald
                    borderColor: 'rgb(16, 185, 129)',
                    borderWidth: 1,
                    borderRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: { color: textColor, font: { family: 'Outfit', size: 12 } }
                }
            },
            scales: {
                x: {
                    grid: { color: gridColor },
                    ticks: { color: textColor, font: { family: 'Outfit' } }
                },
                y: {
                    grid: { color: gridColor },
                    ticks: { color: textColor, font: { family: 'Outfit' } },
                    beginAtZero: true
                }
            }
        }
    });
}

// ==================== THEME CONTROLLER ====================
function toggleTheme() {
    const htmlEl = document.documentElement;
    const currentTheme = htmlEl.getAttribute("data-theme") || "light";
    const newTheme = currentTheme === "light" ? "dark" : "light";
    
    htmlEl.setAttribute("data-theme", newTheme);
    
    // Save to settings db
    const settings = getDB("settings", DEFAULT_SETTINGS);
    settings.theme = newTheme;
    saveDB("settings", settings);

    // Update toggle button icon
    updateThemeIcon(newTheme);

    // Refresh active chart views to adapt to colors
    const activeSection = document.querySelector(".view-section.active-view");
    if (activeSection) {
        triggerSectionLoader(activeSection.id);
    }
}

function loadSavedTheme() {
    const settings = getDB("settings", DEFAULT_SETTINGS);
    const savedTheme = settings.theme || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
    const icon = document.getElementById("theme-icon");
    if (!icon) return;
    if (theme === "dark") {
        icon.setAttribute("data-lucide", "moon");
    } else {
        icon.setAttribute("data-lucide", "sun");
    }
    lucide.createIcons();
}

// ==================== DIALOG/MODALS UTILITY ====================
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add("active-modal");
        
        // Disable scroll on body
        document.body.style.overflow = "hidden";
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove("active-modal");
        // Restore scroll on body
        document.body.style.overflow = "";
    }
}

// ==================== TOAST NOTIFICATIONS ====================
function showToast(message, type = "success") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;

    let icon = "check-circle";
    if (type === "danger") icon = "alert-circle";
    if (type === "warning") icon = "alert-triangle";

    toast.innerHTML = `
        <i data-lucide="${icon}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);
    lucide.createIcons();

    // Auto remove after 3.5s
    setTimeout(() => {
        toast.style.transition = "all 0.3s ease";
        toast.style.opacity = "0";
        toast.style.transform = "translateY(-20px)";
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3500);
}

// ==================== FORMATTERS ====================
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP'
    }).format(amount);
}

function formatDate(dateString) {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatDateTime(isoString) {
    if (!isoString) return "-";
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString;
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
}

function getSubmitterDetails(username) {
    if (username === "maryjoy") {
        return { name: "Maryjoy Dayondon (Admin)", gsk: "All (Admin)" };
    }
    if (username === "sec_juan") {
        return { name: "Juan Dela Cruz", gsk: "Parish Office" };
    }
    const settings = getDB("settings");
    const secretaries = settings.secretaries || [];
    const sec = secretaries.find(s => s.username === username);
    if (sec) {
        return { name: sec.name, gsk: sec.role === "Administrator" ? "All (Admin)" : "Parish Office" };
    }
    if (username === "gsk_leader_1") {
        return { name: "Mary Dayondon", gsk: "GSK San Jose" };
    }
    if (username === "gsk_leader_2") {
        return { name: "GSK Santa Maria Leader", gsk: "GSK Santa Maria" };
    }
    if (username === "gsk_leader_3") {
        return { name: "GSK San Pedro Leader", gsk: "GSK San Pedro" };
    }
    if (username === "gsk_leader_4") {
        return { name: "GSK Santo Rosario Leader", gsk: "GSK Santo Rosario" };
    }
    return { name: username || "System", gsk: "All" };
}

// ==================== ADMIN MONITORING DASHBOARD ====================

// ==================== ADMIN MONITORING DASHBOARD ====================

let currentAdminMonitoringMonth = null;
let currentAdminActiveGsk = null;

function initAdminMonitoringDashboard() {
    const container = document.getElementById("admin-month-buttons-container");
    if (!container) return;
    
    container.innerHTML = "";
    
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    
    const currentYear = new Date().getFullYear();
    const tithes = getDB("tithes", []);
    const mortuary = getDB("mortuary_contributions", []);
    const yearsSet = new Set();
    for (let y = 2020; y <= Math.max(2030, currentYear + 4); y++) {
        yearsSet.add(y);
    }
    const extractYear = (dateStr) => {
        if (!dateStr) return;
        const d = (typeof parseLocalDate === "function") ? parseLocalDate(dateStr) : new Date(dateStr);
        if (!isNaN(d.getFullYear()) && d.getFullYear() > 1900) yearsSet.add(d.getFullYear());
    };
    tithes.forEach(t => extractYear(t.date || t.submittedAt));
    mortuary.forEach(m => extractYear(m.date || m.submittedAt));
    const sortedYears = Array.from(yearsSet).sort((a, b) => b - a);
    
    const selectHtml = `
        <div style="display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; align-items: center;">
            <label for="admin-year-dropdown" class="sr-only">Filter Monitoring by Year</label>
            <select id="admin-year-dropdown" class="form-control" style="max-width: 130px; border: 2px solid var(--primary); font-weight: bold; color: var(--primary);" aria-label="Filter Monitoring by Year" title="Filter by Year">
                ${sortedYears.map(y => `<option value="${y}" ${y === currentYear ? 'selected' : ''}>${y}</option>`).join("")}
            </select>
            <label for="admin-month-dropdown" class="sr-only">Filter Monitoring by Month</label>
            <select id="admin-month-dropdown" class="form-control" style="max-width: 300px; border: 2px solid var(--primary); font-weight: bold; color: var(--primary);" aria-label="Filter Monitoring by Month" title="Filter by Month">
                <option value="">-- Select Period to Monitor --</option>
                <option value="ALL">All Months (Entire Year)</option>
                ${months.map((month, index) => `<option value="${index + 1}">${month}</option>`).join("")}
            </select>
        </div>
    `;
    
    container.innerHTML = selectHtml;

    const yearDropdown = document.getElementById("admin-year-dropdown");
    const monthDropdown = document.getElementById("admin-month-dropdown");

    const updateView = () => {
        const selectedMonthVal = monthDropdown.value;
        const selectedYearVal = yearDropdown.value;
        currentAdminActiveGsk = null; // Reset active GSK on month change
        
        if (selectedMonthVal === "ALL") {
            currentAdminMonitoringMonth = "ALL";
            document.getElementById("admin-monitoring-selected-month").innerText = "Entire Year " + selectedYearVal + " Records";
            renderAdminMonthlyRecords();
        } else if (selectedMonthVal) {
            currentAdminMonitoringMonth = parseInt(selectedMonthVal, 10);
            const monthName = months[currentAdminMonitoringMonth - 1];
            document.getElementById("admin-monitoring-selected-month").innerText = monthName + " " + selectedYearVal + " Records";
            renderAdminMonthlyRecords();
        } else {
            currentAdminMonitoringMonth = null;
            const view = document.getElementById("admin-gsk-monitoring-view");
            if (view) view.style.display = "none";
        }
    };

    yearDropdown.addEventListener("change", updateView);
    monthDropdown.addEventListener("change", updateView);

    // Event listeners for search
    const searchInput = document.getElementById("admin-monitoring-search");
    if (searchInput && !searchInput.dataset.hasListener) {
        searchInput.addEventListener("input", () => {
            // Re-render the tables for the active GSK if search changes
            if (currentAdminActiveGsk) {
                renderAdminGskTables(currentAdminActiveGsk);
            }
        });
        searchInput.dataset.hasListener = "true";
    }
}

// Store the filtered datasets globally for the current month view
let globalFilteredTithes = [];
let globalFilteredMortuary = [];

function renderAdminMonthlyRecords() {
    const view = document.getElementById("admin-gsk-monitoring-view");
    if (!view || !currentAdminMonitoringMonth) return;

    view.style.display = "block";

    const tithes = getDB("tithes");
    const mortuary = getDB("mortuary_contributions");
    const members = getDB("members");

    // Helper to extract month and year
    const getMonthFromDate = (dateString) => {
        if (!dateString) return -1;
        return new Date(dateString).getMonth() + 1;
    };
    const getYearFromDate = (dateString) => {
        if (!dateString) return -1;
        return new Date(dateString).getFullYear();
    };

    const targetYear = parseInt(document.getElementById("admin-year-dropdown").value, 10);

    // Filter by Month & Year ONLY
    globalFilteredTithes = tithes.filter(t => {
        const recordYear = getYearFromDate(t.submittedAt || t.date);
        if (recordYear !== targetYear) return false;
        if (currentAdminMonitoringMonth !== "ALL") {
            const recordMonth = getMonthFromDate(t.submittedAt || t.date);
            if (recordMonth !== currentAdminMonitoringMonth) return false;
        }
        return true;
    }).sort((a, b) => new Date(b.submittedAt || b.date) - new Date(a.submittedAt || a.date));

    globalFilteredMortuary = mortuary.filter(m => {
        const recordYear = getYearFromDate(m.submittedAt || m.date);
        if (recordYear !== targetYear) return false;
        if (currentAdminMonitoringMonth !== "ALL") {
            const recordMonth = getMonthFromDate(m.submittedAt || m.date);
            if (recordMonth !== currentAdminMonitoringMonth) return false;
        }
        return true;
    }).sort((a, b) => new Date(b.submittedAt || b.date) - new Date(a.submittedAt || a.date));

    // Find which GSKs actually have records this month
    const getMemberDetails = (memberId) => members.find(m => m.id === memberId) || { gsk: "Unknown", name: "Unknown Member" };
    
    const submittedGsks = new Set();
    globalFilteredTithes.forEach(t => {
        const mem = getMemberDetails(t.memberId);
        const gskVal = (mem && mem.gsk !== "Unknown") ? mem.gsk : (t.gsk || "");
        if (gskVal) submittedGsks.add(gskVal);
    });
    globalFilteredMortuary.forEach(m => {
        const mem = getMemberDetails(m.memberId);
        const gskVal = (mem && mem.gsk !== "Unknown") ? mem.gsk : (m.gsk || "");
        if (gskVal) submittedGsks.add(gskVal);
    });

    const gskButtonsContainer = document.getElementById("admin-monitoring-gsk-buttons-container");
    const gskSectionsContainer = document.getElementById("admin-monitoring-gsk-sections");
    
    gskButtonsContainer.innerHTML = "";
    gskSectionsContainer.innerHTML = "";

    if (submittedGsks.size === 0) {
        gskSectionsContainer.innerHTML = `<div style="text-align:center; padding: 40px; color: var(--text-muted);"><i data-lucide="inbox" style="width:48px; height:48px; margin-bottom:10px;"></i><br><h3>No records found for this period.</h3></div>`;
        lucide.createIcons();
        return;
    }

    // Create buttons for each submitted GSK
    let isFirst = true;
    GSK_LIST.forEach(gsk => {
        if (submittedGsks.has(gsk)) {
            const btn = document.createElement("button");
            btn.className = "btn btn-outline-primary admin-gsk-tab-btn";
            btn.innerHTML = `<i data-lucide="users"></i> ${gsk}`;
            
            btn.onclick = () => {
                document.querySelectorAll(".admin-gsk-tab-btn").forEach(b => {
                    b.classList.remove("btn-primary");
                    b.classList.add("btn-outline-primary");
                });
                btn.classList.remove("btn-outline-primary");
                btn.classList.add("btn-primary");
                
                currentAdminActiveGsk = gsk;
                renderAdminGskTables(gsk);
            };
            
            gskButtonsContainer.appendChild(btn);

            // Auto-click the first button
            if (isFirst) {
                isFirst = false;
                btn.click();
            }
        }
    });
    
    lucide.createIcons();
}

function renderAdminGskTables(gsk) {
    const gskSectionsContainer = document.getElementById("admin-monitoring-gsk-sections");
    if (!gskSectionsContainer) return;
    
    const searchTerm = (document.getElementById("admin-monitoring-search").value || "").toLowerCase();
    const members = getDB("members");

    const getMemberDetails = (memberId) => members.find(m => m.id === memberId) || { name: "Unknown Member", gsk: "Unknown" };

    // Filter the global arrays for the specific GSK & search term
    const filterFn = (record) => {
        const mem = getMemberDetails(record.memberId);
        const recGsk = (mem && mem.gsk !== "Unknown") ? mem.gsk : (record.gsk || "");
        if (recGsk !== gsk) return false;
        
        if (searchTerm) {
            const leaderInfo = getSubmitterDetails(record.submittedBy);
            const memName = (mem && mem.name !== "Unknown Member") ? mem.name : (record.contributorName || "");
            const matchName = memName.toLowerCase().includes(searchTerm);
            const matchLeader = leaderInfo.name.toLowerCase().includes(searchTerm);
            if (!matchName && !matchLeader) return false;
        }
        return true;
    };

    const gskTithes = globalFilteredTithes.filter(filterFn);
    const gskMortuary = globalFilteredMortuary.filter(filterFn);

    gskSectionsContainer.innerHTML = `
        <div style="margin-top: 10px; border: 1px solid var(--border-color); border-radius: 8px; padding: 20px; background: var(--card-bg);">
            <h3 style="color: var(--primary); border-bottom: 2px solid var(--primary); padding-bottom: 10px; margin-bottom: 20px; font-size: 1.5rem;">
                ${gsk} Submissions
            </h3>

            <!-- Tithes Table -->
            <h4 style="margin-top: 10px; margin-bottom: 12px; color: var(--primary); display: flex; align-items: center; gap: 8px;">
                <i data-lucide="coins"></i> Tithes Contributions
            </h4>
            <div class="table-responsive" style="margin-bottom: 30px;">
                <table class="custom-table">
                    <thead>
                        <tr>
                            <th>Member Name</th>
                            <th>Amount</th>
                            <th>Date Submitted</th>
                            <th>Contribution Type</th>
                            <th>Recorded By (GSK Leader)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${gskTithes.length === 0 ? `<tr><td colspan="5" style="text-align:center; color:var(--text-muted);">No Tithes submissions found.</td></tr>` : 
                            gskTithes.map(t => {
                                const mem = getMemberDetails(t.memberId);
                                const leaderInfo = getSubmitterDetails(t.submittedBy);
                                const displayName = (mem && mem.name !== "Unknown Member") ? mem.name : (t.contributorName || "Member");
                                return `
                                <tr>
                                    <td><strong>${displayName}</strong></td>
                                    <td><strong style="color: var(--primary);">${formatCurrency(t.amount)}</strong></td>
                                    <td style="font-family: monospace; font-size: 0.9em;">${formatDateTime(t.submittedAt || new Date(t.date).toISOString())}</td>
                                    <td><span class="badge badge-info">Tithes</span></td>
                                    <td>${leaderInfo.name}</td>
                                </tr>`;
                            }).join('')
                        }
                    </tbody>
                </table>
            </div>

            <!-- Mortuary Table -->
            <h4 style="margin-bottom: 12px; color: var(--danger); display: flex; align-items: center; gap: 8px;">
                <i data-lucide="heart"></i> Mortuary Contributions
            </h4>
            <div class="table-responsive">
                <table class="custom-table">
                    <thead>
                        <tr>
                            <th>Member Name</th>
                            <th>Amount</th>
                            <th>Date Submitted</th>
                            <th>Contribution Type</th>
                            <th>Recorded By (GSK Leader)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${gskMortuary.length === 0 ? `<tr><td colspan="5" style="text-align:center; color:var(--text-muted);">No Mortuary submissions found.</td></tr>` : 
                            gskMortuary.map(m => {
                                const mem = getMemberDetails(m.memberId);
                                const leaderInfo = getSubmitterDetails(m.submittedBy);
                                const displayName = (mem && mem.name !== "Unknown Member") ? mem.name : (m.contributorName || "Member");
                                return `
                                <tr>
                                    <td><strong>${displayName}</strong></td>
                                    <td><strong style="color: var(--danger);">${formatCurrency(m.amount)}</strong></td>
                                    <td style="font-family: monospace; font-size: 0.9em;">${formatDateTime(m.submittedAt || new Date(m.date).toISOString())}</td>
                                    <td><span class="badge badge-danger">Mortuary</span></td>
                                    <td>${leaderInfo.name}</td>
                                </tr>`;
                            }).join('')
                        }
                    </tbody>
                </table>
            </div>
        </div>
    `;

    lucide.createIcons();
}
