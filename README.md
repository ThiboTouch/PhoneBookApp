# Phone Book App
##### Development Setup:
1. Ensure you have Azure Cosmos DB emulator running on https://localhost:8081/. <br />
- Download and install the emulator: https://aka.ms/cosmosdb-emulator. <br />
- Instructions: https://docs.microsoft.com/en-us/azure/cosmos-db/local-emulator <br />
- See config settings on the server in the appsettings.Development.json file.
2. open up cmd/powershell and set the working directory as PhoneBook (Server) folder of the solution
3. Run the following command to start the server app (listens on localhost:5000 and localhost:5001):
    ___
    dotnet run
    ___
4. This will run the server app and get things ready.
5. open another cmd/powershell and set the working directory as the phonebook-SPA (client) folder of the solution
6. Run the following command to install dependencies for the client app:
    ___
    npm install
    ___
7. Once the dependencies are installed run the following command to start the client app:
    ___
    npm start
    ___
8. You can then navigate to localhost:4200 from your browser to use the app

There's no seed data, so you'll need to add the data through the UI.
#### The application demonstrates: 
1. The use of a document DB with RESTful API. (.Net Core 3.1) 
2. Server side pagination.
3. Client side data filtering, sorting and pagination.
4. SPA development. (Angular 9)

