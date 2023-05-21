// We import the user
import { auth, db } from '../scripts/firebase'
import {useState} from 'react';
import { doc, getDocs } from "firebase/firestore";

const userCurrent = auth.currentUser;
const userEmail = auth.currentUser.email;

// We retrieve the data to form an array with the criteria: age, sexe, smoker

// Retrieve the user document from the database
const userRef = db.collection('users').doc(userCurrent);
const userDoc = await userRef.get();

// Access the age, smoker, and liked fields from the user document
const age = userDoc.data().age;
const isSmoker = userDoc.data().smoker;
const userOrientation = userDoc.data().orientation;
const [userTarget, setUserTarget] = useState([]);

if (userOrientation == 'Men'){
    setUserTarget(['Male'])
}
else if (userOrientation == 'Women'){
    setUserTarget(['Female'])
}
else if (userOrientation == 'Everyone'){
    setUserTarget(['Male', 'Female'])
}

// We import all the other user which respect the criteria in the array
// Retrieve data and filter based on the criteria
const usersRef = db.collection('users');
const query = usersRef
                    .where('age', '>=', userData[0] - 5)
                    .where('age', '<=', userData[0] + 5)
                    .where('smoker', '==', isSmoker)
                    .where('gender', 'in', userTarget);

const snapshot = await getDocs(query);

// Form an array with the filtered user data including their IDs
const usersArray = snapshot.docs.map((doc) => ({
    ...[doc.data().email,
    doc.data().interest]
}));

console.log(usersArray); // Output the array of users who meet the criteria, including their IDs


// From everybody we import all their interest
const interestArray = usersArray.map((user) => user[1]);

const findInterest = () => {
    let foundInterest = null;
  
    usersArray.forEach((row) => {
      const element = row.find((email) => email === userEmail);
      if (element) {
        foundInterest = row[1];
        return;
      }
    });
  
    return foundInterest;
  };

// Get the interest of the current user
const currentUserinterest = findInterest();

// We compare their interest with our current user and order them from the highest similarities to the lowest taking into account the elo
// We display the one on top of that list first

// Store the similarity score for each user
const similarityScores = [];

// Compare interest and calculate similarity score
for (let i = 0; i < interestArray.length; i++) {
    if (usersArray[i][0] !== userEmail) {
        const userinterest = interestArray[i];
        const similarityScore = calculateSimilarityScore(currentUserinterest, userinterest);
        similarityScores.push({ id: usersArray[i].id, score: similarityScore });
    }
}

// Sort users based on similarity score in descending order
similarityScores.sort((a, b) => b.score - a.score);
similarityScores.reverse();

console.log(similarityScores); // Output the users sorted by similarity score

// Function to calculate similarity score between interest

function calculateSimilarityScore(interest1, interest2) {
    const commoninterest = interest1.filter((interest) => interest2.includes(interest));
    const similarityScore = commoninterest.length;
    return similarityScore;
}
    
export {similarityScores};