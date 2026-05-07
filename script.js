
window.onload = function() {


    var allLinks = document.querySelectorAll("nav ul li a");
    var currentURL = window.location.href;
    var isHomePage = currentURL.includes("index.html") || currentURL.endsWith("/");

    if (!isHomePage) {
        for (var i = 0; i < allLinks.length; i++) {
            var href = allLinks[i].getAttribute("href");
            if (href != null && currentURL.includes(href) && href != "#") {
                allLinks[i].classList.add("active-link");
            }
        }
    }
// ye code webpage me smooth scrolling implement kar ke deta hai 

    var anchorLinks = document.querySelectorAll('a[href^="#"]');

    for (var i = 0; i < anchorLinks.length; i++) {
        anchorLinks[i].onclick = function(e) {
            var targetId = this.getAttribute("href");

           
            if (targetId == "#") return;

            var targetSection = document.querySelector(targetId);

            if (targetSection != null) {
                e.preventDefault();
                
                targetSection.scrollIntoView({ behavior: "smooth" });
            }
        }
    }

    // ye internal anchor links ke liye smooth scrolling implement karti hai
    var allSections = document.querySelectorAll("section[id]");

    if (allSections.length > 0) {
        window.addEventListener("scroll", function() {
            var scrollPos = window.scrollY + 120; 

            for (var i = 0; i < allSections.length; i++) {
                var section = allSections[i];
                var sectionTop = section.offsetTop;
                var sectionBottom = sectionTop + section.offsetHeight;
                var sectionId = section.getAttribute("id");

                if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                    
                    for (var j = 0; j < allLinks.length; j++) {
                        allLinks[j].classList.remove("active-link");
                    }

                    
                    var activeLink = document.querySelector('nav ul li a[href="#' + sectionId + '"]');
                    if (activeLink != null) {
                        activeLink.classList.add("active-link");
                    }
                }
            }
        });
    }

    // ye code page  scrolling ke according dynamic ui effects apply karta hai

    window.onscroll = function() {
        var navbar = document.querySelector(".navbar");
        if (navbar != null) {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = "0 4px 15px rgba(0,0,0,0.15)";
                navbar.style.backgroundColor = "rgba(232, 226, 214, 0.97)";
            } else {
                navbar.style.boxShadow = "none";
                navbar.style.backgroundColor = "#e8e2d6";
            }
        }

      
        var backBtn = document.getElementById("backToTop");
        if (backBtn != null) {
            if (window.scrollY > 400) {
                backBtn.style.display = "block";
            } else {
                backBtn.style.display = "none";
            }
        }
    }

    //ye cod eback to top buitton functionality implement karta hai

    var backToTopBtn = document.getElementById("backToTop");

    if (backToTopBtn != null) {
        backToTopBtn.onclick = function() {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }

   //ye saracode searching ke liye use hota hai isme humne live searching dalne ki bhi kosish ki hai

    var searchInput = document.getElementById("searchInput");
    var searchBtn = document.getElementById("searchBtn");

    if (searchBtn != null) {
        searchBtn.onclick = function() {
            doSearch();
        }
    }

    if (searchInput != null) {
        searchInput.onkeyup = function(e) {
            if (e.key == "Enter") {
                doSearch();
            }
            doSearch(); 
        }
    }

    function doSearch() {
        var word = searchInput.value.toLowerCase();

        searchCards(document.querySelectorAll(".product-card"), word);
        searchCards(document.querySelectorAll(".shop-card"), word);
        searchCards(document.querySelectorAll(".arrival-card"), word);
        searchCards(document.querySelectorAll(".deal-card"), word);
        searchCards(document.querySelectorAll(".team-card"), word);

        showNoResultsMsg();
    }

    function searchCards(cards, word) {
        for (var i = 0; i < cards.length; i++) {
            var cardText = cards[i].innerText.toLowerCase();
            if (word == "" || cardText.includes(word)) {
                cards[i].style.display = "block";
            } else {
                cards[i].style.display = "none";
            }
        }
    }

    function showNoResultsMsg() {
        var oldMsg = document.getElementById("noResultMsg");
        if (oldMsg != null) oldMsg.remove();

        var allCards = document.querySelectorAll(".product-card, .shop-card, .arrival-card, .deal-card");
        var visibleCount = 0;

        for (var i = 0; i < allCards.length; i++) {
            if (allCards[i].style.display != "none") {
                visibleCount++;
            }
        }

        if (visibleCount == 0 && searchInput.value != "") {
            var msg = document.createElement("p");
            msg.id = "noResultMsg";
            msg.innerText = "Sorry, no products found for '" + searchInput.value + "' 😕";
            msg.style.color = "#7a5c35";
            msg.style.fontSize = "18px";
            msg.style.textAlign = "center";
            msg.style.padding = "30px";
            msg.style.width = "100%";

            var grid = document.querySelector(".product-grid, .shop-grid, .arrival-grid, .deals-grid");
            if (grid != null) grid.appendChild(msg);
        }
    }

//categorery bases pe kaam karta user jo bhi choose kare ga uske hissab se dikhaye ga 

    var categoryBtns = document.querySelectorAll(".category-btn");

    for (var i = 0; i < categoryBtns.length; i++) {
        categoryBtns[i].onclick = function() {
            var selectedCat = this.getAttribute("data-category");
            var group = this.getAttribute("data-group"); // which section this belongs to

            
            var siblingBtns;
            if (group != null) {
                siblingBtns = document.querySelectorAll('.category-btn[data-group="' + group + '"]');
            } else {
                siblingBtns = this.closest(".category-filter").querySelectorAll(".category-btn");
            }

            
            for (var j = 0; j < siblingBtns.length; j++) {
                siblingBtns[j].classList.remove("active-cat");
            }
            this.classList.add("active-cat");

            
            var parentSection = this.closest("section") || this.closest(".products-page") || this.closest(".shop") || this.closest(".new-arrivals") || this.closest(".deals");

            var cardSelector = ".product-card, .shop-card, .arrival-card, .deal-card";
            var cardsToFilter;

            if (parentSection != null) {
                cardsToFilter = parentSection.querySelectorAll(cardSelector);
            } else {
                cardsToFilter = document.querySelectorAll(cardSelector);
            }

            for (var k = 0; k < cardsToFilter.length; k++) {
                var cardCat = cardsToFilter[k].getAttribute("data-category");
                if (selectedCat == "all" || cardCat == selectedCat) {
                    cardsToFilter[k].style.display = "block";
                } else {
                    cardsToFilter[k].style.display = "none";
                }
            }
        }
    }

   //shop section ye products ko low to high vegera vegrra set karta hai

    var sortDropdown = document.getElementById("sortPrice");

    if (sortDropdown != null) {
        sortDropdown.onchange = function() {
            var val = this.value;
            var grid = document.querySelector(".shop-grid");
            if (grid == null) return;

            var cards = Array.from(grid.querySelectorAll(".shop-card"));

            if (val == "lowtohigh") {
                cards.sort(function(a, b) {
                    var pa = parseInt(a.querySelector("p").innerText.replace(/[^0-9]/g, ""));
                    var pb = parseInt(b.querySelector("p").innerText.replace(/[^0-9]/g, ""));
                    return pa - pb;
                });
            } else if (val == "hightolow") {
                cards.sort(function(a, b) {
                    var pa = parseInt(a.querySelector("p").innerText.replace(/[^0-9]/g, ""));
                    var pb = parseInt(b.querySelector("p").innerText.replace(/[^0-9]/g, ""));
                    return pb - pa;
                });
            }

            for (var i = 0; i < cards.length; i++) {
                grid.appendChild(cards[i]);
            }
        }
    }

   //contact valiodation ye check kare ga kuchj empty or galat to nhi aga hai to alert dega 

    var contactForm = document.getElementById("contactForm") || document.querySelector(".contact form");

    if (contactForm != null) {
        contactForm.onsubmit = function(e) {
            e.preventDefault();

            var name = document.getElementById("contactName") || contactForm.querySelector("input[type='text']");
            var email = document.getElementById("contactEmail") || contactForm.querySelector("input[type='email']");
            var message = document.getElementById("contactMessage") || contactForm.querySelector("textarea");

            if (name.value.trim() == "") {
                alert("Please enter your name!");
                name.focus();
                return;
            }
            if (email.value.trim() == "" || !email.value.includes("@")) {
                alert("Please enter a valid email!");
                email.focus();
                return;
            }
            if (message.value.trim() == "") {
                alert("Please write your message!");
                message.focus();
                return;
            }

            showToast("Message sent successfully! We will contact you soon 😊");
            contactForm.reset();
        }
    }

  //login page

    var loginForm = document.getElementById("loginForm");
    var registerForm = document.getElementById("registerForm");

    if (registerForm != null) {
        registerForm.onsubmit = function(e) {
            e.preventDefault();

            var uname = document.getElementById("regUsername").value.trim();
            var uemail = document.getElementById("regEmail").value.trim();
            var upass = document.getElementById("regPassword").value;

            if (uname == "" || uemail == "" || upass == "") {
                showMsgBox("registerMsg", "Please fill all fields!", "red");
                return;
            }
            if (!uemail.includes("@")) {
                showMsgBox("registerMsg", "Enter a valid email!", "red");
                return;
            }
            if (upass.length < 6) {
                showMsgBox("registerMsg", "Password should be at least 6 characters!", "red");
                return;
            }

            var userData = { username: uname, email: uemail, password: upass };
            localStorage.setItem("fragranceUser", JSON.stringify(userData));
            showMsgBox("registerMsg", "Account created! Now you can login ✅", "green");
            registerForm.reset();
        }
    }

    if (loginForm != null) {
        loginForm.onsubmit = function(e) {
            e.preventDefault();

            var uname = document.getElementById("loginUsername").value.trim();
            var upass = document.getElementById("loginPassword").value;

            if (uname == "" || upass == "") {
                showMsgBox("loginMsg", "Please fill all fields!", "red");
                return;
            }

            var savedUser = JSON.parse(localStorage.getItem("fragranceUser"));

            if (savedUser == null) {
                showMsgBox("loginMsg", "No account found. Please register first!", "red");
                return;
            }

            if (savedUser.username == uname && savedUser.password == upass) {
                showMsgBox("loginMsg", "Login successful! Welcome back " + uname + " 👋", "green");
                loginForm.reset();
            } else {
                showMsgBox("loginMsg", "Wrong username or password!", "red");
            }
        }
    }

    function showMsgBox(id, text, color) {
        var msgBox = document.getElementById(id);
        if (msgBox != null) {
            msgBox.innerText = text;
            msgBox.style.color = color;
            msgBox.style.display = "block";
            setTimeout(function() {
                msgBox.style.display = "none";
            }, 4000);
        }
    }
//add to cart

    var allBuyBtns = document.querySelectorAll(".product-card .btn, .shop-card .btn, .arrival-card .btn, .deal-card .btn");

    for (var i = 0; i < allBuyBtns.length; i++) {
        allBuyBtns[i].onclick = function(e) {
            e.preventDefault();

            var card = this.closest(".product-card") || this.closest(".shop-card") || this.closest(".arrival-card") || this.closest(".deal-card");

            var productName = card.querySelector("h3").innerText;
            var priceEl = card.querySelector(".new-price") || card.querySelector("p");
            var productPrice = priceEl ? priceEl.innerText : "N/A";

            var cart = JSON.parse(localStorage.getItem("fragranceCart"));
            if (cart == null) cart = [];

            var found = false;
            for (var j = 0; j < cart.length; j++) {
                if (cart[j].name == productName) {
                    cart[j].qty = cart[j].qty + 1;
                    found = true;
                    break;
                }
            }

            if (!found) {
                cart.push({ name: productName, price: productPrice, qty: 1 });
            }

            localStorage.setItem("fragranceCart", JSON.stringify(cart));
            showToast("Added to cart: " + productName + " 🛒");
        }
    }

//  cart page vala section

    var cartItemsList = document.getElementById("cartItemsList");

    if (cartItemsList != null) {
        loadCart();
    }

    function loadCart() {
        var cart = JSON.parse(localStorage.getItem("fragranceCart"));
        var emptyMsg = document.getElementById("emptyCartMsg");

        // clear old content but keep empty message
        var oldRows = document.querySelectorAll(".cart-item-row");
        for (var i = 0; i < oldRows.length; i++) {
            oldRows[i].remove();
        }

        if (cart == null || cart.length == 0) {
            if (emptyMsg != null) emptyMsg.style.display = "block";
            updateSummary([]); // show zero totals
            return;
        }

        if (emptyMsg != null) emptyMsg.style.display = "none";

        for (var i = 0; i < cart.length; i++) {
            var item = cart[i];

            var row = document.createElement("div");
            row.className = "cart-item-row";

            // get  price
            var numPrice = parseInt(item.price.replace(/[^0-9]/g, "")) || 0;
            var itemTotal = numPrice * item.qty;

            row.innerHTML =
                '<span class="cart-item-name">' + item.name + '</span>' +
                '<span class="cart-item-price">' + item.price + '</span>' +
                '<div class="cart-qty-box">' +
                    '<button class="qty-btn" data-name="' + item.name + '" data-action="minus">-</button>' +
                    '<span class="qty-count">' + item.qty + '</span>' +
                    '<button class="qty-btn" data-name="' + item.name + '" data-action="plus">+</button>' +
                '</div>' +
                '<span class="cart-item-price">₹' + itemTotal + '</span>' +
                '<button class="remove-btn" data-name="' + item.name + '">Remove</button>';

            cartItemsList.appendChild(row);
        }

        // qty buttons
        var qtyBtns = document.querySelectorAll(".qty-btn");
        for (var i = 0; i < qtyBtns.length; i++) {
            qtyBtns[i].onclick = function() {
                var name = this.getAttribute("data-name");
                var action = this.getAttribute("data-action");
                changeQty(name, action);
            }
        }

        // remove buttons
        var removeBtns = document.querySelectorAll(".remove-btn");
        for (var i = 0; i < removeBtns.length; i++) {
            removeBtns[i].onclick = function() {
                var name = this.getAttribute("data-name");
                removeFromCart(name);
            }
        }

        updateSummary(cart);
    }

    function changeQty(name, action) {
        var cart = JSON.parse(localStorage.getItem("fragranceCart"));
        if (cart == null) return;

        for (var i = 0; i < cart.length; i++) {
            if (cart[i].name == name) {
                if (action == "plus") {
                    cart[i].qty = cart[i].qty + 1;
                } else if (action == "minus") {
                    cart[i].qty = cart[i].qty - 1;
                    if (cart[i].qty <= 0) {
                        cart.splice(i, 1); // remove item if qty goes to 0
                    }
                }
                break;
            }
        }

        localStorage.setItem("fragranceCart", JSON.stringify(cart));
        loadCart(); // reload cart display
    }

    function removeFromCart(name) {
        var cart = JSON.parse(localStorage.getItem("fragranceCart"));
        if (cart == null) return;

        var newCart = [];
        for (var i = 0; i < cart.length; i++) {
            if (cart[i].name != name) {
                newCart.push(cart[i]); // keep items that dont match
            }
        }

        localStorage.setItem("fragranceCart", JSON.stringify(newCart));
        showToast(name + " removed from cart 🗑️");
        loadCart();
    }

    // clear cart button
    var clearCartBtn = document.getElementById("clearCartBtn");
    if (clearCartBtn != null) {
        clearCartBtn.onclick = function() {
            localStorage.removeItem("fragranceCart");
            showToast("Cart cleared! 🗑️");
            loadCart();
        }
    }

    function updateSummary(cart) {
        var totalItems = 0;
        var subtotal = 0;

        for (var i = 0; i < cart.length; i++) {
            totalItems = totalItems + cart[i].qty;
            var numPrice = parseInt(cart[i].price.replace(/[^0-9]/g, "")) || 0;
            subtotal = subtotal + (numPrice * cart[i].qty);
        }

        var totalItemsEl = document.getElementById("totalItems");
        var subtotalEl = document.getElementById("subtotalPrice");
        var totalEl = document.getElementById("totalPrice");

        if (totalItemsEl != null) totalItemsEl.innerText = totalItems;
        if (subtotalEl != null) subtotalEl.innerText = "₹" + subtotal;
        if (totalEl != null) totalEl.innerText = "₹" + subtotal; // delivery is free
    }

   //checkout page

    var checkoutSummaryDiv = document.getElementById("checkoutItemsDiv");

    if (checkoutSummaryDiv != null) {
        loadCheckoutSummary();
    }

    function loadCheckoutSummary() {
        var cart = JSON.parse(localStorage.getItem("fragranceCart"));
        var summaryDiv = document.getElementById("checkoutItemsDiv");

        if (cart == null || cart.length == 0) {
            summaryDiv.innerHTML = '<p style="color:#888; text-align:center;">No items found. Please add items to cart first.</p>';
            return;
        }

        var totalAmount = 0;
        summaryDiv.innerHTML = ""; // clear old content

        for (var i = 0; i < cart.length; i++) {
            var item = cart[i];
            var numPrice = parseInt(item.price.replace(/[^0-9]/g, "")) || 0;
            var itemTotal = numPrice * item.qty;
            totalAmount = totalAmount + itemTotal;

            var row = document.createElement("div");
            row.className = "checkout-item-row";
            row.innerHTML =
                '<span>' + item.name + ' x' + item.qty + '</span>' +
                '<span>₹' + itemTotal + '</span>';

            summaryDiv.appendChild(row);
        }

        // show total
        var totalRow = document.createElement("div");
        totalRow.className = "checkout-total-row";
        totalRow.innerHTML = '<span>Total Amount</span><span>₹' + totalAmount + '</span>';
        summaryDiv.appendChild(totalRow);
    }

    // checkout form submit
    var checkoutForm = document.getElementById("checkoutForm");

    if (checkoutForm != null) {
        checkoutForm.onsubmit = function(e) {
            e.preventDefault();

            var fname = document.getElementById("firstName").value.trim();
            var lname = document.getElementById("lastName").value.trim();
            var addr = document.getElementById("address").value.trim();
            var city = document.getElementById("city").value.trim();
            var phone = document.getElementById("phone").value.trim();
            var payment = document.getElementById("paymentMethod").value;

            if (fname == "" || lname == "" || addr == "" || city == "" || phone == "") {
                alert("Please fill all the details!");
                return;
            }

            if (phone.length < 10) {
                alert("Please enter a valid phone number!");
                return;
            }

            if (payment == "") {
                alert("Please select a payment method!");
                return;
            }

           // order placed
            localStorage.removeItem("fragranceCart");

            checkoutForm.style.display = "none";

            var successMsg = document.getElementById("orderSuccess");
            if (successMsg != null) {
                successMsg.style.display = "block";
            }

            showToast("Order placed successfully! 🎉");
        }
    }

    
//  scrolling
   

    var animateCards = document.querySelectorAll(".product-card, .shop-card, .arrival-card, .deal-card, .team-card, .col-3");

    for (var i = 0; i < animateCards.length; i++) {
        animateCards[i].style.opacity = "0";
        animateCards[i].style.transform = "translateY(30px)";
        animateCards[i].style.transition = "opacity 0.5s, transform 0.5s";
    }

    var observer = new IntersectionObserver(function(entries) {
        for (var i = 0; i < entries.length; i++) {
            if (entries[i].isIntersecting) {
                entries[i].target.style.opacity = "1";
                entries[i].target.style.transform = "translateY(0)";
            }
        }
    }, { threshold: 0.1 });

    for (var i = 0; i < animateCards.length; i++) {
        observer.observe(animateCards[i]);
    }

    // toast notification
    

    function showToast(message) {
        var oldToast = document.getElementById("myToast");
        if (oldToast != null) oldToast.remove();

        var toast = document.createElement("div");
        toast.id = "myToast";
        toast.innerText = message;

        toast.style.position = "fixed";
        toast.style.bottom = "30px";
        toast.style.right = "30px";
        toast.style.background = "#1f2d26";
        toast.style.color = "white";
        toast.style.padding = "15px 25px";
        toast.style.borderRadius = "25px";
        toast.style.fontSize = "14px";
        toast.style.zIndex = "9999";
        toast.style.fontFamily = "Poppins, sans-serif";
        toast.style.boxShadow = "0 5px 15px rgba(0,0,0,0.3)";
        toast.style.opacity = "0";
        toast.style.transition = "opacity 0.4s";

        document.body.appendChild(toast);

        setTimeout(function() {
            toast.style.opacity = "1";
        }, 10);

        setTimeout(function() {
            toast.style.opacity = "0";
            setTimeout(function() {
                toast.remove();
            }, 400);
        }, 3000);
    }

} 

        var paymentSelect = document.getElementById("paymentMethod");
        if (paymentSelect != null) {
            paymentSelect.onchange = function() {
                var val = this.value;
                var upiField = document.getElementById("upiField");
                var cardFields = document.getElementById("cardFields");
                upiField.style.display = "none";
                cardFields.style.display = "none";
                if (val == "upi") {
                    upiField.style.display = "block";
                } else if (val == "card") {
                    cardFields.style.display = "block";
                }
            }
        }
    
