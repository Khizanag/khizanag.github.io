import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js';
import {
    getAuth,
    onAuthStateChanged,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
    GoogleAuthProvider,
    updateProfile,
} from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    deleteDoc,
    collection,
    getDocs,
    query,
    orderBy,
    limit,
    enableIndexedDbPersistence,
} from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js';

// ---- Firebase Config ----
const firebaseConfig = {
    apiKey: 'AIzaSyCcIAtNyuWdZJzxFC3VgTOCyWYlQ5U6hLo',
    authDomain: 'ainterviewer-3fc32.firebaseapp.com',
    projectId: 'ainterviewer-3fc32',
    storageBucket: 'ainterviewer-3fc32.firebasestorage.app',
    messagingSenderId: '677661573704',
    appId: '1:677661573704:web:56aa9c1e2e65481c7d8e7d',
    measurementId: 'G-QBWFSPMWLZ',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Enable offline persistence (best-effort)
try {
    enableIndexedDbPersistence(db).catch(function () { /* multi-tab or unsupported */ });
} catch (e) { /* */ }

const googleProvider = new GoogleAuthProvider();

// ---- Internal state ----
let _currentUser = null;
let _isGuest = false;

// ---- Auth methods ----

async function signInWithGoogle() {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
}

async function signInWithEmail(email, password) {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
}

async function signUpWithEmail(email, password, displayName) {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
        await updateProfile(result.user, { displayName: displayName });
    }
    // Create user profile document
    await setDoc(doc(db, 'users', result.user.uid), {
        email: email,
        displayName: displayName || '',
        photoURL: '',
        createdAt: new Date().toISOString(),
    });
    return result.user;
}

async function signOutUser() {
    _isGuest = false;
    await firebaseSignOut(auth);
}

function continueAsGuest() {
    _isGuest = true;
    _currentUser = null;
    document.dispatchEvent(new CustomEvent('firebase:authchange', {
        detail: { user: null, isGuest: true },
    }));
}

// ---- Auth state listener ----
onAuthStateChanged(auth, function (user) {
    _currentUser = user;
    if (user) {
        _isGuest = false;
        // Ensure profile doc exists
        setDoc(doc(db, 'users', user.uid), {
            email: user.email || '',
            displayName: user.displayName || '',
            photoURL: user.photoURL || '',
            createdAt: new Date().toISOString(),
        }, { merge: true }).catch(function () { /* */ });
    }
    document.dispatchEvent(new CustomEvent('firebase:authchange', {
        detail: { user: user, isGuest: _isGuest },
    }));
});

// ---- Firestore helpers ----

function userDoc(path) {
    if (!_currentUser) return null;
    return doc(db, 'users', _currentUser.uid, ...path.split('/'));
}

function userCollection(path) {
    if (!_currentUser) return null;
    return collection(db, 'users', _currentUser.uid, ...path.split('/'));
}

function isCloudAvailable() {
    return _currentUser && !_isGuest;
}

// ---- History CRUD ----

async function loadHistory() {
    if (!isCloudAvailable()) return [];
    try {
        const q = query(
            userCollection('history'),
            orderBy('date', 'desc'),
            limit(50),
        );
        const snap = await getDocs(q);
        return snap.docs.map(function (d) {
            var data = d.data();
            data._docId = d.id;
            return data;
        });
    } catch (e) { return []; }
}

async function saveHistoryEntry(entry) {
    if (!isCloudAvailable()) return;
    try {
        var docId = entry.id || entry._docId || (Date.now() + '-' + Math.random().toString(36).substr(2, 6));
        var data = Object.assign({}, entry);
        delete data._docId;
        await setDoc(doc(db, 'users', _currentUser.uid, 'history', docId), data);
    } catch (e) { /* fire-and-forget */ }
}

async function deleteHistoryEntry(entryId) {
    if (!isCloudAvailable()) return;
    try {
        await deleteDoc(doc(db, 'users', _currentUser.uid, 'history', entryId));
    } catch (e) { /* */ }
}

// ---- Gamification CRUD ----

