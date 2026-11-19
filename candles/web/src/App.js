import './App.css';
import { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import TopBar from "./components/Head/TopBar";
import Title from "./components/Head/Title";
import Body from "./components/Body/Body";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { db } from "./config-firebase";
import {
  getDoc,
  getDocs,
  collection,
  addDoc,
  doc,
  updateDoc,
  increment,
  query,
  orderBy,
  limit,
  startAfter,
  arrayUnion
} from "firebase/firestore";

function App() {
  const NUM_DOCS_PER_LOADING = 48;
  const [userId, setUserId] = useState("");
  const [persons, setPersons] = useState([]);
  const [lastDocument, setLastDocument] = useState(null);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [counterLitCandles, setCounterLitCandles] = useState("-");
  const [isComputer, setIsComputer] = useState(false);

  // Firestore collections references
  const personsCollection = collection(db, "persons");
  const counterCollection = collection(db, "counter");

  // Fetch user ID, persons data, and counter data on initial render
  useEffect(() => {
    console.log("refresh");
    getUser();
    getPersons();
    getCounterLitCandles();
  }, []);

  // Update the 'isComputer' state based on the current screen height
  const updateHeight = () => {
    const device = window.innerWidth < 600 ? false : true;
    setIsComputer(device);
  };

  // Set up event listener for screen resize
  useEffect(() => {
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  // Function to get or generate user ID
  const getUser = () => {
    // Check if the user has a userId stored in local storage
    let storageUserId = localStorage.getItem("userId");

    // If the user doesn't have a userId, generate a new one and store it in local storage
    if (!storageUserId) {
      storageUserId = uuidv4();
      localStorage.setItem("userId", storageUserId);
    }
    setUserId(storageUserId);
  };

  // Function to fetch persons data from Firestore
  const getPersons = useCallback(async () => {

    try {
      // Create a query to order documents by the "timestamp" field in descending order
      const q = query(
        personsCollection,
        orderBy("timestamp", "desc"),
        limit(NUM_DOCS_PER_LOADING)
      );
      const data = await getDocs(q);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPersons([...filteredData]);
      if (data.size < NUM_DOCS_PER_LOADING) {
        setReachedEnd(true);
      } else {
        setLastDocument(data.docs[data.docs.length - 1]);
      }
      console.log(filteredData.length);
    } catch (err) {
      console.error(err);
    }
  });

  // Function to fetch next batch of documents
  async function loadMoreDocuments() {
    try {
      let filteredData;
      let newLastDocument = null;
      // If reached the end, return
      if (reachedEnd) {
        return;
      }
      // If lastDocument is null, fetch the first batch of documents
      if (lastDocument === null) {
        const q = query(
          personsCollection,
          orderBy("timestamp", "desc"),
          limit(NUM_DOCS_PER_LOADING)
        );
        const data = await getDocs(q);
        filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setPersons([...filteredData]);
        if (data.size < NUM_DOCS_PER_LOADING) {
          setReachedEnd(true);
        } else {
          newLastDocument = data.docs[data.docs.length - 1];
        }
      } else {
        // Fetch next batch starting after the last document fetched
        const q = query(
          personsCollection,
          orderBy("timestamp", "desc"),
          startAfter(lastDocument),
          limit(NUM_DOCS_PER_LOADING)
        );
        const data = await getDocs(q);
        filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        if (data.size < NUM_DOCS_PER_LOADING) {
          setReachedEnd(true);
        } else {
          newLastDocument = data.docs[data.docs.length - 1];
        }
      }
      // Update state with new persons
      setPersons((prevPersons) => [...prevPersons, ...filteredData]);
      // If there are more documents, update lastDocument
      if (newLastDocument) {
        setLastDocument(newLastDocument);
      }
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  }

  // Function to fetch counter data from Firestore
  const getCounterLitCandles = useCallback(async () => {
    try {
      const counterDocRef = doc(counterCollection, "1");
      const docSnapshot = await getDoc(counterDocRef);
      setCounterLitCandles(docSnapshot.data().numLit);
    } catch (err) {
      console.log(err);
    }
  });

  // Function to add a new person to Firestore
  const addPerson = async (newPerson) => {
    const timestamp = firebase.firestore.Timestamp.fromDate(new Date());
    const fullPerson = { ...newPerson, users: [], timestamp: timestamp };

    // console.log(fullPerson)
    let docRef;

    try {
      docRef = await addDoc(personsCollection, fullPerson);
    } catch (err) {
      console.error(err);
    }

    // When i ran locally (developing)
    // docRef = { id: "123" };

    setPersons((persons) => [{ ...fullPerson, id: docRef.id }, ...persons]);
  };

  // Function to handle click event on Candle
  const clickCandle = async (event) => {
    const personId = event.target.id;

    // update locally
    setPersons((arrPersons) =>
      arrPersons.map((person) =>
        person.id === personId
          ? { ...person, users: [...person.users, userId] }
          : person
      )
    );
    setCounterLitCandles((prev) => prev + 1);

    // update in the database
    const currentPerson = doc(db, "persons", personId);

    // update users list in personId
    try {
      // const docSnapshot = await getDoc(currentPerson);
      // const currentUsers = docSnapshot.data().users || [];
      // const updatedUsers = [...currentUsers, userId];
      // // console.log("updatedUsers", updatedUsers)
      // await updateDoc(currentPerson, { users: updatedUsers });
      await updateDoc(currentPerson, {
        users: arrayUnion(userId),
      });
      
    } catch (err) {
      console.error(err);
    }

    // increment NumLit
    try {
      const counterDocRef = doc(counterCollection, "1");
      await updateDoc(counterDocRef, {
        numLit: increment(1),
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ fontFamily: "discovery" }}>
      <TopBar />
      <Title counter={counterLitCandles} isComputer={isComputer} />
      <Body
        userId={userId}
        isComputer={isComputer}
        personList={persons}
        clickCandle={clickCandle}
        addPersonToData={addPerson}
        loadMoreDocuments={loadMoreDocuments}
        reachedEnd={reachedEnd}
      />
    </div>
  );
}

export default App;
