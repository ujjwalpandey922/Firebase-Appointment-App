# React Firebase Web Application Documentation

## Overview

This web application is built using React and Firebase. It allows users to fetch and display employee data from a Firebase Realtime Database, providing features such as data presentation in a table format, pagination, sorting, and search functionality.

## Features

- **Firebase Setup:**
  - Set up a Firebase project and initialized Firebase within the React project.
  - Configured Firebase Realtime Database to store employee data.

- **Data Retrieval:**
  - Fetched employee data from the Firebase Realtime Database.
  - Stored the fetched data in the React component's state.
  - Ensured retrieval of at least 15 rows of employee data.

- **Data Presentation:**
  - Presented employee data in a table format on the web page.
  - Included key information such as employee name, age, etc., in the table.
  - Implemented pagination to display a limited number of rows per page.
  - Included a dropdown menu to allow users to select the number of rows displayed at once.

- **Search and Sorting:**
  - Implemented search functionality to filter employee data based on the entered search term.
  - Implemented sorting functionality to sort employee data by various criteria such as name, age, etc.


- **Firebase Realtime Data Fetching Time:**
    - Used Conditional Return Statement with useState to overcome the said problem