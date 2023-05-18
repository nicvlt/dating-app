// The ELO is your grade which will put your profil forward
// if you are handsome/beautiful or funny more people will see your video

import { auth } from 'firebase';
import { db } from 'firebase';
const userCurrent = auth.currentUser;

const userRef = db.collection('users').doc(userCurrent);
const userDoc = await userRef.get();
const Vue = userDoc.data().vue;
const Elo = userDoc.data().elo;
const Like = userDoc.data().likeList;

// When someone see your profil and they like it
// When someone see your profil and they skip it

await userRef.update({
    elo: updatedElo
  });

  const calculateUpdatedElo = () => {
        Elo = Like/Vue;
        return Elo
  }
