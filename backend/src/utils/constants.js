
const userRolesEnum = {
    USER: "user",
    ADMIN: "admin",
}

const userRoles = Object.values(userRolesEnum);

const difficultyLevelsEnum = {
    EASY: "easy",
    MEDIUM: "medium",
    HARD: "hard",
}

const difficultyLevels = Object.values(difficultyLevelsEnum);

const verdictEnum = {
    PASS : "pass",
    FAIL : "fail",
}

const verdict = Object.values(verdictEnum);

const statusEnum = {
    ACCEPTED : "AC",
    WRONG_ANSWER : "WA",
    COMPILATION_ERROR : "CE",
    RUNTIME_ERROR : "RE",
    TIME_LIMIT_EXCEEDED : "TLE",
    MEMORY_LIMIT_EXCEEDED : "MLE",
}

export { userRolesEnum, userRoles, difficultyLevelsEnum, difficultyLevels, verdictEnum, verdict, statusEnum };