async function loadGamification() {
    if (!isCloudAvailable()) return null;
    try {
        const snap = await getDoc(doc(db, 'users', _currentUser.uid, 'gamification', 'data'));
        return snap.exists() ? snap.data() : null;
    } catch (e) { return null; }
}

async function saveGamification(data) {
    if (!isCloudAvailable()) return;
    try {
        await setDoc(doc(db, 'users', _currentUser.uid, 'gamification', 'data'), data);
    } catch (e) { /* */ }
}

// ---- Spaced Repetition CRUD ----

async function loadSR() {
    if (!isCloudAvailable()) return {};
    try {
        const snap = await getDocs(userCollection('sr'));
        var result = {};
        snap.forEach(function (d) {
            result[d.id] = d.data();
        });
        return result;
    } catch (e) { return {}; }
}

async function saveSREntry(hashedId, data) {
    if (!isCloudAvailable()) return;
    try {
        await setDoc(doc(db, 'users', _currentUser.uid, 'sr', hashedId), data);
    } catch (e) { /* */ }
}

// ---- Custom Questions CRUD ----

async function loadCustomQuestions() {
    if (!isCloudAvailable()) return [];
    try {
        const snap = await getDocs(userCollection('customQuestions'));
        return snap.docs.map(function (d) {
            var data = d.data();
            data._docId = d.id;
            return data;
        });
    } catch (e) { return []; }
}

async function saveCustomQuestion(question) {
    if (!isCloudAvailable()) return;
    try {
        var docId = question.id || question._docId || (Date.now() + '-' + Math.random().toString(36).substr(2, 6));
        var data = Object.assign({}, question);
        delete data._docId;
        await setDoc(doc(db, 'users', _currentUser.uid, 'customQuestions', docId), data);
    } catch (e) { /* */ }
}

async function deleteCustomQuestion(questionId) {
    if (!isCloudAvailable()) return;
    try {
        await deleteDoc(doc(db, 'users', _currentUser.uid, 'customQuestions', questionId));
    } catch (e) { /* */ }
}

// ---- Flashcard Streak CRUD ----

async function loadStreak() {
    if (!isCloudAvailable()) return null;
    try {
        const snap = await getDoc(doc(db, 'users', _currentUser.uid, 'streak', 'flashcard'));
        return snap.exists() ? snap.data() : null;
    } catch (e) { return null; }
}

async function saveStreak(data) {
    if (!isCloudAvailable()) return;
    try {
        await setDoc(doc(db, 'users', _currentUser.uid, 'streak', 'flashcard'), data);
    } catch (e) { /* */ }
}

// ---- Load all user data in parallel ----

async function loadAllUserData() {
    if (!isCloudAvailable()) return null;
    try {
        const [history, gamification, sr, customQuestions, streak] = await Promise.all([
            loadHistory(),
            loadGamification(),
            loadSR(),
            loadCustomQuestions(),
            loadStreak(),
        ]);
        return { history, gamification, sr, customQuestions, streak };
    } catch (e) { return null; }
}

// ---- Public API ----

window.FirebaseService = {
    get currentUser() { return _currentUser; },
    get isGuest() { return _isGuest; },

    // Auth
    signInWithGoogle: signInWithGoogle,
    signInWithEmail: signInWithEmail,
    signUpWithEmail: signUpWithEmail,
    signOut: signOutUser,
    continueAsGuest: continueAsGuest,

    // Data
    loadAllUserData: loadAllUserData,
    loadHistory: loadHistory,
    saveHistoryEntry: saveHistoryEntry,
    deleteHistoryEntry: deleteHistoryEntry,
    loadGamification: loadGamification,
    saveGamification: saveGamification,
    loadSR: loadSR,
    saveSREntry: saveSREntry,
    loadCustomQuestions: loadCustomQuestions,
    saveCustomQuestion: saveCustomQuestion,
    deleteCustomQuestion: deleteCustomQuestion,
    loadStreak: loadStreak,
    saveStreak: saveStreak,

    // Helpers
    isCloudAvailable: isCloudAvailable,
};
