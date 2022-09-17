import { QuestionRecords } from '../models/Question'
import { UserRecords } from '../models/User'

export const INITIAL_USERS = {
    sarahedo: {
        id: 'sarahedo',
        name: 'Sarah Edo',
        password: '$2a$11$.QdXI1uyPpkFz9xrI3MpC.wGVJZ8bs3vTSbQvY00KadTudMZbWBWC',
        avatarURL: 'cat.png',
        answers: {
            '8xf0y6ziyjabvozdd253nd': 'optionOne',
            '6ni6ok3ym7mf1p33lnez': 'optionTwo',
            am8ehyc8byjqgar0jgpub9: 'optionTwo',
            loxhs1bqm25b708cmbf3g: 'optionTwo',
        },
        questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9'],
    },
    tylermcginnis: {
        id: 'tylermcginnis',
        name: 'Tyler McGinnis',
        password: '$2a$11$.QdXI1uyPpkFz9xrI3MpC.wGVJZ8bs3vTSbQvY00KadTudMZbWBWC',
        avatarURL: 'dog.png',
        answers: { vthrdm985a262al8qx3do: 'optionOne', xj352vofupe1dqz9emx13r: 'optionTwo' },
        questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
    },
    johndoe: {
        id: 'johndoe',
        name: 'John Doe',
        password: '$2a$11$.QdXI1uyPpkFz9xrI3MpC.wGVJZ8bs3vTSbQvY00KadTudMZbWBWC',
        avatarURL: 'hippopotamus.png',
        answers: {
            xj352vofupe1dqz9emx13r: 'optionOne',
            vthrdm985a262al8qx3do: 'optionTwo',
            '6ni6ok3ym7mf1p33lnez': 'optionTwo',
        },
        questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
    },
}

export const INITIAL_QUESTIONS = {
    '8xf0y6ziyjabvozdd253nd': {
        id: '8xf0y6ziyjabvozdd253nd',
        author: 'sarahedo',
        timestamp: 1467166872634,
        optionOne: {
            votes: ['sarahedo'],
            text: 'have horrible short term memory',
        },
        optionTwo: {
            votes: [],
            text: 'have horrible long term memory',
        },
    },
    '6ni6ok3ym7mf1p33lnez': {
        id: '6ni6ok3ym7mf1p33lnez',
        author: 'johndoe',
        timestamp: 1468479767190,
        optionOne: {
            votes: [],
            text: 'become a superhero',
        },
        optionTwo: {
            votes: ['johndoe', 'sarahedo'],
            text: 'become a supervillain',
        },
    },
    am8ehyc8byjqgar0jgpub9: {
        id: 'am8ehyc8byjqgar0jgpub9',
        author: 'sarahedo',
        timestamp: 1488579767190,
        optionOne: {
            votes: [],
            text: 'be telekinetic',
        },
        optionTwo: {
            votes: ['sarahedo'],
            text: 'be telepathic',
        },
    },
    loxhs1bqm25b708cmbf3g: {
        id: 'loxhs1bqm25b708cmbf3g',
        author: 'tylermcginnis',
        timestamp: 1482579767190,
        optionOne: {
            votes: [],
            text: 'be a front-end developer',
        },
        optionTwo: {
            votes: ['sarahedo'],
            text: 'be a back-end developer',
        },
    },
    vthrdm985a262al8qx3do: {
        id: 'vthrdm985a262al8qx3do',
        author: 'tylermcginnis',
        timestamp: 1489579767190,
        optionOne: {
            votes: ['tylermcginnis'],
            text: 'find $50 yourself',
        },
        optionTwo: {
            votes: ['johndoe'],
            text: 'have your best friend find $500',
        },
    },
    xj352vofupe1dqz9emx13r: {
        id: 'xj352vofupe1dqz9emx13r',
        author: 'johndoe',
        timestamp: 1493579767190,
        optionOne: {
            votes: ['johndoe'],
            text: 'write JavaScript',
        },
        optionTwo: {
            votes: ['tylermcginnis'],
            text: 'write Swift',
        },
    },
}

const LOCAL_STORAGE_KEY_USERS = 'users'
const LOCAL_STORAGE_KEY_QUESTIONS = 'questions'

/**
 * Saving initial data in this file to the local storage.
 * These data Acts as a Backend Database when the React app is being initialized first time.
 */
export function initializeDatabase() {
    const usersLength = Object.keys(getUsersFromLocalStorage()).length
    const questionsLength = Object.keys(getQuestionsFromLocalStorage()).length

    if (!usersLength || !questionsLength) {
        saveUsersToLocalStorage(INITIAL_USERS as UserRecords)
        saveQuestionsToLocalStorage(INITIAL_QUESTIONS as QuestionRecords)
    }
}

export function saveUsersToLocalStorage(users: UserRecords) {
    localStorage.setItem(LOCAL_STORAGE_KEY_USERS, JSON.stringify(users))
}

export function saveQuestionsToLocalStorage(questions: QuestionRecords) {
    localStorage.setItem(LOCAL_STORAGE_KEY_QUESTIONS, JSON.stringify(questions))
}

export function getUsersFromLocalStorage(): UserRecords {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_USERS) || '{}')
}

export function getQuestionsFromLocalStorage(): QuestionRecords {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_QUESTIONS) || '{}')
}
