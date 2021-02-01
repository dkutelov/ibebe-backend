# api-ibebeq

## End points

### Questions

-   **GET '/questions'** - gets all questions

    -   TODO

-   **GET '/questions/:id'** - gets one question by id

    -   populates category, tags, gets numeric reactions, gets user reactions

-   **POST '/questions'** - create question
    -   provide fields: { "text": "question text", "category": "category id", "tags": ["tag id"]}, sets author to user id, creates empty reactions obj and attaches to the question

### Reactions

-   reaction types: loves, claps, likes, thankfull, unsatisfied

-   **GET 'questions/:id/reactions'** - toggles (creates or removes) reaction by type

    -   toggles a type, removes from other types, author of question can't make a reactions
    -   returns: {"loves": 1, "claps": 0, "likes": 1, "thankful": 0, "unsatisfied": 0, "votes": 2, "userReactionType": "loves"}
    -   userReactionType is null if no reaction

-   **POST 'questions/:id/reactions?type=likes'** - toggles (creates or removes) reaction by type
    -   toggles a type, removes from other types, author of question can't make a reactions
    -   returns: {"loves": 1, "claps": 0, "likes": 1, "thankful": 0, "unsatisfied": 0, "votes": 2, "userReactionType": "loves"}
    -   userReactionType is null if no reaction

### Categories

-   **GET '/categories'** - gets all
-   **POST '/categories'** - creates new category {name: "category name"}
-   **PATCH '/categories'** - update name { id:"category id", {name: "new name"}}
-   **DELETE '/categories'** - delete category { id: "category id"}

### Tags

-   path "/tags", same as category
