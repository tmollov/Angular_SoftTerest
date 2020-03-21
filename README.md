
# Angular_SoftTerest

Hi World! This my project for [Angular 8 course](https://softuni.bg/trainings/2760/angular-january-2020) @ [softuni.bg](https://softuni.bg/). Since I am out of ideas, I decided to solve one of the problems of retake exams from [JS Applications course](https://softuni.bg/trainings/2449/js-applications-october-2019) ([Here is link to contest](https://judge.softuni.bg/Contests/1975/JS-Applications-Retake-Exam-13-December)) with Angular 8.

![](https://github.com/tmollov/Angular_SoftTerest/raw/master/Preview_Images/HomePage_GUEST.JPG)

# About project

SoftTerest is a platform for sharing ideas. You can create,edit,delete (CRUD) ideas with others or like/comment people's ideas.

Here is video of usage: [LINK](https://photos.app.goo.gl/SwRFYAVEmiR4YPEp6) (sorry if its low quality you can download original from [HERE](https://github.com/tmollov/Angular_SoftTerest/raw/master/Preview_Images/demo_softterest.webm))

# How to install

1. Download [NodeJS](https://nodejs.org/en/) (LTS version)
2. Download [Angular CLI](https://angular.io/cli)

Then you have 2 options:
- Download this repository as ZIP file and unzip it.

- If you have [git](https://git-scm.com/downloads) installed:
    1. Make a folder.
    2. Open that folder.
    3. Open terminal of your OS (terminal (mac) or Gitbash/CMD (PC))
    4. Change directory to that folder using CD command: cd FOLDERLOCATION
    5. Clone this repository into your that folder using git commands: "git clone https://github.com/tmollov/Angular_SoftTerest.git ."
        
After that you must install the project dependencies:
1. Open "App" folder of the project
2. Open terminal of your OS (terminal (mac) or Gitbash/CMD (PC))
3. Change directory to that folder using CD command: cd FOLDERLOCATION
4. Type "npm install" and hit "Enter" and wait while dependencies being installed.

When it is ready, manually go to APP/src folder and create file "secret.ts". 

This is special file that contains Kinvey AppId and AppSecret.
``` javascript
export class Keys {
    static AppId: string = "YourAppId"
    static AppSecret: string = 'YourAppSecret'
}
```
Change "YourAppId" and "YourAppSecret" with yours:

![](https://github.com/tmollov/Angular_SoftTerest/blob/master/Preview_Images/secret.jpg?raw=true)


Of course, you probably don't have any kinvey app and to use this project you will need one:
1. Go to [Kinvey.com](https://console.kinvey.com/login) and register for new account.
2. Create an App (name it what you want)
3. After created an app, you must be in the development page of that app.
4. Go to Data > Collections and "Add a collection", Name it "ideas". ![](https://github.com/tmollov/Angular_SoftTerest/blob/master/Preview_Images/KINVEY.jpg?raw=true)
5. When new collection is created, kinvey will redirect you directly to collection setting. You must click import and select ideas.json file from project folder and upload it.
   ![](https://github.com/tmollov/Angular_SoftTerest/blob/master/Preview_Images/importJson.jpg?raw=true)
6. Then to add users go to settings of Identity > Users. Then import user.json from project folder.

After that you must be ready to run the project:
1. Change directory to that App folder using CD command: cd {projectDirectory}/App
2. Type "ng s" or "npm start" and hit "Enter"
After compilation you must see something like this at the console:
``` js
** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **
i ｢wdm｣: Compiled successfully.
```

Now you can open your browser and open [http://localhost:4200](http://localhost:4200) and enjoy the app :)



   
