import { auth } from "../../Firebase App/firebase.mjs";
import { db } from "../../Firebase App/firebase.mjs";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
let SignOutBtn = document.getElementById('SignOutBtn')
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

            // Display the data on the dashboard
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

// Monitor authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        displayUserData(user.uid);
    } else {
        // User is not signed in
        console.log('No user is signed in.');
    }
});

document.getElementById('SignOutBtn').addEventListener('click', async () => {
    try {
        await auth.signOut();
        window.location.href = '../../index.html'; // Redirect to login page
    } catch (error) {
        console.error('Error signing out:', error);
    }
});