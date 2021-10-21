# PracticalAssignment

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.10.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Practical Assignment 

Create an example application using @angular/cli latest version. It should have 2 modules, one main module and second one with lazy loading.

Before application initialization, load the data from users.json and posts.json files. After loading both JSON files, combine them into one data (inject each post into it’s author’s ‘posts’ array).

While loading the app show simple css loading animation, anything by your choice.

After loading the data, redirect the user to the lazy loaded module and show the user list from the loaded data. By clicking on the user, you should redirect the app to the separate page, which will contain all posts by that specific user.

The CSS part is left to your decision, please avoid using any component frameworks/libraries ( for example Bootstrap, Material, etc.).

At the bottom of the posts list create two buttons, Export as csv and Save as image which will pop up the download window and save user data in the correct format. 
