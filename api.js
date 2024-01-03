import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDocs, getDoc, query, where } from 'firebase/firestore/lite'

const firebaseConfig = {
  apiKey: "AIzaSyCfy4FY7u_mgWzygzx9MNLf2TBDOiKO9EQ",
  authDomain: "vanlive-a7574.firebaseapp.com",
  projectId: "vanlive-a7574",
  storageBucket: "vanlive-a7574.appspot.com",
  messagingSenderId: "841427246060",
  appId: "1:841427246060:web:50112f8f969f8530a97ec9"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const vansCollectionRef = collection(db, "vans")

export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const snapshot = await getDoc(docRef);
    return {
        ...snapshot.data(),
        id: snapshot.id

    }
}

export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "123"))
    const snapshot = await getDocs(q)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}