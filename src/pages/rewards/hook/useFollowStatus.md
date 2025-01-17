# `useFollowStatus` Hook

## Overview
The `useFollowStatus` hook is designed to manage and monitor the follow status of users across multiple social media platforms within a React application. It provides essential functionalities such as fetching current follow statuses, updating statuses, and handling reward activations, specifically for cases like promotional offers where following multiple platforms may grant user access to special plans like a Pro Plan.

## Features
- **Follow Status**: Manages a state object that reflects the follow status for each specified social media platform.
- **All Platforms Followed**: Indicates whether all listed social media platforms have been followed by the user.
- **Grant Pro Plan**: A method to trigger activation of a Pro Plan as a reward for following all necessary platforms.
- **Loading State**: Reflects whether any asynchronous operations like fetching or updating data are in progress.

## Usage
Import and use the hook in your React component to manage social media follow statuses and related rewards:

