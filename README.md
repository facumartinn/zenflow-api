# Flow API

## General Description

Flow API is the backbone of the ZenFlow back office, picking, and delivery system, designed to efficiently manage and optimize logistics and order handling operations. This robust and flexible API enables seamless integration of various system modules, providing a comprehensive solution for user management, order processing, order status tracking, and user role assignments, among other key features.

## Main Features

- **Users Management**: Complete management of users, including creation, reading, updating, and deletion.
- **User Roles Management**: Management of user roles to define different access levels and permissions within the system.
- **Order Management**: Comprehensive handling of orders, allowing for creation, update, visualization, and deletion.
- **Order Details Management**: Facilitates detailed administration of each order, including specific products, quantities, and picking statuses.
- **Order Status Management**: Tracking and updating the statuses of orders, from creation to final delivery.

## Technologies Used

- **Node.js**: As the server-side JavaScript runtime environment.
- **TypeScript**: A JavaScript superset that adds static typing for safer and more maintainable development.
- **Express**: Framework for Node.js that simplifies the creation of HTTP servers.
- **Prisma ORM**: ORM tool for database management, simplifying interactions with the database through a high-level data model.

## Installation Instructions

To get started with Flow API, make sure Node.js is installed on your system. Then, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory from your terminal.
3. Run `npm install` to install all project dependencies.

```bash
npm install
```

## Start Server

Once the installation is complete, you can start the server with:

1. Build the project

```bash
npm run build
```

2. Run the project

```bash
npm run dev
```

## Environment Configuration

```bash
DATABASE_URL="postgresql://user:password@host:port/databaseName"
```

Make sure to replace the user, password, host, port, and databaseName values with the actual database connection data.

This README provides an overview of Flow API, facilitating developers to quickly get started with the project and understand its main functionalities and configurations. For more details on the implementation of each feature, it is recommended to review the code documentation and comments in the source files.
