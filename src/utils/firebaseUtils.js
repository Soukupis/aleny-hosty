import db, { storage } from "../firebase";

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
  collection.forEach((item, index) => {
    array.push({
      value: item[propName],
      text: item[propName],
      key: index,
      id: item[propName],
    });
  });
  return array;
}

async function getImageNames(id) {
  let namesList = [];
  await storage
    .ref(`images/`)
    .child(`${id}/`)
    .listAll()
    .then((res) => {
      namesList = res.items.map((item) => {
        return item.name;
      });
    })
    .catch(() => {
      console.log("error");
    });
  return namesList;
}

export async function getImages(id) {
  let imageNames = await getImageNames(id);
  let imageList = [];
  const requests = imageNames.map(async (image) => {
    await storage
      .ref(`images/${id}/`)
      .child(image)
      .getDownloadURL()
      .then((res) => {
        imageList.push(res);
      });
  });
  return Promise.all(requests).then(() => {
    return imageList;
  });
}
