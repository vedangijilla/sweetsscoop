/* ===== navbar ===== */
function toggleMenu(){
document.getElementById("navMenu").classList.toggle("active");
}

/* ===== HERO SLIDER + SPARKLE ===== */
const hero = document.querySelector('.hero');
const heroText = document.querySelector('.hero-text'); // h1/p/a wrap div

// sparkle effect
function createSparkle() {
  let sparkle = document.createElement('div');
  sparkle.classList.add('sparkle');
  sparkle.style.left = Math.random() * window.innerWidth + 'px';
  sparkle.style.top = Math.random() * window.innerHeight / 2 + 'px';
  hero.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 2000);
}
setInterval(createSparkle, 500);

// heroText fadeIn on load
if(heroText){
  heroText.classList.add('fadeIn');
}

/* ===== CART & ORDERS ===== */
let cart = [];
let orders = [];

function addToCart(flavor, price){

cart.push({flavor, price});

updateCartCount();

alert(flavor + " added to cart");

}


function updateCartCount(){

document.getElementById("cartCount").innerText = cart.length;

let adminCart = document.getElementById("cartStats");
if(adminCart){
adminCart.innerText = cart.length;
}

}


function viewCart(){

if(cart.length === 0){
alert("Cart empty!");
return;
}

let html = `<div style="padding:20px; max-width:400px; background:white; border-radius:15px;">`;

html += `<h2>Your Cart</h2><ul>`;

let total = 0;

cart.forEach((item, index)=>{

total += item.price;

html += `<li>
${item.flavor} - ₹${item.price}
<button onclick="removeFromCart(${index})">Remove</button>
</li>`;

});

html += `</ul><p>Total: ₹${total}</p>`;

html += `<button onclick="checkout()">Checkout</button>
<button onclick="closeCart()">Close</button></div>`;


let overlay = document.createElement("div");

overlay.id = "cartOverlay";

overlay.style.position = "fixed";
overlay.style.top = "0";
overlay.style.left = "0";
overlay.style.width = "100%";
overlay.style.height = "100%";
overlay.style.background = "rgba(0,0,0,0.6)";
overlay.style.display = "flex";
overlay.style.justifyContent = "center";
overlay.style.alignItems = "center";

overlay.innerHTML = html;

document.body.appendChild(overlay);

}

function removeFromCart(idx){

cart.splice(idx,1);

updateCartCount();

closeCart();
viewCart();

}

function checkout(){

if(cart.length === 0){
alert("Cart empty!");
return;
}

let name = prompt("Enter your name");
let mobile = prompt("Enter your mobile number");

if(!name || !mobile){
alert("Order cancelled");
return;
}

let dt = new Date();

cart.forEach(item=>{

orders.push({
name:name,
mobile:mobile,
order:item.flavor,
price:item.price,
status:"Order Placed",
time:dt.toLocaleString()
});

});

cart = [];

alert("Order placed successfully!");

showOrderNotification();
updateAdminDashboard();

closeCart();

}

function closeCart(){

let overlay = document.getElementById("cartOverlay");

if(overlay){
overlay.remove();
}

}



/* ORDER NOW SINGLE ITEM */
function orderNow(flavor, price){

let name = prompt("Enter your name");
let mobile = prompt("Enter your mobile number");

if(!name || !mobile){
alert("Order cancelled");
return;
}

let dt = new Date();

orders.push({
name:name,
mobile:mobile,
order:flavor,
price:price,
status:"Order Placed",
time:new Date().toLocaleString()
});

alert("Order placed successfully!");

showOrderNotification();
updateAdminDashboard();

}


/* CHECK ORDER STATUS */
function checkOrderStatus(){
  let mobile = document.getElementById('statusMobile').value;
  let result = orders.find(o => o.mobile === mobile);
  let output = document.getElementById('orderResult');
  if(result){
    output.innerHTML = `<p>Order: ${result.order} <br> Status: ${result.status} <br> Time/Date: ${result.time}</p>`;
  } else{
    output.innerHTML = `<p>No order found for this number.</p>`;
  }
}

/* ===== CONTACT FORM ===== */
let contactQueries = [];

