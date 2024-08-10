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

nextBtnFirst.addEventListener("click", function (event) {
    event.preventDefault();
    slidePage.style.marginLeft = "-25%";
    bullet[current - 1].classList.add("active");
    progressCheck[current - 1].classList.add("active");
    progressText[current - 1].classList.add("active");
    current += 1;
});
nextBtnSec.addEventListener("click", function (event) {
    event.preventDefault();
    slidePage.style.marginLeft = "-50%";
    bullet[current - 1].classList.add("active");
    progressCheck[current - 1].classList.add("active");
    progressText[current - 1].classList.add("active");
    current += 1;
});
nextBtnThird.addEventListener("click", function (event) {
    event.preventDefault();
    slidePage.style.marginLeft = "-75%";
    bullet[current - 1].classList.add("active");
    progressCheck[current - 1].classList.add("active");
    progressText[current - 1].classList.add("active");
    current += 1;
});
submitBtn.addEventListener("click", function () {
    bullet[current - 1].classList.add("active");
    progressCheck[current - 1].classList.add("active");
    progressText[current - 1].classList.add("active");
    current += 1;
    //   setTimeout(function(){
    //     alert("Your Form Successfully Signed up");
    //     location.reload();
    //   },800);
});

prevBtnSec.addEventListener("click", function (event) {
    event.preventDefault();
    slidePage.style.marginLeft = "0%";
    bullet[current - 2].classList.remove("active");
    progressCheck[current - 2].classList.remove("active");
    progressText[current - 2].classList.remove("active");
    current -= 1;
});
prevBtnThird.addEventListener("click", function (event) {
    event.preventDefault();
    slidePage.style.marginLeft = "-25%";
    bullet[current - 2].classList.remove("active");
    progressCheck[current - 2].classList.remove("active");
    progressText[current - 2].classList.remove("active");
    current -= 1;
});
prevBtnFourth.addEventListener("click", function (event) {
    event.preventDefault();
    slidePage.style.marginLeft = "-50%";
    bullet[current - 2].classList.remove("active");
    progressCheck[current - 2].classList.remove("active");
    progressText[current - 2].classList.remove("active");
    current -= 1;
});

// form js  ended

let studentPortal = document.querySelector('.student-portal');
let container = document.querySelector('.container');
let loginContainer = document.querySelector('.wrapper');
let loginSignup = document.querySelector('#loginSignup');

studentPortal.addEventListener('click', () => {
    container.style.display = 'none';
    loginContainer.style.display = 'block';
});

loginSignup.addEventListener('click', () => {
    container.style.display = 'block';
    loginContainer.style.display = 'none';
});




// Main Logic Started
import { app } from "../Firebase App/firebase.mjs";
import { auth } from "../Firebase App/firebase.mjs";
import { db } from "../Firebase App/firebase.mjs";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs , query, where} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

let firstName = document.getElementById('firstName')
let lastName = document.getElementById('lastName')
let emailAddress = document.getElementById('emailAddress')
let phoneNumber = document.getElementById('phoneNumber')
let dateOfBirth = document.getElementById('dateOfBirth')
let genderSelect = document.getElementById('genderSelect')
let userName = document.getElementById('userName')
let password = document.getElementById('password')
let loginEmail = document.getElementById('loginEmail')
let loginPassword = document.getElementById('loginPassword')
let loginBtn = document.getElementById('loginBtn')
let submit = document.getElementById('submitBtn')

submit.addEventListener('click', async (e) => {
    e.preventDefault()
    createUserWithEmailAndPassword(auth, emailAddress.value.trim(), password.value)
        .then(async (userCredential) => {
            const user = userCredential.user;
            const uid = user.uid;
            console.log('uid', uid); 

            try {
                await addDoc(collection(db, "usersData"), {
                    uid: uid, 
                    fName: firstName.value,
                    lName: lastName.value,
                    userEmail: emailAddress.value,
                    phoneNumber: phoneNumber.value,
                    born: dateOfBirth.value,
                    genderSelect: genderSelect.value,
                    Course: userName.value,
                    password: password.value
                });
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
async function displayUserData(uid) {
    try {
        const q = query(collection(db, "usersData"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.error('No matching documents.');
            return;
        }

        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            console.log('User Data:', userData);  

            document.getElementById('spanOfFirstName').innerText = userData.fName || 'N/A';
            document.getElementById('spanOfLastName').innerText = userData.lName || 'N/A';
            document.getElementById('spanOfEmail').innerText = userData.userEmail || 'N/A';
            document.getElementById('spanOfPhoneNumber').innerText = userData.phoneNumber || 'N/A';
            document.getElementById('spanOfDob').innerText = userData.born || 'N/A';
            document.getElementById('spanOfGender').innerText = userData.genderSelect || 'N/A';
            document.getElementById('spanOfUserName').innerText = userData.userName || 'N/A';
            document.getElementById('spanOfPassword').innerText = userData.password || 'N/A';
        });
    } catch (error) {
        console.error('Error retrieving user data:', error);
    }
}

loginBtn.addEventListener('click', async (event) => {
    event.preventDefault();

    const email = loginEmail.value.trim();
    const password = loginPassword.value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await displayUserData(user.uid);

        window.location.href = '../Dashboard/dashboard.html';

    } catch (error) {
        console.error('Error logging in:', error);
        Swal.fire({
            title: "Error!",
            text: "Invalid email or password. Please try again.",
            icon: "error",
        });
    }
});
