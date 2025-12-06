# [gymsheet.pl](https://gymsheet.pl) a gym progress tracking app (frontend)
This is frontend repository if your looking for the backend part [go here](https://github.com/SmokeHF/GymBackend).

# About
This is my personal project that I made to help me and my friends track our gym progress and I made it publicaly available.

The goal of this project is to simplify process of entering data into csv format after completing every set.  
Manualy clicking right cells on your phone while you're tired and sweating is annoying, needlessly difficult and tedious. To solve this problem I've created this web app.  
Now while at the gym after you've completed your set. You can takeout your phone. Pick your exercise from a list. Only enter reps and weight used and click 'send'.  
If you want to confirm you've entered everything correctly or you want to rappidly check you training data just click 'Preview' and it will redirect you to an html table of all your training data. 
When you come home and want to analise your gym progress just click 'Download' to get a neetly mad csv file which includes additional data like: numbers of sets, dates and time.
Very simple UI and large buttons are made so that the usage is simplest possible.

## Main features

1. While stil at th gym, easely put your sets into csv format, whith fewest clicks possible.
2. Download your csv file to see your progress.
3. Use fast preview to check your entries with one click.

## Navigation

### Authentication
1. Enter your desired username and password.
2. Click 'register'.
3. If you have an account enter your credentials and click 'log in'.

### Entering sets
1. Pick exercise.
2. Enter weight you've used in the exercise.
3. Enter amount of repetitions completed.
4. If you want you can enter '(RIR)reps in reserve' but if you leave the box empty it will assume it's zero(set was to failure).
5. Click "Send".

### Donwloading the sheet
Click "download", if your browser didn't download automaticaly check your broswer settings because it might be preventing app from automaticaly downloading onto you device. 

## Web apps architechture

App is deployed on AWS EC2 ubuntu virtual machine.  
Server is running on Apache  
To serve backend WSGI server I use mod-wsgi a simple to use Apache module.  
Frontend is made in React.js  
Backend is made in Flask and python  

## Other features
1. Selfe-made token base authentication system, to enhance security.
2. Set numbers are set automaticaly. If it's the same day app assumes it's a next set. If it's a different day it assumes it's a new exercise.
3. 