function submitContact(){

let n = document.getElementById("contactName").value;
let e = document.getElementById("contactEmail").value;
let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

if(!emailPattern.test(e)){
alert("Enter valid email");
return;
}
let m = document.getElementById("contactMobile").value;
let msg = document.getElementById("contactMessage").value;

if(!n || !e || !m || !msg){
alert("Fill all fields");
return;
}

contactQueries.push({
name:n,
email:e,
mobile:m,
message:msg,
status:"Pending"
});

alert("Query submitted successfully");

document.getElementById("contactName").value="";
document.getElementById("contactEmail").value="";
document.getElementById("contactMobile").value="";
document.getElementById("contactMessage").value="";

updateAdminDashboard();   // ⭐ important
}

/* ===== SPARKLES ABOUT + CONTACT ===== */
function createAboutSparkle(){
  const container = document.querySelector('.about-sparkles');
  if(!container) return;
  let sparkle = document.createElement('div');
  sparkle.classList.add('about-sparkle');
  sparkle.style.left = Math.random()*window.innerWidth+'px';
  sparkle.style.top = Math.random()*60+'%';
  container.appendChild(sparkle);
  setTimeout(()=>sparkle.remove(),2000);
}

function createContactSparkle(){
  const container = document.querySelector('.contact-sparkles');
  if(!container) return;
  let sparkle = document.createElement('div');
  sparkle.classList.add('contact-sparkle');
  sparkle.style.left = Math.random()*window.innerWidth+'px';
  sparkle.style.top = Math.random()*60+'%';
  container.appendChild(sparkle);
  setTimeout(()=>sparkle.remove(),2000);
}
setInterval(createContactSparkle, 400);


/* ===== ADMIN LOGIN ===== */
function adminLogin(){
  let user=document.getElementById('adminUser').value;
  let pass=document.getElementById('adminPass').value;

  // default credentials
  if(user==="admin" && pass==="1234"){
    document.getElementById('adminLogin').style.display='none';
    document.getElementById('adminPanel').style.display='block';
    updateAdminDashboard();
  } else{
    alert("Invalid Username or Password");
  }
}

/* ===== ADMIN DASHBOARD ===== */
function updateAdminDashboard(){

document.getElementById("totalOrders").innerText = orders.length;
document.getElementById("totalQueries").innerText = contactQueries.length;
document.getElementById("cartStats").innerText = cart.length;

/* ORDERS TABLE */

let orderBody = document.querySelector("#orderTable tbody");

orderBody.innerHTML = "";

orders.forEach((o)=>{

let row = document.createElement("tr");

row.innerHTML = `
<td>${o.name}</td>
<td>${o.mobile}</td>
<td>${o.order}</td>
<td>${o.status}</td>
<td>${o.time}</td>
`;

orderBody.appendChild(row);

});

/* QUERIES TABLE */

let queryBody = document.querySelector("#queryTable tbody");

queryBody.innerHTML = "";

contactQueries.forEach((q)=>{

let row = document.createElement("tr");

row.innerHTML = `
<td>${q.name}</td>
<td>${q.email}</td>
<td>${q.mobile}</td>
<td>${q.message}</td>
<td>${q.status}</td>
`;

queryBody.appendChild(row);

});

}

/* ===== TABLE ACTIONS ===== */
function updateOrderStatus(idx){
  let newStatus = prompt("Enter new status:", orders[idx].status);
  if(newStatus) orders[idx].status = newStatus;
  updateAdminDashboard();
}
function deleteOrder(idx){
  if(confirm("Delete this order?")){
    orders.splice(idx,1);
    updateAdminDashboard();
  }
}
function updateQueryStatus(idx){
  contactQueries[idx].status = "Completed";
  updateAdminDashboard();
}
function deleteQuery(idx){
  if(confirm("Delete this query?")){
    contactQueries.splice(idx,1);
    updateAdminDashboard();
  }
}

function changeOrderStatus(index, newStatus){

orders[index].status = newStatus;

updateAdminDashboard();

alert("Order status updated");

}


/* ===== ADMIN BUTTON FUNCTIONS ===== */
function clearOrders(){
  if(confirm("Clear all orders?")){
    orders=[];
    updateAdminDashboard();
  }
}
function clearQueries(){
  if(confirm("Clear all queries?")){
    contactQueries=[];
    updateAdminDashboard();
  }
}
function logout(){
  document.getElementById('adminPanel').style.display='none';
  document.getElementById('adminLogin').style.display='block';
}

