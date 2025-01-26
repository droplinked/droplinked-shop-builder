# `useFollowStatus` Hook

## Overview
The `useFollowStatus` hook is designed to manage and monitor the follow status of users across multiple social media platforms within a React application. It provides essential functionalities such as fetching current follow statuses, updating statuses, and handling reward activations, specifically for cases like promotional offers where following multiple platforms may grant user access to special plans like a Pro Plan.

## Features
- **Follow Status Management**: Tracks whether the user has followed each social media platform.
- **Link Opened Status**: Tracks whether the user has opened the link for each platform.
- **Pro Plan Activation**: Provides a method to activate a Pro Plan as a reward for following all necessary platforms.
- **Card Status Calculation**: Determines the current status of each platform (e.g., `NOT_OPENED`, `NOT_FOLLOWED`, `FOLLOWED`, `GUEST`).
- **Loading State**: Tracks whether any asynchronous operations (e.g., API calls) are in progress.



## Usage
Import and use the hook in your React component to manage social media follow statuses and related rewards:

### Example Usage

```tsx
import React from 'react';
import useFollowStatus, { CARD_STATUSES } from './hooks/useFollowStatus';

const SocialMediaCard = ({ platform }) => {
  const {
    getCardStatus,
    markLinkOpened,
    followStatus,
    grantProPlan,
    updateFollowStatus,
    loading,
  } = useFollowStatus();

  const status = getCardStatus(platform);

  const handleCardClick = async () => {
    if (status === CARD_STATUSES.NOT_OPENED) {
      markLinkOpened(platform);
    } else if (status === CARD_STATUSES.NOT_FOLLOWED) {
      const result = await grantProPlan();
      if (result.success) {
        updateFollowStatus(platform);
      }
    }
  };

  return (
    <div onClick={handleCardClick}>
      <p>{platform}</p>
      <p>Status: {status}</p>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default SocialMediaCard;
```

---

## API Reference

### Methods

#### `getCardStatus(platform: string): CardStatus`
Returns the current status of the specified platform. Possible values:
- `CARD_STATUSES.NOT_OPENED`: The user has not opened the platform link.
- `CARD_STATUSES.NOT_FOLLOWED`: The user has opened the link but not followed the platform.
- `CARD_STATUSES.FOLLOWED`: The user has followed the platform.
- `CARD_STATUSES.GUEST`: The user is not logged in (no shop context).

#### `markLinkOpened(platform: string): void`
Marks the specified platform's link as opened.

#### `updateFollowStatus(platform: string): void`
Updates the follow status of the specified platform to `true`.

#### `grantProPlan(): Promise<{ success: boolean; unlockedMonths?: number }>`
Activates the Pro Plan as a reward for following all platforms. Returns:
- `success: boolean`: Whether the operation was successful.
- `unlockedMonths: number`: The number of months the Pro Plan is unlocked (if successful).

---

### State

#### `followStatus: Record<string, boolean>`
An object where keys are platform names (e.g., `X`, `DISCORD`) and values are booleans indicating whether the user has followed the platform.

#### `linkOpened: Record<string, boolean>`
An object where keys are platform names and values are booleans indicating whether the user has opened the platform link.

#### `loading: boolean`
Indicates whether an asynchronous operation (e.g., API call) is in progress.

---

## Example Data Flow

1. **Initialization**:
   - The hook initializes `followStatus` and `linkOpened` with default values (`false` for all platforms).
   - If the user is logged in (`shop` is available), it fetches the current follow status from the API.

2. **User Interaction**:
   - When the user clicks a platform card:
     - If the link has not been opened, it marks the link as opened.
     - If the user has not followed the platform, it triggers the `grantProPlan` method and updates the follow status on success.

3. **Pro Plan Activation**:
   - The `grantProPlan` method makes an API call to activate the Pro Plan and updates the state accordingly.



