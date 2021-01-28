# api-ibebeq

## End points

-   questions - "/questions"

    -   GET - gets all
    -   GET - "/questions/id" - gets one question by id and populates category, tags, reactions
    -   POST - creates new question { "text": "question text", "category": "category id", "tags": ["tag id"]}, sets author to user id, creates reactions and attaches to the question

-   categories - "/categories"

    -   GET - gets all
    -   GET - "/category/id" - gets one category by id
    -   POST - creates new category {name: "category name"}
    -   PATCH - update name {id:"category id", {name: "new name"}}
    -   DELETE - delete category { id: "category id"}

-   tags - "/tags"
    -   see category
