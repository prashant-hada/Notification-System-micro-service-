# Notification System

### Project Overview:

The _Notification System_ is designed as a microservice API that handles the dispatch of notifications via multiple channels such as email, SMS, and push notifications. It includes essential features such as scheduling notifications, templating message content, and managing user preferences for notification delivery. This system is robust, reliable, and designed to ensure effective communication between a service and its users.

### Assumptions:

-   **Multiple Notification Channels**: The system assumes that users may prefer different channels for notifications. Channels include email, SMS, and push notifications.
-   **User Preferences**: Users have the ability to opt-in or opt-out of specific channels as per their preferences.
-   **Template Placeholders**: Message templates include placeholders that will be dynamically replaced with user-specific data when notifications are sent.
-   **Scheduling**: The system supports both immediate and scheduled notification delivery.
-   **Retry Logic**: In case of failed delivery, the system implements retry logic to attempt resending.
-   **Security and Compliance**: Data such as `email` and `mobileNo` are stored securely, and user preferences ensure compliance with privacy standards.
## ER Diagram Overview:

The ER (Entity-Relationship) diagram for the _Notification System_ includes the following key entities and relationships:
![ER- Diagram Image](https://raw.githubusercontent.com/prashant-hada/Notification-System-micro-service-/22da1cfbcb168c9ccc84f03180cbc99f97f3dd2c/ER-Diagram/ER-Diagram.svg)

-   **User**: Central entity representing users who receive notifications.
-   **UserPreference**: Linked to `User`, representing preferences for receiving notifications through various channels.
-   **Notification**: Represents each notification instance sent to a user, linked to both `User` and `Template`.
-   **Template**: Stores predefined content formats for notifications with placeholders.
-   **DeliveryStatus**: Tracks the status of sent notifications, linked to `Notification`.

**Relationships**:

-   **User** has a one-to-many relationship with **UserPreference** and **Notification**.
-   **Notification** references **Template** through a many-to-one relationship.
-   **DeliveryStatus** maintains a one-to-many relationship with **Notification** to track the status of each notification attempt.

## Data Model Documentation:

Below is a description of the key data models:

#### 1. **User Model**

-   **id** (String, Primary Key): Unique identifier for each user (UUID format).
-   **name** (String): Full name of the user.
-   **email** (String, Unique): User’s unique email address.
-   **mobileNo** (String, Optional): User’s mobile phone number.
-   **createdAt** (DateTime): Timestamp of when the user account was created (defaults to `now()`).
-   **updatedAt** (DateTime): Timestamp of when the user record was last updated (automatically managed).
-   **preferences**: Relationship to `UserPreference`, indicating the channels the user opts for.
-   **notifications**: Relationship to `Notification`, showing all notifications related to the user.

#### 2. **UserPreference Model**

-   **id** (String, Primary Key): Unique identifier for each preference (UUID format).
-   **channel** (String): Type of notification channel (e.g., 'email', 'sms', 'push').
-   **userId** (String, Foreign Key): Links to the `User` model.
-   **user**: Relation to the `User` entity.

#### 3. **Notification Model**

-   **id** (String, Primary Key): Unique identifier for each notification (UUID format).
-   **userId** (String, Foreign Key): References the `User` entity.
-   **user**: Relationship to the `User` model.
-   **templateId** (String, Foreign Key, Optional): References the `Template` model for templated messages.
-   **template**: Relationship to the `Template` entity.
-   **channel** (String): The delivery channel used (e.g., 'email', 'sms', 'push').
-   **content** (String): Content of the notification.
-   **scheduledAt** (DateTime, Optional): Timestamp for when the notification is scheduled to be sent.
-   **status** (Enum): Status of the notification (e.g., `PENDING`, `SENT`, `FAILED`).
-   **createdAt** (DateTime): Timestamp of notification creation (defaults to `now()`).
-   **deliveryStatus**: Relationship to `DeliveryStatus`, tracking the status of the notification.

#### 4. **Template Model**

-   **id** (String, Primary Key): Unique identifier for each template (UUID format).
-   **name** (String, Unique): Name of the template.
-   **content** (String): Content of the template with placeholders (e.g., "Hello {name}").
-   **createdAt** (DateTime): Timestamp of when the template was created.
-   **updatedAt** (DateTime): Timestamp of the last template update.
-   **notifications**: Relationship to `Notification`, referencing notifications that use the template.

#### 5. **DeliveryStatus Model**

-   **id** (String, Primary Key): Unique identifier for each delivery status record (UUID format).
-   **notificationId** (String, Foreign Key): References the `Notification` model.
-   **notification**: Relationship to the `Notification` entity.
-   **status** (Enum): Status of the notification delivery (e.g., `SENT`, `FAILED`, `PENDING`).
-   **errorMessage** (String, Optional): Details of any error encountered during delivery.
-   **timestamp** (DateTime): Timestamp of the delivery status update (defaults to `now()`).

#### 6. **Enums Used**

-   **DeliveryStatusEnum**: Enumerates possible delivery states: `SENT`, `FAILED`, `PENDING`.