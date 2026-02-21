import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js';
import {
    getAuth,
    onAuthStateChanged,
    signInAnonymously,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    linkWithPopup,
    linkWithCredential,
    EmailAuthProvider,
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

try {
    enableIndexedDbPersistence(db).catch(function () { /* multi-tab or unsupported */ });
} catch (e) { /* */ }

const googleProvider = new GoogleAuthProvider();

// ---- Internal state ----

let _currentUser = null;

// ---- Notification helpers ----

function notifyWriteError(context) {
    document.dispatchEvent(new CustomEvent('firebase:writeerror', {
        detail: { context: context },
    }));
}

function dispatchAuthChange(user) {
    document.dispatchEvent(new CustomEvent('firebase:authchange', {
        detail: { user: user },
    }));
}

// ---- Auth methods ----

async function signInWithGoogle() {
    return (await signInWithPopup(auth, googleProvider)).user;
}

async function signInWithEmail(email, password) {
    return (await signInWithEmailAndPassword(auth, email, password)).user;
}

async function signUpWithEmail(email, password, displayName) {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
        await updateProfile(result.user, { displayName: displayName });
    }
    await setDoc(doc(db, 'users', result.user.uid), {
        email: email,
        displayName: displayName || '',
        photoURL: '',
        createdAt: new Date().toISOString(),
    });
    return result.user;
}

async function continueAsGuest() {
    return (await signInAnonymously(auth)).user;
}

async function signOutUser() {
    await firebaseSignOut(auth);
}

// ---- Account linking (anonymous → real account) ----

async function linkGoogle() {
    if (!_currentUser || !_currentUser.isAnonymous) return null;
    const result = await linkWithPopup(_currentUser, googleProvider);
    await setDoc(doc(db, 'users', result.user.uid), {
        email: result.user.email || '',
        displayName: result.user.displayName || '',
        photoURL: result.user.photoURL || '',
        createdAt: new Date().toISOString(),
    }, { merge: true });
    return result.user;
}

async function linkEmail(email, password, displayName) {
    if (!_currentUser || !_currentUser.isAnonymous) return null;
    const credential = EmailAuthProvider.credential(email, password);
    const result = await linkWithCredential(_currentUser, credential);
    if (displayName) {
        await updateProfile(result.user, { displayName: displayName });
    }
    await setDoc(doc(db, 'users', result.user.uid), {
        email: email,
        displayName: displayName || '',
        photoURL: '',
        createdAt: new Date().toISOString(),
    }, { merge: true });
    return result.user;
}

// ---- Auth state listener ----

onAuthStateChanged(auth, function (user) {
    _currentUser = user;
    if (user && !user.isAnonymous) {
        setDoc(doc(db, 'users', user.uid), {
            email: user.email || '',
            displayName: user.displayName || '',
            photoURL: user.photoURL || '',
            lastSignIn: new Date().toISOString(),
        }, { merge: true }).catch(function () {
            notifyWriteError('user-profile');
        });
    }
    dispatchAuthChange(user);
});

// ---- Firestore helpers ----

function isCloudAvailable() {
    return !!_currentUser;
}

function userCollection(path) {
    if (!_currentUser) return null;
    return collection(db, 'users', _currentUser.uid, ...path.split('/'));
}

function userDocRef(subpath) {
    return doc(db, 'users', _currentUser.uid, ...subpath.split('/'));
}

function generateDocId(entry) {
    return entry.id || entry._docId || (Date.now() + '-' + Math.random().toString(36).substr(2, 6));
}

function cleanEntry(entry) {
    var data = Object.assign({}, entry);
    delete data._docId;
    return data;
}

async function readDoc(subpath, fallback) {
    if (!isCloudAvailable()) return fallback;
    try {
        const snap = await getDoc(userDocRef(subpath));
        return snap.exists() ? snap.data() : fallback;
    } catch (e) { return fallback; }
}

async function writeDoc(subpath, data, errorContext) {
    if (!isCloudAvailable()) return;
    try {
        await setDoc(userDocRef(subpath), data);
    } catch (e) { notifyWriteError(errorContext); }
}

async function removeDoc(subpath, errorContext) {
    if (!isCloudAvailable()) return;
    try {
        await deleteDoc(userDocRef(subpath));
    } catch (e) { notifyWriteError(errorContext); }
}

async function readCollection(path, fallback, opts) {
    if (!isCloudAvailable()) return fallback;
    try {
        var ref = userCollection(path);
        var q = opts ? query(ref, ...opts) : ref;
        const snap = await getDocs(q);
        return snap.docs.map(function (d) {
            var data = d.data();
            data._docId = d.id;
            return data;
        });
    } catch (e) { return fallback; }
}

// ---- User Profile ----

async function loadUserProfile() {
    if (!isCloudAvailable()) return null;
    try {
        const snap = await getDoc(doc(db, 'users', _currentUser.uid));
        return snap.exists() ? snap.data() : null;
    } catch (e) { return null; }
}

// ---- History CRUD ----

function loadHistory() {
    return readCollection('history', [], [orderBy('date', 'desc'), limit(50)]);
}

function saveHistoryEntry(entry) {
    return writeDoc('history/' + generateDocId(entry), cleanEntry(entry), 'history');
}

function deleteHistoryEntry(entryId) {
    return removeDoc('history/' + entryId, 'history-delete');
}

// ---- Gamification CRUD ----

function loadGamification() {
    return readDoc('gamification/data', null);
}

function saveGamification(data) {
    return writeDoc('gamification/data', data, 'gamification');
}

// ---- Spaced Repetition CRUD ----

async function loadSR() {
    if (!isCloudAvailable()) return {};
    try {
        const snap = await getDocs(userCollection('sr'));
        var result = {};
        snap.forEach(function (d) { result[d.id] = d.data(); });
        return result;
    } catch (e) { return {}; }
}

function saveSREntry(hashedId, data) {
    return writeDoc('sr/' + hashedId, data, 'sr');
}

// ---- Custom Questions CRUD ----

function loadCustomQuestions() {
    return readCollection('customQuestions', []);
}

function saveCustomQuestion(question) {
    return writeDoc('customQuestions/' + generateDocId(question), cleanEntry(question), 'custom-questions');
}

function deleteCustomQuestion(questionId) {
    return removeDoc('customQuestions/' + questionId, 'custom-questions-delete');
}

// ---- Flashcard Streak CRUD ----

function loadStreak() {
    return readDoc('streak/flashcard', null);
}

function saveStreak(data) {
    return writeDoc('streak/flashcard', data, 'streak');
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
    get isAnonymous() { return _currentUser ? _currentUser.isAnonymous : false; },

    // Auth
    signInWithGoogle: signInWithGoogle,
    signInWithEmail: signInWithEmail,
    signUpWithEmail: signUpWithEmail,
    signOut: signOutUser,
    continueAsGuest: continueAsGuest,
    linkGoogle: linkGoogle,
    linkEmail: linkEmail,

    // Data
    loadUserProfile: loadUserProfile,
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
