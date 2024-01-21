# Next.js + Appwrite Cloud + Zustand Trello Clone

DEMO 👉 [Duthris Trello Demo](https://trello.duthris.com/)

This is an example demo of the trello daily task todo app to try [Appwrite Cloud](https://cloud.appwrite.io/), [Next.js](https://github.com/zeit/next.js/), [Zustand](https://github.com/pmndrs/zustand).

That is just a starter demo to learn Next.js and to try Appwrite Cloud and Zustand. Just for now that is not user based. When authentication has added, doable features in the project will be improved.

## Setup

Get the code by either cloning this repository using git

```
git clone https://github.com/Duthris/appwrite-trello-clone.git
```

Once downloaded, open the terminal in the project directory, and install dependencies with:

```
npm install
```

Once you have created a web project, and inside of it, a database and collection for that database, and a storage to store images, give localhost to hostname of the project in appwrite cloud.
Then see the .env.local.example file and rename it as .env.local. Then set your appwrite cloud project id, database id, collection id, and storage id.

```
NEXT_PUBLIC_APPWRITE_PROJECT_ID='YOUR APPWRITE CLOUD PROJECT ID'
NEXT_PUBLIC_DATABASE_ID='YOUR APPWRITE DATABASE ID'
NEXT_PUBLIC_TODOS_COLLECTION_ID='YOUR APPWRITE COLLECTION ID'
NEXT_PUBLIC_TODOS_STORAGE_ID='YOUR APPWRITE STORAGE ID'
```

Then start the example app with:

```
npm run dev
```

The app should now be up and running at http://localhost:3000 🚀
