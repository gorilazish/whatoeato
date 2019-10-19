import * as functions from 'firebase-functions'
const fetch = require('node-fetch')

const apiKey = 'AIzaSyBvQK3hCYE6cNRm1bqkWCPrxzjrmWIB77k'

exports.recipeCreated = functions.firestore
  .document('recipes/{recipeId}')
  .onCreate(async (snap, context) => {
    const newRecipe = snap.data()
    console.log('NEW RECIPE - ', newRecipe)

    if (newRecipe) {
      let thumbnail = newRecipe.image

      const relatedGoogleRecipes = await searchGoogleRecipes(newRecipe.title)
      let relatedLinks = []
      if (relatedGoogleRecipes.items && relatedGoogleRecipes.items.length > 0) {
        relatedLinks = relatedGoogleRecipes.items
        console.log('SEARCH RESULTS - ', relatedGoogleRecipes.items)

        if (!thumbnail) {
          // @ts-ignore
          relatedLinks.forEach(item => {
            if (item.pagemap && !thumbnail) {
              thumbnail =
                item.pagemap.cse_thumbnail[0].src ||
                item.pagemap.cse_image[0].src
            }
          })
        }
      }

      return snap.ref.set(
        {
          image: thumbnail,
          relatedLinks,
        },
        { merge: true }
      )
    } else {
      console.log('No data found in new entry')
      return
    }
  })

const searchGoogleRecipes = async (title: string) => {
  try {
    const searchStringPostfix = 'recipe'
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=007051031288274791484:letviqy3cr1&q=${title}%20${searchStringPostfix}`
    const json = await (await fetch(url)).json()
    console.log(json)
    return json
  } catch (error) {
    console.log(error)
  }
}
