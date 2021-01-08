# Paddy

Paddy is an app that helps users to understand their body better. It helps to track and monitor users' cycles. It will allow users to predict when their period is coming. Users can track their period start date, end date, their menstrual flow and hours of sleep.

https://davierdavid.github.io/DMEAsg01/
 
## Design Process
 
This app is designed for ladies, specifically those that want to be more informed or in control of their bodies. 
This app has a straightforward layout, so users will find it very familiar and get used to it right away. Nothing is hidden; all buttons and functions are labelled and can be easily found.

As for the colours, I went with the pastel green and the light mint green to compliment it.
Some ladies may get sensitive during their periods, so I went with a soft colour that is easy on the eyes and is gentle.
The green reminds the user of nature and nature is usually associated with zen and peace.

The logo I used is a house plant, following the theme of green and nature.
The house plant has a face with a smiley expression to give the mascot a little more characteristic.

As someone that is busy with everyday life and want to log their daily symptoms quickly, the app helps to do that easily by making it accessible just in 1 click.
While some others would like a more personal experience, they can set their period length or cycle length, and the app will calculate based on that.

Colors used:
#3D405B, #E6F0EB, #81B29A

Adobe XD Wireframes
https://xd.adobe.com/view/6f47fb3b-22ba-4223-8901-e52e520b17e9-3a14/

## Features

Users can set their period start date, and the app will start to log how long they've had their period.
If the users haven't had their period, they can set when the period last ended and the app will try and predict when their next period might be.
Users can also personalize their experience by setting their period and cycle lengths.
Users can log their menstrual flow daily and how much sleep they've had the previous night.
Users can also reset all their data, not including their profile and login details.
Users can create an account.
Users can logout.
Users can log their daily moods and symptoms that they experience.

 
### Existing Features
- Users can set their period start date, and the app will start to log how long they've had their period.
- If the users haven't had their period, they can set when the period last ended and the app will try and predict when their next period might be.
- Users can also personalize their experience by setting their period and cycle lengths.
- Users can log their menstrual flow daily and how much sleep they've had the previous night.
- Users can also reset all their data, not including their profile and login details.
- Users can create an account.
- Users can logout.

Additional features to be implemented in the future:
- A calendar date picker
- Graphs for users to analyze
- Track chance of pregnancy
- Track ovulation days/week

### Features Left to Implement
- Users can log their daily moods and symptoms that they experience

## Technologies Used

- [JQuery](https://jquery.com)
    - The project uses **JQuery** to simplify DOM manipulation.
- [Javascript](https://www.javascript.com/)
    - The project uses **Javascript** to run most of the function.
- [Ionic](https://ionicframework.com/)
    - The project uses **Ionic Framework** for many of its components like modal, inputs and grid
- [GoogleFonts](https://fonts.google.com/)
    - The project uses **Google Fonts** for its font, there are 2 fonts used.



## Testing

1. Create new account and login
    1. Loaded into login page
    2. Click on sign up button
    3. Fill in form but left email empty. Error message when submit, email is required
    4. Fill in email and try to submit again, success
    5. Redirected back to login page
    6. Fill in form and submit
    7. Logged in

2. Set period date to 2 days ago
    1. Log in
    2. Click on log date button
    3. Set start date and left end date empty
    4. Period date set

3. Edit your name
    1. Log in
    2. Open up menu
    3. Click on edit button
    4. Fill in form and submit
    5. Profile updated

4. Set only period end date to 1 week ago
    1. Log in
    2. Click on log date button
    3. Set end date and left start date empty
    4. End date set.

Known bugs
- The calculations for upcoming period and how many days of period can only be calculate if same month
- Editing of profile does not require all input to be filled, the empty inputs will still be logged and replaced with empty
- The period start date can be set to later than current day
- There is no restriction for how long ago users can set their period end date

## Credits

Logo by Freepik, https://www.flaticon.com/free-icon/plant_2478367
References used, 
    - https://ionicframework.com/docs/components, 
    - https://stackoverflow.com/, 
    - https://www.w3schools.com/, 
    - https://developer.mozilla.org/en-US/


### Media
- The logo for this app is from Freepik, https://www.flaticon.com/free-icon/plant_2478367

### Acknowledgements

- I received inspiration for this project from
    - pslove Period Tracker Calendar, https://apps.apple.com/sg/app/pslove-period-tracker-calendar/id1426237949
    - Ovia Fertility & Cycle Tracker, https://apps.apple.com/sg/app/ovia-fertility-cycle-tracker/id570244389
    - Period Diary, Cycler Tracker, https://apps.apple.com/sg/app/period-diary-cycle-tracker/id436762566
    - Flo My Health & Period Tracker, https://apps.apple.com/sg/app/flo-my-health-period-tracker/id1038369065
    - Clue - Period & Cycle Tracker, https://apps.apple.com/sg/app/clue-period-cycle-tracker/id657189652

