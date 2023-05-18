
// We import the user
    import { auth } from 'firebase';
    const userCurrent = auth.currentUser;
    const userId = auth.currentUser.uid;

// We retrieve the data to form an array with the criteria: age, sexe, smoker
    import { db } from 'firebase'; // Import the Firebase database module

    // Retrieve the user document from the database
    const userRef = db.collection('users').doc(userCurrent);
    const userDoc = await userRef.get();

    // Access the age, smoker, and liked fields from the user document
    const age = userDoc.data().age;
    const isSmoker = userDoc.data().smoker;
    const likedUsers = userDoc.data().like;

    const userData = { age, isSmoker, likedUsers };
    console.log(userData); // Output the user's age, smoker status, and liked users in an object


// We import all the other user which respect the criteria in the array
    // Retrieve data and filter based on the criteria
    const usersRef = db.collection('users');
    const query = usersRef
    .where('age', '>=', userData[0])
    .where('smoker', '==', userData[1])
    .where('id', 'not-in', userData[2]);

    const snapshot = await query.get();

    // Form an array with the filtered user data including their IDs
    const usersArray = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    }));

    console.log(usersArray); // Output the array of users who meet the criteria, including their IDs


// From everybody we import all their preferences
    const preferencesArray = usersArray.map((user) => user.preferences);

// Get the preferences of the current user
    const currentUserPreferences = preferencesArray.find((preferences, index) => usersArray[index].id === userId);

// We compare their preferences with our current user and order them from the highest similarities to the lowest taking into account the elo
// We display the one on top of that list first

    // Store the similarity score for each user
    const similarityScores = [];

    // Compare preferences and calculate similarity score
    for (let i = 0; i < preferencesArray.length; i++) {
        if (usersArray[i].id !== userId) {
        const userPreferences = preferencesArray[i];
        const similarityScore = calculateSimilarityScore(currentUserPreferences, userPreferences);
        similarityScores.push({ id: usersArray[i].id, score: similarityScore });
        }
    }

    // Sort users based on similarity score in descending order
    similarityScores.sort((a, b) => b.score - a.score);

    console.log(similarityScores); // Output the users sorted by similarity score

    // Function to calculate similarity score between preferences
    // For the moment i don't take into account the elo
    function calculateSimilarityScore(preferences1, preferences2) {
        const commonPreferences = preferences1.filter((preference) => preferences2.includes(preference));
        const similarityScore = commonPreferences.length;
        return similarityScore;
    }
      