/* ===== ADD FLAVOUR TO WEBSITE ===== */
function addFlavour(){
  let flavor = prompt("Enter new flavour name:");
  let price = prompt("Enter price for " + flavor);
  if(flavor && price){
    let div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `<img src="images/default.png" alt="${flavor}">
                     <p>${flavor}</p>
                     <p>₹${price}</p>
                     <button class="addBtn" onclick="addToCart('${flavor}',${price})">Add to Cart</button>
                     <button class="orderBtn" onclick="orderNow('${flavor}',${price})">Order Now</button>`;
    document.querySelector('.flavor-cards').appendChild(div);
    alert(flavor + " added!");
  }
}

/* ===== ADD TO CART FROM ADMIN ===== */
function adminAddToCart(){

let select = document.getElementById("flavourSelect");

let flavor = select.value;

let price = prompt("Enter price for " + flavor);

if(!price){
alert("Price required");
return;
}

cart.push({
flavor:flavor,
price:parseInt(price)
});

alert(flavor + " added to cart");

document.getElementById("cartStats").innerText = cart.length;

updateAdminDashboard();

}


/* ===== SEARCH ORDERS ===== */
function searchOrders(){
  let name=document.getElementById('searchOrder').value.toLowerCase();
  let filtered = orders.filter(o=> (o.name || 'Guest').toLowerCase().includes(name));
  let orderList = document.getElementById('orderList');
  orderList.innerHTML='';
  filtered.forEach(o=>{
    let div=document.createElement('div');
    div.innerHTML=`Name: ${o.name||'Guest'}, Flavor: ${o.order}, Price: ₹${o.price||'N/A'}, Status: ${o.status}`;
    orderList.appendChild(div);
  });
}

/* ===== CHANGE FLAVOUR PRICE ===== */
function changePrice(){
  let flavor = prompt("Enter flavour to change price:");
  let price = prompt("Enter new price:");
  if(flavor && price){
    document.querySelectorAll('.card').forEach(card=>{
      if(card.querySelector('p').innerText === flavor){
        card.querySelectorAll('p')[1].innerText='₹'+price;
      }
    });
    alert(flavor + " price updated!");
  }
}

/* ===== CHANGE ADMIN LOGIN ===== */
function changeAdmin(){
  let newUser = prompt("Enter new username:");
  let newPass = prompt("Enter new password:");
  if(newUser && newPass){
    // For demo only; real apps should save securely
    window.adminUser = newUser;
    window.adminPass = newPass;
    alert("Admin login changed! New credentials:\nUser: "+newUser+"\nPass: "+newPass);
  }
}

function checkOrderStatus(){

let mobile=document.getElementById("statusMobile").value;

let result=orders.find(o=>o.mobile===mobile);

if(!result){

document.getElementById("orderResult").innerHTML="No order found";
return;

}

document.getElementById("orderResult").innerHTML=
`Order: ${result.order} <br> Status: ${result.status} <br> Time: ${result.time}`;

document.querySelectorAll(".step").forEach(s=>s.classList.remove("active"));

if(result.status==="Order Placed"){
document.getElementById("step1").classList.add("active");
}

if(result.status==="Preparing"){
document.getElementById("step1").classList.add("active");
document.getElementById("step2").classList.add("active");
}

if(result.status==="Out for Delivery"){
document.getElementById("step1").classList.add("active");
document.getElementById("step2").classList.add("active");
document.getElementById("step3").classList.add("active");
}

if(result.status==="Delivered"){
document.querySelectorAll(".step").forEach(s=>s.classList.add("active"));
}

}

function showOrderNotification(){

let note = document.getElementById("orderNotification");

note.style.display = "block";

setTimeout(()=>{
note.style.display = "none";
},3000);

}

function createIceCream(){

let ice = document.createElement("div");

ice.classList.add("icecream");

ice.innerHTML = "🍦";

ice.style.left = Math.random()*100 + "vw";

ice.style.animationDuration = (Math.random()*3+3)+"s";

document.querySelector(".icecream-bg").appendChild(ice);

setTimeout(()=>{
ice.remove();
},6000);

}

setInterval(createIceCream,800);

updateCartCount();
