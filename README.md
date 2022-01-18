# Calendar app

![alt text](https://github.com/VitalyGryaznov/calendar/blob/main/Screenshot_calendar.png)

## Backend part mock

Backend part mock is based on the json-server. It's running on the port 8000.
The json mock database you can find in mockDb.json

To run the backend part:
```
yarn mock-server
```
## Frontend part

To run the fromtend part:
```
yarn start
```

## Tests

There are some tests implemented for Dialog Modal component.
Jest and redux-mock-store are used.
```
src/components/modalDialog/ModalDialog.test.tsx
```

To run tests:

```
yarn test
```

## TODOs

As long as the time limit for this task is 5h, I have a list of

- Improve styling in general
- In case of a big amount of reminders for one day, hide some of them and add a button to display all
- Calendar.tsx could be separated to components
- Improve error handling. Now I added only an error handler for fetching data. Need to do the same for adding/updating data.
- Handle loading state for adding/updating data (create loading animation)
- Improve validation messages for the components on the dialog
- Add more tests to ModalDialog.test.tsx and add tests for other components
