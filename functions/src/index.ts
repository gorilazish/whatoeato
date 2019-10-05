import * as functions from 'firebase-functions'

// Listen for updates to any `user` document.
exports.recipeCreated = functions.firestore
  .document('recipes/{recipeId}')
  .onCreate((snap, context) => {
    // Then return a promise of a set operation to update the count
    return snap.ref.set(
      {
        image: 'https://jloog.com/images/vegetable-clipart-funny-cartoon-7.png',
      },
      { merge: true }
    )
  })
