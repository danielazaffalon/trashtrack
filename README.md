# TrashTrack

## Description

TrashTrack is an application that visualizes different types of trash containers, allowing users to monitor the fill level and report issues. The application supports two types of users: regular users and operators.

## Features

- Visualization of trash containers by type (organic, recyclable, etc.)
- Monitoring of trash container fill levels
- Reporting issues with containers (overflow, damage, etc.)
- Two user roles: Regular User and Operator

## Technologies Used

- Angular
- Ionic Framework
- Capacitor
- Firebase

## Dependencies

This project uses the following dependencies:

- `@angular/core`
- `@ionic/angular`
- `@capacitor/core`
- `firebase`
- `rxjs`
- `zone.js`

For a complete list of dependencies, please check the `package.json` file.

## Installation

Follow these steps to set up the project locally:

1. Clone the repository: `git clone https://github.com/your-username/trashtrack.git`
2. Navigate to the project directory: `cd trashtrack`
3. Install the dependencies: `npm install`
4. Configure Capacitor: `npx cap sync`
5. Start the application: `ionic serve`

## Usage

Once the application is up and running, you can:

- View trash containers on the map.
- Monitor the fill level of each container.
- Report issues directly from the app.

## Project Structure

The project structure is as follows:

´´´
├── app/ # Main app module and components  
│ ├── model/ # Shared components  
│ │ └── interfaces.ts/ # Interfaces  
│ ├── pages/ # App pages  
│ │ ├── Private/ # Private pages  
│ │ │ ├── tab1/ # Tab1 Page  
│ │ │ ├── tab2/ # Tab2 Page  
│ │ │ ├── tab3/ # Tab3 Page  
│ │ │ ├── tabs/ # Tabs Routing and Component  
│ │ │ └── usersettings/ # User Settings Page  
│ │ └── Public/ # Public pages  
│ │ │ ├── login/ # Login Page  
│ │ │ └── register/ # Register Page  
│ ├── services/ # Services  
│ │ ├── auth/ # Auth Service  
│ │ ├── containers/ # Containers Service  
│ │ ├── incidents/ # Incidents Service  
│ │ ├── photo/ # Photo Service  
│ │ ├── storage/ # Storage Service  
│ │ └── user-settings/ # User Settings Service  
│ ├── Shared/ # Shared  
│ │ ├── containers-filter/ # Containers Filter Component  
│ │ ├── header/ # header Component  
│ │ ├── incident-form/ # incident Form Component  
│ │ └── sidemenu/ # Side Menu Component  
└── app/ # App Component  
´´´

## Contributing

Contributions are welcome! Please follow the steps below to contribute to this project:

1. Fork the repository.
2. Create a new branch for your feature or fix (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push your changes to the branch (`git push origin feature/new-feature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License. For more information, see the [LICENSE](LICENSE) file.

## Developers

- [Daniela Zaffalon](dannyzaffalon@hotmail.com)
- [Nicolás Gutierrez](nifegupa@hotmail.com)
