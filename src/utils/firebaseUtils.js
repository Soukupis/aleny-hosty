import db from "../firebase";

export async function getFirestoreCollectionData(collection) {
  let fetchError = false;
  let hosty = [];
  await db
    .firestore()
    .collection(collection)
    .get()
    .then((response) => {
      response.forEach((item) => {
        hosty.push(item.data());
      });
    })
    .catch((error) => {
      fetchError = true;
    });
  return fetchError ? false : hosty;
}

export function getDropdownItemArray(propName, collection) {
  let array = [];
  collection.forEach((item) => {
    array.push({ value: item[propName], text: item[propName] });
  });
  return array;
}
