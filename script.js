document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.querySelector("#hero .form-control");
    let suggestionsDiv = null;

    searchInput.style.borderBottom = "none";


    function refreshAutocomplete() {
        const inputValue = searchInput.value;
        const filteredCities = cities.filter(function(city) {
            return city.toLowerCase().includes(inputValue.toLowerCase());
        });

        if (suggestionsDiv) {
            suggestionsDiv.remove();
        }

        if (inputValue && filteredCities.length > 0) {
            suggestionsDiv = document.createElement("div");
            suggestionsDiv.id = "autocomplete";
            suggestionsDiv.style.position = "absolute";
            suggestionsDiv.style.background = "#fff";
            suggestionsDiv.style.color = "#000000";
            suggestionsDiv.style.width = "200px";
            suggestionsDiv.style.top = "45%";
            suggestionsDiv.style.left = "44.5%";
            suggestionsDiv.style.zIndex = "1000";
            suggestionsDiv.style.paddingLeft = "10px";
            suggestionsDiv.style.fontSize = "16px";
            suggestionsDiv.style.borderRadius = "3px";

            filteredCities.forEach(function(city) {
                const suggestion = document.createElement("div");
                suggestion.textContent = city;
                suggestion.style.padding = "5px";
                suggestion.style.cursor = "pointer";
                suggestion.addEventListener("click", function() {
                    searchInput.value = city;
                    if (suggestionsDiv) {
                        suggestionsDiv.remove();
                        searchInput.style.borderBottom = "1px solid #ccc"; 
                    }
                });
                suggestionsDiv.appendChild(suggestion);
            });

            document.querySelector("#hero").appendChild(suggestionsDiv);
        } else {
            searchInput.style.borderBottom = "1px solid #ccc"; 
        }
    }


    function handleOutsideClick(event) {
        if (suggestionsDiv && !suggestionsDiv.contains(event.target) && event.target !== searchInput) {
            if (suggestionsDiv) {
                suggestionsDiv.remove();
            }
        } else if (event.target === searchInput) {
            refreshAutocomplete();
        }
    }


    searchInput.addEventListener("input", refreshAutocomplete);
    searchInput.addEventListener("focus", refreshAutocomplete); 
    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("touchend", handleOutsideClick);

    const cities = ["Los Angeles", "New York", "Chicago"];
});

document.addEventListener("DOMContentLoaded", function() {
    const overlay = document.querySelector("#overlay");
    const auth = document.querySelector("#auth");
    const loginForm = document.querySelector("#login-form");
    const signupForm = document.querySelector("#signup-form");
    const toggleAuth = document.querySelector("#toggle-auth");
    const exitBtn = document.querySelector(".exitbtn");
    const loginBtn = document.querySelector("#loginbtn");
    const signupBtn = document.querySelector("#signupbtn");

    function showAuth(target) {
        overlay.style.display = "block";
        auth.style.display = "block";
        if (target === "login") {
            loginForm.style.display = "block";
            signupForm.style.display = "none";
            auth.style.height = "65%";
            toggleAuth.textContent = "Switch to Sign Up";
        } else if (target === "signup") {
            loginForm.style.display = "none";
            signupForm.style.display = "block";
            auth.style.height = "58%";
            toggleAuth.textContent = "Switch to Log In";
        }
    }

    function hideAuth() {
        overlay.style.display = "none";
        auth.style.display = "none";
    }
 
    loginBtn.addEventListener("click", function(event) {
        event.preventDefault();
        showAuth("login");
    });

    signupBtn.addEventListener("click", function(event) {
        event.preventDefault();
        showAuth("signup");
    });

    document.querySelector(".authbutton").addEventListener("click", function(event) {
        event.preventDefault();
        showAuth();
    });

    document.querySelectorAll("[data-target]").forEach(button => {
        button.addEventListener("click", function(event) {
            event.preventDefault();
            const target = this.getAttribute("data-target");
            showAuth(target);
        });
    });

    toggleAuth.addEventListener("click", function() {
        if (loginForm.style.display === "none") {
            loginForm.style.display = "block";
            signupForm.style.display = "none";
            auth.style.height = "65%";
            toggleAuth.textContent = "Switch to Sign Up";
        } else {
            loginForm.style.display = "none";
            signupForm.style.display = "block";
            auth.style.height = "58%";
            toggleAuth.textContent = "Switch to Log In";
        }
    });

    exitBtn.addEventListener("click", hideAuth);

    overlay.addEventListener("click", hideAuth);
});