// Form Js started
const slidePage = document.querySelector(".slide-page");
const nextBtnFirst = document.querySelector(".firstNext");
const prevBtnSec = document.querySelector(".prev-1");
const nextBtnSec = document.querySelector(".next-1");
const prevBtnThird = document.querySelector(".prev-2");
const nextBtnThird = document.querySelector(".next-2");
const prevBtnFourth = document.querySelector(".prev-3");
const submitBtn = document.querySelector(".submit");
const progressText = document.querySelectorAll(".step p");
const progressCheck = document.querySelectorAll(".step .check");
const bullet = document.querySelectorAll(".step .bullet");
let current = 1;

nextBtnFirst.addEventListener("click", function(event){
  event.preventDefault();
  slidePage.style.marginLeft = "-25%";
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
});
nextBtnSec.addEventListener("click", function(event){
  event.preventDefault();
  slidePage.style.marginLeft = "-50%";
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
});
nextBtnThird.addEventListener("click", function(event){
  event.preventDefault();
  slidePage.style.marginLeft = "-75%";
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
});
submitBtn.addEventListener("click", function(){
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
//   setTimeout(function(){
//     alert("Your Form Successfully Signed up");
//     location.reload();
//   },800);
});

prevBtnSec.addEventListener("click", function(event){
  event.preventDefault();
  slidePage.style.marginLeft = "0%";
  bullet[current - 2].classList.remove("active");
  progressCheck[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
  current -= 1;
});
prevBtnThird.addEventListener("click", function(event){
  event.preventDefault();
  slidePage.style.marginLeft = "-25%";
  bullet[current - 2].classList.remove("active");
  progressCheck[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
  current -= 1;
});
prevBtnFourth.addEventListener("click", function(event){
  event.preventDefault();
  slidePage.style.marginLeft = "-50%";
  bullet[current - 2].classList.remove("active");
  progressCheck[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
  current -= 1;
});

// form js  ended

let loginContainer = document.getElementById('container');
let signUpContainer = document.querySelector('.container');
let SignupNow = document.getElementById('SignupNow');
let loginAcc = document.getElementById('loginAcc');

// Show login form and hide signup form
loginAcc.addEventListener('click', () => {
    loginContainer.style.display = 'block';
    signUpContainer.style.display = 'none';
});

// Show signup form and hide login form
SignupNow.addEventListener('click', () => {
    loginContainer.style.display = 'none';
    signUpContainer.style.display = 'block';
});




// Main Logic Started
import { app } from "../Firebase App/firebase.mjs";
import { auth } from "../Firebase App/firebase.mjs";
import { db } from "../Firebase App/firebase.mjs";
import { getAuth ,createUserWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore ,collection,addDoc,getDocs} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";








 let firstName = document.getElementById('firstName')
 let lastName = document.getElementById('lastName')
 let emailAddress = document.getElementById('emailAddress')
 let phoneNumber = document.getElementById('phoneNumber')
 let dateOfBirth = document.getElementById('dateOfBirth')
 let genderSelect = document.getElementById('genderSelect')
 let userName = document.getElementById('userName')
 let password = document.getElementById('password')
let submit = document.getElementById('submitBtn')

submit.addEventListener('click', async () => {
    createUserWithEmailAndPassword(auth, emailAddress.value, password.value)
        .then(async (userCredential) => {
            const user = userCredential.user;
            const uid = user.uid;
            console.log('uid', uid); // This should now log correctly

            try {
                // Store user data in Firestore along with UID
                await addDoc(collection(db, "usersData"), {
                    uid: uid, // Storing UID in Firestore
                    fName: firstName.value,
                    lName: lastName.value,
                    userEmail: emailAddress.value,
                    phoneNumber: phoneNumber.value,
                    born: dateOfBirth.value,
                    genderSelect: genderSelect.value,
                    userName: userName.value,
                    password: password.value
                });

                // Navigate to the dashboard page
                Swal.fire({
                    title: "Good job!",
                    text: "You Signed up Our Page",
                    icon: "success",
                    footer: `<p>Your Information Has Saved</p>`
                }).then(() => {
                    window.location.href = '../Dashboard/dashboard.html';
                });

            } catch (e) {
                console.error("Error adding document: ", e);
            }

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (error.code === 'auth/email-already-in-use') {
                Swal.fire({
                    title: "Error!",
                    text: "This email is already in use. Please use a different email.",
                    icon: "error",
                }).then(() => {
                    location.reload()
                });
            } else if (error.code === 'auth/invalid-email') {
                Swal.fire({
                    title: "Error!",
                    text: "Invalid email format. Please enter a valid email address.",
                    icon: "error",
                }).then(() => {
                    location.reload()
                });
            } else if (error.code === 'auth/weak-password') {
                Swal.fire({
                    title: "Error!",
                    text: "Weak password. Please enter a stronger password.",
                    icon: "error",
                }).then(() => {
                    location.reload()
                });
            }
        });
});

const querySnapshot = await getDocs(collection(db, "usersData"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
});

