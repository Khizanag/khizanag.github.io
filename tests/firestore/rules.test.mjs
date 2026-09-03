import { readFileSync } from 'node:fs';
import { after, before, beforeEach, describe, test } from 'node:test';

import { assertFails, assertSucceeds, initializeTestEnvironment } from '@firebase/rules-unit-testing';
import { collection, deleteDoc, deleteField, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';

const PROJECT_ID = 'demo-rules';
const RULES = readFileSync(new URL('../../firestore.rules', import.meta.url), 'utf8');

const HOST_UID = 'host-uid';
const GUEST_UID = 'guest-uid';
const OTHER_UID = 'other-uid';
const CODE = 'AB3D9K';

let testEnv;

before(async function () {
    testEnv = await initializeTestEnvironment({
        projectId: PROJECT_ID,
        firestore: { rules: RULES },
    });
});

after(async function () {
    await testEnv.cleanup();
});

beforeEach(async function () {
    await testEnv.clearFirestore();
});

function participant(name, role) {
    return {
        name: name,
        role: role,
        joinedAt: '2026-01-01T10:00:00.000Z',
        photoURL: '',
    };
}

function newSession(hostUid, participants) {
    return {
        hostUid: hostUid,
        status: 'lobby',
        createdAt: '2026-01-01T10:00:00.000Z',
        config: { platform: 'ios', timeLimitMin: 60 },
        participants: participants,
        live: {},
        results: null,
    };
}

function sessionRef(db) {
    return doc(db, 'liveSessions', CODE);
}

async function seed(write) {
    await testEnv.withSecurityRulesDisabled(function (context) {
        return write(context.firestore());
    });
}

async function seedSession() {
    await seed(function (db) {
        const participants = {};
        participants[HOST_UID] = participant('Host', 'host');
        return setDoc(sessionRef(db), newSession(HOST_UID, participants));
    });
}

describe('User documents', function () {
    test('the owner reads and writes their own profile document', async function () {
        const db = testEnv.authenticatedContext(HOST_UID).firestore();
        await assertSucceeds(setDoc(doc(db, 'users', HOST_UID), { email: 'owner@example.com' }));
        await assertSucceeds(getDoc(doc(db, 'users', HOST_UID)));
    });

    test('the owner reads and writes a nested subcollection document', async function () {
        const db = testEnv.authenticatedContext(HOST_UID).firestore();
        await assertSucceeds(setDoc(doc(db, 'users', HOST_UID, 'history', 'entry-1'), { score: 70 }));
        await assertSucceeds(getDoc(doc(db, 'users', HOST_UID, 'history', 'entry-1')));
    });

    test('another signed-in user is denied the profile and the subcollection', async function () {
        const db = testEnv.authenticatedContext(OTHER_UID).firestore();
        await assertFails(getDoc(doc(db, 'users', HOST_UID)));
        await assertFails(setDoc(doc(db, 'users', HOST_UID), { email: 'thief@example.com' }));
        await assertFails(getDoc(doc(db, 'users', HOST_UID, 'history', 'entry-1')));
        await assertFails(setDoc(doc(db, 'users', HOST_UID, 'history', 'entry-1'), { score: 0 }));
    });

    test('an unauthenticated client is denied the profile and the subcollection', async function () {
        const db = testEnv.unauthenticatedContext().firestore();
        await assertFails(getDoc(doc(db, 'users', HOST_UID)));
        await assertFails(setDoc(doc(db, 'users', HOST_UID), { email: 'anon@example.com' }));
        await assertFails(getDoc(doc(db, 'users', HOST_UID, 'history', 'entry-1')));
        await assertFails(setDoc(doc(db, 'users', HOST_UID, 'history', 'entry-1'), { score: 0 }));
    });
});

describe('Feature flags', function () {
    // loadFeatureFlags() runs on `firebase:ready`, before sign-in resolves, so the
    // unauthenticated read is the one the app actually depends on.
    test('an unauthenticated client reads /config/features', async function () {
        await seed(function (db) {
            return setDoc(doc(db, 'config', 'features'), { liveSessions: true });
        });
        const db = testEnv.unauthenticatedContext().firestore();
        await assertSucceeds(getDoc(doc(db, 'config', 'features')));
    });

    test('a signed-in user reads /config/features', async function () {
        await seed(function (db) {
            return setDoc(doc(db, 'config', 'features'), { liveSessions: true });
        });
        const db = testEnv.authenticatedContext(GUEST_UID).firestore();
        await assertSucceeds(getDoc(doc(db, 'config', 'features')));
    });

    test('nobody writes /config/features', async function () {
        const signedIn = testEnv.authenticatedContext(HOST_UID).firestore();
        const anonymous = testEnv.unauthenticatedContext().firestore();
        await assertFails(setDoc(doc(signedIn, 'config', 'features'), { liveSessions: false }));
        await assertFails(setDoc(doc(anonymous, 'config', 'features'), { liveSessions: false }));
    });

    test('nobody lists the config collection', async function () {
        await seed(function (db) {
            return setDoc(doc(db, 'config', 'features'), { liveSessions: true });
        });
        await assertFails(getDocs(collection(testEnv.unauthenticatedContext().firestore(), 'config')));
        await assertFails(getDocs(collection(testEnv.authenticatedContext(GUEST_UID).firestore(), 'config')));
    });
});

describe('Live sessions', function () {
    test('the host creates a session with the shape the app writes', async function () {
        const db = testEnv.authenticatedContext(HOST_UID).firestore();
        const participants = {};
        participants[HOST_UID] = participant('Host', 'host');
        await assertSucceeds(setDoc(sessionRef(db), newSession(HOST_UID, participants)));
    });

    test('a user cannot create a session naming someone else as host', async function () {
        const db = testEnv.authenticatedContext(GUEST_UID).firestore();
        const participants = {};
        participants[GUEST_UID] = participant('Guest', 'host');
        await assertFails(setDoc(sessionRef(db), newSession(HOST_UID, participants)));
    });

    test('an unauthenticated client cannot create or read a session', async function () {
        await seedSession();
        const db = testEnv.unauthenticatedContext().firestore();
        const participants = {};
        participants[HOST_UID] = participant('Host', 'host');
        await assertFails(getDoc(sessionRef(db)));
        await assertFails(setDoc(doc(db, 'liveSessions', 'ZZ9Q2M'), newSession(HOST_UID, participants)));
    });

    test('any signed-in user reads a session', async function () {
        await seedSession();
        const db = testEnv.authenticatedContext(GUEST_UID).firestore();
        await assertSucceeds(getDoc(sessionRef(db)));
    });

    test('nobody lists the sessions collection', async function () {
        await seedSession();
        await assertFails(getDocs(collection(testEnv.authenticatedContext(GUEST_UID).firestore(), 'liveSessions')));
        await assertFails(getDocs(collection(testEnv.unauthenticatedContext().firestore(), 'liveSessions')));
    });

    test('a participant adds and removes their own participant entry', async function () {
        await seedSession();
        const db = testEnv.authenticatedContext(GUEST_UID).firestore();
        const join = {};
        join['participants.' + GUEST_UID] = participant('Guest', 'candidate');
        const leave = {};
        leave['participants.' + GUEST_UID] = deleteField();
        await assertSucceeds(updateDoc(sessionRef(db), join));
        await assertSucceeds(updateDoc(sessionRef(db), leave));
    });

    test('a participant cannot touch another participant entry', async function () {
        await seedSession();
        const db = testEnv.authenticatedContext(GUEST_UID).firestore();
        const impersonate = {};
        impersonate['participants.' + OTHER_UID] = participant('Other', 'spectator');
        const evict = {};
        evict['participants.' + HOST_UID] = deleteField();
        await assertFails(updateDoc(sessionRef(db), impersonate));
        await assertFails(updateDoc(sessionRef(db), evict));
    });

    test('a participant cannot change status, live or results', async function () {
        await seedSession();
        const db = testEnv.authenticatedContext(GUEST_UID).firestore();
        await assertFails(updateDoc(sessionRef(db), { status: 'active' }));
        await assertFails(updateDoc(sessionRef(db), { live: { questionIndex: 2 } }));
        await assertFails(updateDoc(sessionRef(db), { results: { score: 80 } }));
    });

    test('the host changes status, live and results', async function () {
        await seedSession();
        const db = testEnv.authenticatedContext(HOST_UID).firestore();
        await assertSucceeds(updateDoc(sessionRef(db), { status: 'active' }));
        await assertSucceeds(updateDoc(sessionRef(db), { live: { questionIndex: 2 } }));
        await assertSucceeds(updateDoc(sessionRef(db), { results: { score: 80 }, status: 'ended' }));
    });

    test('only the host deletes a session', async function () {
        await seedSession();
        await assertFails(deleteDoc(sessionRef(testEnv.unauthenticatedContext().firestore())));
        await assertFails(deleteDoc(sessionRef(testEnv.authenticatedContext(GUEST_UID).firestore())));
        await assertSucceeds(deleteDoc(sessionRef(testEnv.authenticatedContext(HOST_UID).firestore())));
    });
});
