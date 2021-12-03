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
        hosty.push({ ...item.data(), id: item.id });
      });
    })
    .catch((error) => {
      fetchError = true;
    });
  return fetchError ? false : hosty;
}

export async function deleteDocument(collection, id) {
  let deleteError = false;
  await db
    .firestore()
    .collection(collection)
    .doc(id)
    .delete()
    .then((response) => {})
    .catch((error) => {
      deleteError = true;
    });
  return !deleteError;
}

export async function editDocument(collection, id, item) {
  let editError = false;
  await db
    .firestore()
    .collection(collection)
    .doc(id)
    .set(item)
    .then((response) => {})
    .catch((error) => {
      editError = true;
    });
  return !editError;
}

export function getDropdownItemArray(propName, collection) {
  let array = [];
  collection.forEach((item) => {
    array.push({ value: item[propName], text: item[propName] });
  });
  return array;
}
